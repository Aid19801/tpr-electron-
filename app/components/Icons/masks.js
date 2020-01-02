import React from 'react';
import useStyles from './styles.js';

function Masks() {

  const classes = useStyles();

  return (
      <img
        className={classes.icon}
        src={require('./masks.png')} alt="thespian masks"
      />
  )
}


export default Masks;
