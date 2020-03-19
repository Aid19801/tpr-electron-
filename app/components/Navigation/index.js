import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOutButton';
import { AuthUserContext } from '../Session';

import useStyles from './styless';
import { Button } from '..';
import { saveToCache, clearFromCache } from '../Cache';

import './styles.css';

const Navigation = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navContainer}>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth {...authUser} /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
}

const NavigationAuth = (props) => {

  const [ popout, togglePopout ] = useState(false);

  const classes = useStyles();

  const isSuperUser = (
    props.uid === process.env.REACT_APP_SUPERUSER_ID &&
    props.email === process.env.REACT_APP_SUPERUSER_EMAIL
  );

  const handlePopOut = () => {
    togglePopout(!popout);
  }

  return (
    <div className={classes.navFlexRow}>
      <ul className={classes.ulContainer}>
        <li className={classes.li}>
          <Link className={classes.navOptionLogo} to={ROUTES.LANDING}>The Panda Riot</Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.navOption} to={ROUTES.HOME}>Home</Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.navOption} to={ROUTES.GIGS}>Gigs</Link>
        </li>
        <li className={classes.li}>
          <Link className={classes.navOption} to={ROUTES.ACTS}>Acts</Link>
        </li>
        <li className={classes.li}>
          <div>

            <p onClick={handlePopOut} className={classes.navOption} style={{ paddingBottom: 30 }}>Me</p>

            {
              popout && (
                <div className="me__pop-out__container flex-col">
                  <Link className={classes.navOption} to={`/act/${props.uid}`}>My Profile</Link>
                  <Link className={classes.navOption} to={ROUTES.ACCOUNT}>My Account</Link>
                </div>
              )
            }
          </div>
        </li>

        <li className={classes.li}>
          <Link className={classes.navOption} to={ROUTES.DISCUSSIONS}>Discussions</Link>
        </li>

        { isSuperUser && (
            <li className={classes.li}>
            <Link className={classes.navOption} to={ROUTES.ADMIN}>Admin✅</Link>
          </li>
          )
      }
      </ul>
      <SignOutButton />
    </div>
  );
};

const NavigationNonAuth = (props) => {
  const classes = useStyles();
    return (
      <div className={classes.navFlexRow}>
        <ul className={classes.ulContainer}>
          <li className={classes.li}>
            <Link className={classes.navOptionLogo} to={ROUTES.LANDING}>The Panda Riot</Link>
          </li>
          <li className={classes.li}>
            <Link className={classes.navOption} to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </ul>
      </div>
    );
};


export default Navigation;
