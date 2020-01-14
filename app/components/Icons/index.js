import React from 'react';

import Avatar from './avatar';
import Bringer from './bringer';
import Calendar from './calendar';
import Camera from './camera';
import Clap from './clap';
import Email from './email';
import Facebook from './facebook';
import Gigs from './gigs';
import HowToBook from './howtobook';
import List from './list';
import Masks from './masks';
import Mic from './microphone';
import SpeechBubble from './speechBubble';
import Twitter from './twitter';
import Tube from './tube';
import Walkins from './walkins';
import Website from './website';
import YouTube from './YouTube';

import './styles.css';

function Icon({ icon }) {

  return (
    <div className="iconContainer">
        { icon === 'avatar' && <Avatar /> }
        { icon === 'bringer' && <Bringer /> }
        { icon === 'book' && <HowToBook /> }
        { icon === 'calendar' && <Calendar /> }
        { icon === 'camera' && <Camera /> }
        { icon === 'clap' && <Clap /> }
        { icon === 'email' && <Email /> }
        { icon === 'facebook' && <Facebook /> }
        { icon === 'gigs' && <Gigs /> }
        { icon === 'list' && <List /> }
        { icon === 'masks' && <Masks /> }
        { icon === 'mic' && <Mic /> }
        { icon === 'speechBubble' && <SpeechBubble /> }
        { icon === 'twitter' && <Twitter /> }
        { icon === 'tube' && <Tube /> }
        { icon === 'walkins' && <Walkins /> }
        { icon === 'website' && <Website /> }
        { icon === 'youtube' && <YouTube /> }
    </div>
  )
}

export default Icon;
