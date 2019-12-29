import React from 'react';
import useStyles from './styles.js';

function Twitter() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./tw.png')} alt="twitter" />
  )
}


export default Twitter;
