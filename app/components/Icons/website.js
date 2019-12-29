import React from 'react';
import useStyles from './styles.js';

function Website() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./ws.png')} alt="website" />
  )
}


export default Website;
