import React, { Component, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { compose } from 'redux';
import { withFirebase } from '../../components/Firebase';
import { withPage, Icon, ProfilePic, withFooter } from '../../components';
import withFunding from '../../components/WithFunding';
import * as ROUTES from '../../constants/routes';
import mockGigs from '../../mocks/mockGigs.json';

import './styles.css';

const LandingPage = (props) => {
  const [ gigs, setGigs ] = useState([]);

  const handleGigsArray = () => {
    const arr = mockGigs;

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    let trim = arr.slice(0, 14);

    let shuffled = shuffle(trim);

    return setGigs(shuffled);
  };

  useEffect(() => {
    handleGigsArray();
  }, [])

  return (
    <div id="landingPage">

      <div>

      <Link to={ROUTES.HOME}>
          <div className="">
            <div className="hns9">
              <h1>Open Mic Starts Here!</h1>
            </div>

            <div className="container">
              <div className="row flex-center">
                <Fade>
                  <div className="col-md-4 margin-top margin-bottom">
                    <div className="landing__promo-box tpr__border flex-center flex-col padding-on black-gradient">
                      <h3 className="orange center black">WTF IS THIS!?!</h3>
                      <p className="white center">
                        Everything you need to enjoy & endure London's electric
                        Open Mic comedy circuit!
                      </p>
                      <Icon icon="masks" />
                    </div>
                  </div>
                </Fade>
                <Fade>
                  <div className="col-md-4 margin-top margin-bottom">
                    <div className="landing__promo-box tpr__border flex-center flex-col padding-on black-gradient">
                      <h3 className="orange center black">FIND GIGS!</h3>
                      <p className="white center">
                        Check out where the latest Bringers & Non Bringers Are
                        On The Filterable Gig Map!
                      </p>
                      <Icon icon="gigs" />
                    </div>
                  </div>
                </Fade>
                <Fade>
                  <div className="col-md-4 margin-top margin-bottom">
                    <div className="landing__promo-box tpr__border flex-center flex-col padding-on black-gradient">
                      <h3 className="orange center black">WATCH SETS!</h3>
                      <p className="white center">
                        Catch up on your friends' latest sets, watching their
                        5-spots!
                      </p>
                      <Icon icon="camera" />
                    </div>
                  </div>
                </Fade>
              </div>
            </div>


            <div className="container-fluid">
              <div className="row w-1oo flex-center black box-shadow margin-off">
                { gigs && gigs.map((each, i) => {
                    if (each.img) {
                      return (
                        <React.Fragment key={i}>
                          <Fade left>
                            <ProfilePic srcProp={each.img} />;
                            </Fade>
                        </React.Fragment>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
      </Link>

      </div>

    </div>
  );
}

export default compose(
  withFunding,
  withPage,
  withFooter,
  withRouter,
)(LandingPage);

