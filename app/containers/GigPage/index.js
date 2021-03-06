import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { Comments, withPage, withFooter, BoxCard, LargeBoxCard, Button, CircularImage, Icon, DynamicImage } from '../../components'
import { fetchGigsFromGist, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs, selectedGig } from '../../actions/gigs';
import { filtersChanged } from '../../actions/filters';
import { withFirebase } from '../../components/Firebase';
import { filters as resetFiltersAsAll } from '../../components/Filters/filters';
import { getFromCache, saveToCache } from '../../components/Cache';
import './styles.css';
// import comments from '../../components/Comments/comments';

// let selectedGig = {
//   id: 38,
//   name: 'Lol Factory Blahdy BLAH!',
//   venue: 'The Queens Head Arms',
//   img: "https://i.ytimg.com/vi/5kOzeYp8RgU/hqdefault.jpg",
//   lat: 51.5024,
//   lng: -0.0734,
//   blurb: "LOLLY POPS is a weekly FREE comedy night founded & compered by Irish MC, Wes Dalton. Branching out from their Camden roots with a brand new Monday show @ The Dean Swift in Tower Bridge. Each week they bring you a craic-ing bill of up-and-coming acts and special guest to headline. Fun and friendly night which brings people together through laughter and silliness. Doors 19.30!",
//   nearestTubes: ['Picadilly Circus', 'Leics Square'],
//   nights: ['Mon', 'Tue'],
//   bringer: true,
//   prebook: true,
//   walkins: true,
//   walkinSignUp: "",
//   prebookSignUp: "monthly booking via email",
//   howToBook: "http://www.funnyfeckers.co.uk/performers/",
//   website: 'http://wearefunnyproject.com/',
//   facebook: 'https://www.facebook.com/wearefunnyproject',
//   twitterHandle: 'funnyFeckers',
//   email: 'hello@google.com',
//   attended: [
//     {
//       profilePicture: "/static/no_prof_pic.png",
//       uid: "test-uid-9379623-TESTY",
//       username: "Aid Thompsin"
//     },
//     {
//       profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
//       uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
//       username: "James StPatrick"
//     },
//   ],
//   comments: [
//     {
//       id: 1,
//       comment: "i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah ",
//       profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
//       timeposted: 1580117053174,
//       username: "Des Lynham",
//       uid: "BjXbpuR4XleEzojEXjIA28liOIC3",
//     },
//     {
//       id: 2,
//       comment: "i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah i am a comment blah ",
//       profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
//       timeposted: 158011702000,
//       username: "Funny Chuckly Joe!",
//       uid: "BjXbpuR4XleEzojEXjIA28liOIC3",
//     }
//   ]
// }

function GigPage({
  gigs,
  history,
  match,
  firebase,
  selectedGig,
  city,
  updateStateFiltersChanged,
  updateStateSelectedGig,
  updateStateReceivedGigs,
}) {

  const [uid, setUid] = useState(localStorage.getItem('uid'));
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('user-profile')));
  const [attended, setAttended] = useState(false);
  const [commentsFromFirebase, setCommentsFromFirebase] = useState(false);

  useEffect(() => {
    const arr = selectedGig && selectedGig.attended && selectedGig.attended.length && selectedGig.attended || [];
    arr.map((each) => {
      if (each.uid === uid) {
        setAttended(true)
      }
    })


  }, []);

  const handleAttendClick = (att) => {
    debugger;
    switch (att) {
      case 'Yes':
        addToAttendedOnGigsDB();
        addToAttendedOnUsersDB();
        setAttended(true);
        break;
      case 'No':
        killAttendedQuestion();
        break;

      default:
        null;
    }
  }

  const killAttendedQuestion = () => {
    const updatedAttendedArray = selectedGig.attended.filter((each) => each.uid !== uid);
    firebase.editGig(selectedGig.id, "attended", updatedAttendedArray, city);
    setAttended(false);
  }

  const addToAttendedOnUsersDB = () => {
    const userProfile = JSON.parse(localStorage.getItem('user-profile'));
    let updatedAttendedArray = [];
    if (userProfile && userProfile.attended && userProfile.attended.length) {
      updatedAttendedArray = [
        ...userProfile.attended,
        {
          id: selectedGig.id,
          img: selectedGig.img,
          name: selectedGig.name,
        }
      ]
    }
    if (userProfile && !userProfile.attended || !userProfile.attended || userProfile.length < 1) {
      updatedAttendedArray = [{
        id: selectedGig.id,
        img: selectedGig.img,
        name: selectedGig.name,
      }]
    }
    const updatedUserProfile = {
      ...userProfile,
      attended: updatedAttendedArray,
    }

    const json = JSON.stringify(updatedUserProfile);
    localStorage.setItem('user-profile', json);

    firebase.user(uid).update({
      attended: updatedAttendedArray,
    })
  }

  const addToAttendedOnGigsDB = () => {

    let updatedAttendedArray = [];

    if (selectedGig.attended) {
      updatedAttendedArray = [
        ...selectedGig.attended,
        {
          profilePicture: userProfile.profilePicture,
          uid: uid,
          username: userProfile.username,
        }
      ];
    }

    if (!selectedGig.attended) {
      updatedAttendedArray = [
        {
          profilePicture: userProfile.profilePicture,
          uid: uid,
          username: userProfile.username,
        }
      ];
    }

    firebase.editGig(selectedGig.id, "attended", updatedAttendedArray, city);

    // firebase.user(uid).update({
    //   attended: userProfile.attended ? userProfile.attended.push({ id: selectedGig.id, img: selectedGig.img, name: selectedGig.name }) : [ { id: selectedGig.id, img: selectedGig.img, name: selectedGig.name } ],
    // })
  }

  const handleBackButton = () => {
    // debugger;
    updateStateFiltersChanged(resetFiltersAsAll);
    history.goBack();
  }

  const refetchThisGig = async() => {
    console.log('AT | refetching gig...');
    const { params: { id }} = match;
    let allGigs = [];
    allGigs = city === 'london' ? await firebase.gigs() : await firebase.differentCityGigs(city);
    // const allGigs = await firebase.gigs();
    console.log(`re-fetched all gigs for ${city} :`, allGigs);
    updateStateReceivedGigs(allGigs);
    console.log('AT | refetchThisGig ID :', id);
    updateStateSelectedGig(id);
  }

  if (!selectedGig) {
    // refetchThisGig();
    return <div>no gig info</div>
  }

  console.log('AT | city is :', city);
  return (
    <div className="gig__page row margin-bottom flex-center">
      <div className="margin-left margin-top">
        <Button onClick={() => handleBackButton()} text="<= Back" small color="grey" />
      </div>
      <div className="col-sm-12">
        {selectedGig && selectedGig.name && (
          <React.Fragment>
            <Jump>
              <FunkyTitle text={selectedGig.name} />
              <h2 className="flex-center">@ {selectedGig.venue}</h2>
            </Jump>
          </React.Fragment>
        )}
      </div>

      <div className="col-sm-12 flex-center">
        <Fade left>
          {selectedGig && selectedGig.img && <DynamicImage src={selectedGig.img} large fallbackSrc={require('../../media/panda_avatar.jpg')} greyBorder />}
        </Fade>
      </div>

      <div className="col-sm-12 flex-center">
        {selectedGig && selectedGig.nearestTubes && (
          <React.Fragment>
            <Fade left>
              <div className="bringer-and-tubes-etc__container flex-center flex-col">
                <Icon icon="tube" />
                <p style={{ fontSize: 10, }}>{selectedGig.nearestTubes[0]}</p>
              </div>

            </Fade>
          </React.Fragment>

        )}
        {selectedGig && selectedGig.bringer && (
          <React.Fragment>
            <Fade left>
              <div className="bringer-and-tubes-etc__container flex-center flex-col">
                <Icon icon="bringer" />
                <p>Bringer</p>
              </div>
            </Fade>
          </React.Fragment>
        )}
        {selectedGig && selectedGig.walkins && (
          <React.Fragment>
            <Fade right>
              <div className="bringer-and-tubes-etc__container flex-center flex-col">
                <Icon icon="walkins" />
                <p>Walk-ins</p>
              </div>
            </Fade>
          </React.Fragment>
        )}
        {selectedGig && selectedGig.prebook && (
          <React.Fragment>
            <Fade right>
              <div className="bringer-and-tubes-etc__container flex-center flex-col">
                <Icon icon="calendar" />
                <p>Pre-Book</p>
              </div>
            </Fade>
          </React.Fragment>
        )}
        {selectedGig && selectedGig.nights && (
          <React.Fragment>
            <Fade right>
              <div className="bringer-and-tubes-etc__container flex-center flex-col border-radius">
                {selectedGig.nights.map((each, i) => <p style={{ fontSize: 12, marginBottom: 4, background: '#d1d1cc' }} key={i}>{each}</p>)}
              </div>
            </Fade>
          </React.Fragment>
        )}
      </div>

      <div className="col-sm-9 flex-center">
        <Fade bottom>
          {selectedGig && selectedGig.blurb && <p className="gig__blurb padding-on orange margin-top skew-right">{selectedGig.blurb}</p>}
        </Fade>
      </div>

      <React.Fragment>
        <Fade>
          <div className="contact__container flex-center flex-col margin-top margin-bottom grey border-on rounded-corners">

            <p className="margin-off nuke-grey">Contact:</p>

            <div className="flex-center flex-row black space-between box-shadow">

              {selectedGig && selectedGig.twitterHandle && (
                <div onClick={() => window.open(`https://twitter.com/${selectedGig.twitterHandle}`, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="twitter" />
                </div>
              )}
              {selectedGig && selectedGig.facebook && (
                <div onClick={() => window.open(selectedGig.facebook, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="facebook" />
                </div>
              )}
              {selectedGig && selectedGig.website && (
                <div onClick={() => window.open(selectedGig.website, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="website" />
                </div>
              )}
              {selectedGig && selectedGig.email && (
                <div onClick={() => window.open(`mailto:${selectedGig.email}`, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="email" />
                </div>
              )}
              {selectedGig && selectedGig.howToBook && (
                <div onClick={() => window.open(selectedGig.howToBook, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="book" />
                  <p className="orange skew-right">How To Book =></p>
                </div>
              )}
            </div>
          </div>

        </Fade>
      </React.Fragment>

      {selectedGig.attended && selectedGig.attended.length && (
        <React.Fragment>
          <React.Fragment>
            <Fade>
              <div className="col-sm-12 flex-center flex-row margin-top">
                <h3 className="attended__circ__title white skew-left grey">Who has performed here?</h3>
              </div>
            </Fade>
          </React.Fragment>

          <React.Fragment>
            <Fade>
              <div className="col-sm-12 attended__container flex-center flex-row">
                {selectedGig && selectedGig.attended && selectedGig.attended.length > 0 && selectedGig.attended.length < 16 &&
                  selectedGig.attended.filter(each => each.uid !== uid).map((each, i) => (
                    <Link key={i} to={`/act/${each.uid}`}>
                      <DynamicImage small src={each.profilePicture} caption={each.username} />
                    </Link>
                  ))
                }
                {attended && (
                  <Jump>
                    <Link to={`/act/${uid}`}>
                      <div className="attended__circ__container">
                        <img className="attended__circ__img" src={userProfile.profilePicture || require('./panda_avatar.jpg')} />
                        <p className="attended__circ__name">{userProfile.username}</p>
                      </div>
                    </Link>
                  </Jump>
                )}
                {selectedGig && selectedGig.attended && selectedGig.attended.length > 0 && selectedGig.attended.length > 15 &&
                  selectedGig.attended.filter(each => each.uid !== uid).map((each, i) => (
                    <Link key={i} to={`/act/${each.uid}`}>
                      <div className="attended__circ__container">
                        <img className="attended__circ__img" src={each.profilePicture !== "/static/no_prof_pic.png" ? each.profilePicture : require('./panda_avatar.jpg')} />
                        <p className="attended__circ__name">{each.username}</p>
                      </div>
                    </Link>
                  ))
                }


              </div>

            </Fade>
          </React.Fragment>
        </React.Fragment>
      )}

      <div className="col-sm-12 flex-center margin-bottom flex-col">
        <div className="haveIPerformedHere">
          <p className="orange skew-right">Have <strong>YOU</strong> Performed Here?</p>
          <div className="flex-row">
            <Button text="Yes" onClick={() => handleAttendClick('Yes')} color={attended ? "green" : "grey"} />
            <Button text="No" onClick={() => handleAttendClick('No')} color={attended ? "grey" : "darkred"} />
          </div>
        </div>
      </div>

      <Comments
        firebase={firebase}
        comments={selectedGig && selectedGig.comments || []}
        refetchData={refetchThisGig}
        id={selectedGig && selectedGig.id}
        city={city}
        />

    </div>
  )
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
  city: state.gigs.city,
  selectedGig: state.gigs.selectedGig,
})

const mapDispatchToProps = dispatch => ({
  updateStateFiltersChanged: arr => dispatch(filtersChanged(arr)),
  updateStateSelectedGig: id => dispatch(selectedGig(id)),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
});

export default compose(
  withRouter,
  withFooter,
  withPage,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(GigPage);
