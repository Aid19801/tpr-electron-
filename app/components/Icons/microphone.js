import React from 'react';
import useStyles from './styles.js';

function Mic() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./mic.png')} alt="microphone open mic" />
  )
}


export default Mic;
