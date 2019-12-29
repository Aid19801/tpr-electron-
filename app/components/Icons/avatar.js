import React from 'react';
import useStyles from './styles.js';

function Avatar() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./man.png')} alt="user avatar" />
  )
}


export default Avatar;
