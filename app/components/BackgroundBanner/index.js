import React, { useEffect, useState } from 'react';
import video from '../../media/loop.mp4';
import './styles.css';

function BackgroundBanner() {
  return (
    <div className="banner__container">
      <video autoPlay muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default BackgroundBanner
