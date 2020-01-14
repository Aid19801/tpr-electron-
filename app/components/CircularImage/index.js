import React, { useEffect, useState } from 'react';
import './styles.css';

function CircularImage({ src, small, large }) {

  const [data, setData] = useState([]);

  useEffect(() => {

  }, [])
  return (
    <div className={`circ-img__container${small && '__small'} ${large && 'large'}`}>
      <img className="circ-img__img" src={src} alt="open mic comedy profile"/>
    </div>
  );
}
export default CircularImage
