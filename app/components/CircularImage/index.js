import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DynamicImage } from '../';
import './styles.css';

function CircularImage({ src, small, large }) {

  return (
    <div className={`circ-img__container${small && '__small'} ${large && 'large'}`}>
      <DynamicImage src={src} fallbackSrc={require('../../media/panda_avatar.jpg')} />
    </div>
  );
}

CircularImage.propTypes = {
  large: PropTypes.any,
  small: PropTypes.any,
  src: PropTypes.any
}

export default CircularImage
