import React, { useEffect, useState } from 'react';
import Jump from 'react-reveal/Jump';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, CircularImage, Icon, Modal } from '../../components'
import { loadingCacheIntoStore, requestActs, receivedActs, cacheExpiredFetchingActs, } from '../../actions/acts';
import { getFromCache, saveToCache } from '../../components/Cache';
import { withAuthentication } from '../../components/Session';
import { trimStringSpecifically, tooSoon } from '../../utils';
import './styles.css';

const downVoteSwitchedOn = false;

function ActsPage({
  acts,
  firebase,
  updateStateCacheExpiredFetchingActs,
  updateStateLoadingCacheIntoStore,
  updateStateReceivedActs,
  updateStateRequestingActs,
}) {

  const [showModal, toggleShowModal] = useState(false);

  useEffect(() => {
    const cache = localStorage.getItem('acts'); // check cache for news
    const ts = getFromCache('acts-ts');
    console.log('acts timestamp: ', ts)
    const isExpired = (Date.now() - ts) > 10000000; // check date of cache

    if (!cache || cache.length < 1 || isExpired) { // if there's no cache gigs
      const store = acts;// check reduxStore
      if (!store || store.length < 1 || isExpired) { // if no cache & no store news, fetch the news!
        if (isExpired) { updateStateCacheExpiredFetchingActs() }
        fetchActs();
        const timestampToCache = Date.now();
        saveToCache('acts-ts', timestampToCache); // time that gigs was saved to cache
      }
    } else { // if there IS cache gigs,
      const cachedActs = JSON.parse(cache); // change it to a JS object
      updateStateLoadingCacheIntoStore();
      updateStateReceivedActs(cachedActs); // push it in the store (then it'll come thru props);
    }
  }, []);

  const fetchActs = async () => {
    updateStateRequestingActs();
    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      const filteredOutNonVotingUsers = usersList.filter(
        each => each.includeInActRater
      );

      let sortedActs = filteredOutNonVotingUsers
        .sort((a, b) => a.rating - b.rating)
        .reverse();

      saveToCache('acts', JSON.stringify(sortedActs));
      updateStateReceivedActs(sortedActs);
    });
  }
  // eg. voteAct('up', actObject)
  const voteAct = async (upOrDownString, actObject) => {

    let chosenUser = {};
    let isTooSoon = tooSoon();
    // if it was longer than 10 seconds
    console.log('isTooSoon ', isTooSoon);

    if (!isTooSoon) {
      // 1. GET THE ACT YOUVE CHOSEN TO UPVOTE

      firebase.user(actObject.uid).on('value', snapshot => {
        chosenUser = snapshot.val();
      });

      setTimeout(() => {

        const {
          username,
          email,
          tagline,
          profilePicture,
          rating,
          includeInActRater
        } = chosenUser;

        // 2. SET THE ACT WITH ITS NEW RATING IN DB
        firebase.user(actObject.uid).set({
          username,
          email,
          tagline,
          profilePicture,
          includeInActRater,
          rating: upOrDownString === 'up' ? rating + 1 : rating - 1
        });

        // 3. SAVE LOCALSTORAGE TO STOP PERSISTENT VOTING
        localStorage.setItem('timevoted', Date.now());
      }, 1000)
      // 1sec delay to allow chosenUser to resolve.
      // weird hack with firebase API


    } else {
      console.log('its TOO SOON!');
      return toggleShowModal(!showModal);
    }
  };

  return (
    <div className="gig__page row margin-bottom flex-center">

      <div className="col-sm-12">

        <React.Fragment>
          <Jump>
            <FunkyTitle text="Acts" />
          </Jump>
        </React.Fragment>

      </div>

      <div className="col-sm-12 flex-center flex-col">

        {acts && acts.slice(0, 12).map((each, i) => {
          return (
            <React.Fragment key={i}>
              <Fade>

                <div
                  key={i}
                  className="each-act-container"
                >

                  <div className="each-act-row">
                    <div className="each-act-rating-container">
                      <div
                        className="up-svg-container"
                        onClick={() => voteAct('up', each)}
                      >
                        <Icon icon="clap" />
                      </div>

                      <h2 className="each-act-rating">{each.rating}</h2>

                      {downVoteSwitchedOn && (
                        <div
                          className="down-svg-container"
                          onClick={() => voteAct('down', each)}
                        >
                          <DownArrow />
                        </div>
                      )}
                    </div>

                    <div>
                      <Link to={`/act/${each.uid}`}>
                        <CircularImage src={each.profilePicture} small />

                        <div className="each-act-name">
                          <h4>{each.username}</h4>
                          <p>{trimStringSpecifically(each.tagline, 55)}</p>
                        </div>
                      </Link>
                    </div>


                  </div>


                </div>

              </Fade>
            </React.Fragment>

          )
        })}
      </div>

      { showModal && <Modal killModal={toggleShowModal(!showModal)} heading="Oh no!" body="Sorry, but you cant vote more than once every hour!" />}
      <div className="col-sm-12" style={{ marginBottom: 65 }} />

    </div>
  )
}

const mapStateToProps = state => ({
  acts: state.acts.acts,
})

const mapDispatchToProps = dispatch => ({
  updateStateRequestingActs: () => dispatch(requestActs()),
  updateStateReceivedActs: (arr) => dispatch(receivedActs(arr)),
  updateStateCacheExpiredFetchingActs: () => dispatch(cacheExpiredFetchingActs()),
  updateStateLoadingCacheIntoStore: () => dispatch(loadingCacheIntoStore()),
});

export default compose(
  withRouter,
  withFooter,
  withPage,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
)(ActsPage);
