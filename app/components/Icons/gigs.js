import React from 'react';
import useStyles from './styles.js';

function Gigs() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./map.png')} alt="map of gigs" />
  )
}


export default Gigs;
