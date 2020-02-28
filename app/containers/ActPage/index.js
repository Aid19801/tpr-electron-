import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
import ReactPlayer from 'react-player';
import { withPage, FunkyTitle, DynamicImage, Icon } from '../../components';
import { withFirebase } from '../../components/Firebase';
import { requestGigs, selectedGig, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs, filteredGigs } from '../../actions/gigs';
import './styles.css';

function ActPage({
  updateStateRequestingGigs,
  updateStateSelectedGig,
  updateStateReceivedGigs,
  history, firebase, match: { params: { id } } }) {

  const [loading, setLoading] = useState(false);
  const [usersProfile, setUsersProfile] = useState(null);
  useEffect(() => {
    fetchUser()
    fetchGigs()
  }, []);

  const fetchUser = () => {

    setLoading(true);

    return firebase.user(id).on('value', snapshot => {
      let chosenUser = snapshot.val();
      // console.log('AT | chosenUser back :', chosenUser);
      setUsersProfile(chosenUser);
      setLoading(false);
    });
  }

  const fetchGigs = async () => {
    updateStateRequestingGigs();
    const gigs = await firebase.gigs();
    updateStateReceivedGigs(gigs);
  }

  const handleSelectGig = id => {
    updateStateSelectedGig(id);
    return history.push(`/gig/${id}`);
  }

  return (
    <div className="act__container row margin-bottom flex-center">

      <div className="col-sm-12">

        <React.Fragment>
          <Jump>
            <FunkyTitle text={usersProfile && usersProfile.username} />
          </Jump>
        </React.Fragment>

      </div>

      <div className="col-sm-12 flex-center">
        <DynamicImage src={usersProfile && usersProfile.profilePicture} />
      </div>

      <div className="col-sm-12 flex-center margin-top margin-bottom">
        <h2 className="grey white padding-on">"{usersProfile && usersProfile.tagline}.."</h2>
      </div>

      <div className="col-sm-8 black flex-col">
        <div className="flex-row flex-center">
          <h2 className="margin-right">Fave Gig</h2>
          <p className="orange skew-left">&nbsp; {usersProfile && usersProfile.faveGig || "Unknown"}</p>
        </div>
        <div className="flex-row flex-center">
          <h2 className="margin-right">Style</h2>
          <p className="orange skew-left">&nbsp; {usersProfile && usersProfile.genre || "Unknown"}</p>
        </div>
        <div className="flex-row flex-center">
          {usersProfile && usersProfile.twitter && <div onClick={() => window.open(`https://www.twitter.com/${usersProfile.twitter}`, '_newtab')}><Icon icon="twitter" /></div>}
          {usersProfile && usersProfile.facebook && <div onClick={() => window.open(usersProfile.facebook, '_newtab')}><Icon icon="facebook" /></div>}
          {usersProfile && usersProfile.website && <div onClick={() => window.open(usersProfile.website, '_newtab')}><Icon icon="website" /></div>}
          {usersProfile && usersProfile.youtubeChannelURL && <div onClick={() => window.open(youtubeChannelURL, '_newtab')}><Icon icon="youtube" /></div>}
        </div>
      </div>

      <div className="act__video col-sm-12 margin-top flex-center">

        {usersProfile && usersProfile.youtube && (
          <React.Fragment>
            <Jump>

              <ReactPlayer
                url={usersProfile.youtube}
                playing
                width={750}
                height={500}
                youtubeConfig={{ playerVars: { showinfo: 1 } }}
              />

            </Jump>

          </React.Fragment>
        )}


      </div>

      <div className="col-sm-12 black flex-col flex-center">
        <Fade>

        { usersProfile && usersProfile.username && usersProfile.attended && usersProfile.attended.length ? <h2 className="act__performed-at__name">{usersProfile.username} has performed at</h2> : <div /> }

        <div className="flex-row flex-center">

          {usersProfile && usersProfile.attended && usersProfile.attended.length && (
            usersProfile.attended.map((each, i) => {
              return (
                <div key={i} onClick={() => handleSelectGig(each.id)}>
                  <DynamicImage src={each.img} small />
                </div>
              )
            })
          )}

        </div>

        </Fade>
      </div>

    </div>
  );
}


const mapStateToProps = state => ({
  selectedGig: state.gigs.selectedGig
});

const mapDispatchToProps = dispatch => ({
  updateStateSelectedGig: id => dispatch(selectedGig(id)),
  updateStateRequestingGigs: () => dispatch(requestGigs()),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
});


export default compose(
  withFirebase,
  withPage,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ActPage)
