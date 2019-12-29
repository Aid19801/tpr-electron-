import React from 'react';
import Avatar from './avatar';
import SpeechBubble from './speechBubble';
import Mic from './microphone';
import Facebook from './facebook';
import Twitter from './twitter';
import YouTube from './YouTube';
import Website from './website';

import useStyles from './styles.js';

function Icon({ icon }) {

  const classes = useStyles();

  return (
    <div className={classes.iconContainer}>
        { icon === 'avatar' && <Avatar /> }
        { icon === 'speechBubble' && <SpeechBubble /> }
        { icon === 'mic' && <Mic /> }
        { icon === 'facebook' && <Facebook /> }
        { icon === 'twitter' && <Twitter /> }
        { icon === 'youtube' && <YouTube /> }
        { icon === 'website' && <Website /> }
    </div>
  )
}

export default Icon;
