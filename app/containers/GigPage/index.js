import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Jump from 'react-reveal/Jump';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, BoxCard, LargeBoxCard, Button, CircularImage, Icon } from '../../components'
import { fetchGigsFromGist, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs } from '../../actions/gigs';
import './styles.css';


let selectedGig = {
  id: 38,
  name: 'Lol Factory Blahdy BLAH!',
  venue: 'The Queens Head Arms',
  img: "https://i.ytimg.com/vi/5kOzeYp8RgU/hqdefault.jpg",
  lat: 51.5024,
  lng: -0.0734,
  blurb: "LOLLY POPS is a weekly FREE comedy night founded & compered by Irish MC, Wes Dalton. Branching out from their Camden roots with a brand new Monday show @ The Dean Swift in Tower Bridge. Each week they bring you a craic-ing bill of up-and-coming acts and special guest to headline. Fun and friendly night which brings people together through laughter and silliness. Doors 19.30!",
  nearestTubes: ['Picadilly Circus', 'Leics Square'],
  nights: ['Mon', 'Tue'],
  bringer: true,
  prebook: true,
  walkins: true,
  walkinSignUp: "",
  prebookSignUp: "monthly booking via email",
  howToBook: "http://www.funnyfeckers.co.uk/performers/",
  website: 'http://wearefunnyproject.com/',
  facebook: 'https://www.facebook.com/wearefunnyproject',
  twitterHandle: 'funnyFeckers',
  email: 'hello@google.com',
  attended: [
    {
      profilePicture: "/static/no_prof_pic.png",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Owen Clark"
    },
    {
      profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Des Lynham"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/John_Wallace_de_Beque_Farris.jpg/220px-John_Wallace_de_Beque_Farris.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Marcus Wallace"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/James_Dyson_in_February_2013.jpg/170px-James_Dyson_in_February_2013.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Crazy James McAdams"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Steve_Martin%2C_2017-08-11.jpg/1200px-Steve_Martin%2C_2017-08-11.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Funny Lolly Man!"
    },
    {
      profilePicture: "/static/no_prof_pic.png",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Owen Clark"
    },
    {
      profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Des Lynham"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/John_Wallace_de_Beque_Farris.jpg/220px-John_Wallace_de_Beque_Farris.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Marcus Wallace"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/James_Dyson_in_February_2013.jpg/170px-James_Dyson_in_February_2013.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Crazy James McAdams"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Steve_Martin%2C_2017-08-11.jpg/1200px-Steve_Martin%2C_2017-08-11.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Funny Lolly Man!"
    },
    {
      profilePicture: "/static/no_prof_pic.png",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Owen Clark"
    },
    {
      profilePicture: "https://cdn.images.express.co.uk/img/dynamic/1/590x/des_lynam-398579.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Des Lynham"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/John_Wallace_de_Beque_Farris.jpg/220px-John_Wallace_de_Beque_Farris.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99Ntjhiqu2",
      username: "Marcus Wallace"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/James_Dyson_in_February_2013.jpg/170px-James_Dyson_in_February_2013.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Crazy James McAdams"
    },
    {
      profilePicture: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Steve_Martin%2C_2017-08-11.jpg/1200px-Steve_Martin%2C_2017-08-11.jpg",
      uid: "fpLXYiJpSCVNcuoEwF99N892457894u2",
      username: "Funny Lolly Man!"
    },
  ]
}

function GigPage({
  gigs,
  history,
  // selectedGig,
}) {


  return (
    <div className="gig__page row margin-bottom flex-center">
      <div className="margin-left margin-top">
        <Button onClick={() => history.goBack()} text="Back" small color="orange" />
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
          {selectedGig && selectedGig.img && <CircularImage src={selectedGig.img} small />}
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
          <div className="contact__container flex-center flex-row margin-top margin-bottom grey border-on rounded-corners">

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


    <React.Fragment>
      <Fade>
        <div className="col-sm-12 flex-center flex-row margin-top">
          <h3 className="attended__circ__title white skew-left grey">Who has performed here?</h3>
        </div>
      </Fade>
    </React.Fragment>

    <React.Fragment>
      <Fade>
        <div className="col-sm-12 attended__container flex-center flex-row margin-top">
              { selectedGig && selectedGig.attended && selectedGig.attended.length > 0 && selectedGig.attended.length < 16 &&
                selectedGig.attended.map((each, i) => (
                  <Link key={i} to={`/act/${each.uid}`}>
                    <div className="attended__circ__container">
                      <img className="attended__circ__img" src={each.profilePicture !== "/static/no_prof_pic.png" ? each.profilePicture : require('./panda_avatar.jpg') } />
                      <p className="attended__circ__name">{each.username}</p>
                    </div>
                  </Link>
                ))
              }
              { selectedGig && selectedGig.attended && selectedGig.attended.length > 0 && selectedGig.attended.length > 15 &&
                selectedGig.attended.slice(0, 15).map((each, i) => (
                  <Link key={i} to={`/act/${each.uid}`}>
                    <div className="attended__circ__container">
                      <img className="attended__circ__img" src={each.profilePicture !== "/static/no_prof_pic.png" ? each.profilePicture : require('./panda_avatar.jpg') } />
                      <p className="attended__circ__name">{each.username}</p>
                    </div>
                  </Link>
                ))
              }
        </div>

      </Fade>
    </React.Fragment>

    <div className="col-sm-12" style={{ marginBottom: 65 }} />

    </div>
  )
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
  selectedGig: state.gigs.selectedGig,
})

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withRouter,
  withFooter,
  withPage,
  connect(mapStateToProps, null),
)(GigPage);
