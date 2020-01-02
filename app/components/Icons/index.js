import React from 'react';

import Avatar from './avatar';
import Camera from './camera';
import Facebook from './facebook';
import Gigs from './gigs';
import List from './list';
import Masks from './masks';
import Mic from './microphone';
import SpeechBubble from './speechBubble';
import Twitter from './twitter';
import Website from './website';
import YouTube from './YouTube';

import useStyles from './styles.js';

function Icon({ icon }) {

  const classes = useStyles();

  return (
    <div className={classes.iconContainer}>
        { icon === 'avatar' && <Avatar /> }
        { icon === 'camera' && <Camera /> }
        { icon === 'facebook' && <Facebook /> }
        { icon === 'gigs' && <Gigs /> }
        { icon === 'list' && <List /> }
        { icon === 'masks' && <Masks /> }
        { icon === 'mic' && <Mic /> }
        { icon === 'speechBubble' && <SpeechBubble /> }
        { icon === 'twitter' && <Twitter /> }
        { icon === 'website' && <Website /> }
        { icon === 'youtube' && <YouTube /> }
    </div>
  )
}

export default Icon;
