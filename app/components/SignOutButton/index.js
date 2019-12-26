import React from 'react';
import { withFirebase } from '../Firebase';
import useStyles from './styles';

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <div className={classes.li}>
      <button className={classes.navOption} type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
    </div>
  )
}

export default withFirebase(SignOutButton);
