import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOutButton';
import { AuthUserContext } from '../Session';

import useStyles from './styles';

const Navigation = () => {
  const classes = useStyles();
  return (
    <div className={classes.navContainer}>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
}

const NavigationAuth = () => {
  const classes = useStyles();
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
          <Link className={classes.navOption} to={ROUTES.ACCOUNT}>Account</Link>
        </li>
      </ul>
      <SignOutButton />
    </div>
  );
};

const NavigationNonAuth = () => {
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
