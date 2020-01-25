import React, { useEffect, useState } from 'react';
import Jump from 'react-reveal/Jump';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, Icon, Modal, Button, DynamicImage, EachActCard } from '../../components'
import { loadingCacheIntoStore, requestActs, receivedActs, cacheExpiredFetchingActs, } from '../../actions/acts';
import { saveToCache } from '../../components/Cache';
import { withAuthentication } from '../../components/Session';
import { trimStringSpecifically, tooSoon } from '../../utils';
import './styles.css';

const downVoteSwitchedOn = false;

function ActsPage({
  acts,
  firebase,
  updateStateReceivedActs,
  updateStateRequestingActs,
}) {

  const [modal, setModal] = useState(false);
  const [batchTwo, setBatchTwo] = useState(false);
  const [batchThree, setBatchThree] = useState(false);
  const [batchFour, setBatchFour] = useState(false);

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchActs();
    const timestampToCache = Date.now();
    saveToCache('acts-ts', timestampToCache); // time that gigs was saved to cache
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

      const filteredOutNoProfilePic = filteredOutNonVotingUsers.filter(
        each => each.profilePicture
      );

      let sortedActs = filteredOutNoProfilePic
        .sort((a, b) => a.rating - b.rating)
        .reverse();

      // saveToCache('acts', JSON.stringify(sortedActs));
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
          includeInActRater,
        } = chosenUser;

        let yt = chosenUser && chosenUser.youtube ? chosenUser.youtube : '';
        let att = chosenUser && chosenUser.attended ? chosenUser.attended : [];
        let fg = chosenUser && chosenUser.faveGig ? chosenUser.faveGig : '';
        let gen = chosenUser && chosenUser.genre ? chosenUser.genre : '';
        let ws = chosenUser && chosenUser.website ? chosenUser.website : '';
        let tw = chosenUser && chosenUser.twitter ? chosenUser.twitter : '';
        let fb = chosenUser && chosenUser.facebook ? chosenUser.facebook : '';
        let ytCh = chosenUser && chosenUser.youtubeChannelURL ? chosenUser.youtubeChannelURL : '';

        // 2. SET THE ACT WITH ITS NEW RATING IN DB
        firebase.user(actObject.uid).set({
          username,
          email,
          tagline,
          profilePicture,
          includeInActRater,
          attended: att,
          faveGig: fg,
          youtube: yt,
          genre: gen,
          website: ws,
          twitter: tw,
          facebook: fb,
          youtubeChannelURL: ytCh,
          rating: upOrDownString === 'up' ? rating + 1 : rating - 1
        });

        // 3. SAVE LOCALSTORAGE TO STOP PERSISTENT VOTING
        localStorage.setItem('timevoted', Date.now());
      }, 1000)
      // 1sec delay to allow chosenUser to resolve.
      // weird hack with firebase API
      fetchActs();
    } else {
      console.log('its TOO SOON!');
      return setModal(true);
    }
  };

  const showBatchTwo = () => {
    return setBatchTwo(true);
  }

  const showBatchThree = () => {
    return setBatchThree(true);
  }

  const showBatchFour = () => {
    return setBatchFour(true);
  }

  return (
    <div className="acts__page row margin-bottom flex-center">

      <div className="col-sm-12">

        <React.Fragment>
          <Jump>
            <FunkyTitle text="Acts" />
          </Jump>
        </React.Fragment>

      </div>

      {updating && <h1>Loading...</h1>}
      {!updating &&
        <div className="col-sm-12 flex-center flex-col">

          {acts && acts.slice(0, 12).map((each, i) => <EachActCard key={i} voteAct={voteAct} each={each} />)}
          {acts && !batchTwo && <Button text="Load more... (25)" onClick={showBatchTwo} small orange />}
          {acts && batchTwo && acts.slice(12, 37).map((each, i) => <EachActCard key={i} voteAct={voteAct} each={each} />)}
          {acts && !batchThree && batchTwo && <Button text="Load more...(35)" onClick={showBatchThree} small orange />}
          {acts && batchThree && batchTwo && acts.slice(37, 72).map((each, i) => <EachActCard key={i} each={each} voteAct={voteAct} /> )}
          {acts && !batchFour && batchThree && <Button text="Load more...(45)" onClick={showBatchFour} small orange />}
          {acts && batchThree && batchFour && acts.slice(72, 117).map((each, i) => <EachActCard key={i} each={each} voteAct={voteAct} /> )}

        </div>
      }

      {modal && <Modal killModal={() => setModal(false)} heading="Oh no!" body="Sorry, but you cant vote more than once every hour!" />}
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
