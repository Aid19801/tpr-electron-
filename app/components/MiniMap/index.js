import React, { Component } from 'react';
import ReactMapboxGL, { Marker } from 'react-mapbox-gl';
import './styles.css';

const MapBoxMap = ReactMapboxGL({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
});

class MiniMap extends Component {

  onMove = () => {
    return;
  };

  onStyleLoad = map => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  render() {

    return (
      <div className="admin__mini-map__container">
        <MapBoxMap
          style="mapbox://styles/mapbox/streets-v9"
          center={this.props.coords}
          zoom={[12]}
          containerStyle={{
            height: '170px',
            width: '170px',
          }}
          onStyleLoad={this.onStyleLoad}
          onMove={this.onMove}
        >

          <Marker
            coordinates={this.props.coords}
            anchor="bottom"
          >
            <div
              className="mapSelectedStyle"
            />
          </Marker>

        </MapBoxMap>
      </div>
    );
  }
}

export default MiniMap;
