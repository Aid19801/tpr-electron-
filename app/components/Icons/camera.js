import React from 'react';
import useStyles from './styles.js';

function Camera() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./camera.png')} alt="watch acts" />
  )
}


export default Camera;
