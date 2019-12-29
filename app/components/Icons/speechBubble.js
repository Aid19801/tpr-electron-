import React from 'react';
import useStyles from './styles.js';

function SpeechBubble() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./speech-bubble.png')} alt="status tagline" />
  )
}


export default SpeechBubble;
