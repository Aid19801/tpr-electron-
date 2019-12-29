import React from 'react';
import useStyles from './styles.js';

function YouTube() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./yt.png')} alt="youtube" />
  )
}


export default YouTube;
