import React from 'react';
import useStyles from './styles.js';

function Facebook() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./fb.png')} alt="facebook" />
  )
}


export default Facebook;
