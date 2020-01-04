import React, { useEffect, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

// require('mapbox-gl-css');

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYWlkMTk4MDEiLCJhIjoiY2ptZWxxaWxoMjQzdTNwbm8yMnloM243cyJ9._3UeNWHv8wYUF5sT84lHnQ"
});

function MapBox(props) {

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      />

    </div>
  )

}

export default MapBox;
