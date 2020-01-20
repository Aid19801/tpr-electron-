import React, { Component } from 'react';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import PostMarkers from './markers';
import ReactMapboxGL, { Cluster, Marker } from 'react-mapbox-gl';
import CountUp from 'react-countup';
import { selectedGig } from '../../actions/gigs';
import './styles.css';

const MapBoxMap = ReactMapboxGL({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
});

let clusterMarkerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 50,
  width: 50,
  background: '#0F2751',
  borderRadius: '50%'
};

class MapBox extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: [],
      gigs: [],
      center: [-0.1255, 51.5090],
      total: null,
      leaves: [],
      posts: [],
      zoom: [9],
      toggle: false
    };
  }

  componentDidMount = () => {
    this.storeGigsFromReduxInState();
    this.setCenterFromSelectedCity();
  };

  onMove = () => {
    return;
  };

  onStyleLoad = map => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  setCenterFromSelectedCity = () => {
    return this.setState({ center: this.props.center });
  }

  storeGigsFromReduxInState = () => {
    const { gigs } = this.props;
    if (gigs && gigs.length !== 0) {
      this.setState({ gigs: gigs });
    }
  };

  componentDidUpdate(prevProps) {
    // console.log(1);
    if (this.props.selectedGig && this.state.toggle === false) {
      // console.log(2);
      const newCenter = [ this.props.selectedGig.lng, this.props.selectedGig.lat ];
      // console.log(3);
      setTimeout(() => {
        // console.log(4);
        this.setState({ center: [ this.props.selectedGig.lng, this.props.selectedGig.lat ]})
      }, 500)
    }
    if (prevProps.selectedGig !== this.props.selectedGig) {
      // console.log('aaaaa: ', this.props.selectedGig);
      setTimeout(() => {
        this.setState({ center: [ this.props.selectedGig.lng, this.props.selectedGig.lat ]})
      }, 500)
    }
    if (prevProps.gigs !== this.props.gigs) {
      // console.log('bbbb?');
      this.setState({ gigs: this.props.gigs})
    }
    if (prevProps.center !== this.props.center) {
      // console.log('ccccc?');
      this.setState({ center: this.props.center})
    }
  }

  clusterClick = (coordinates, total, getLeaves) => {
    this.setState({
      clickedCluster: true,
      center: [coordinates[0], coordinates[1]],
      zoom: [12]
    });
  };

  clusterMarker = (coordinates, pointCount, getLeaves) => {
    return (
      <Marker
        key={coordinates.toString()}
        gig
        exists
        coordinates={coordinates}
        style={clusterMarkerStyle}
        onClick={this.clusterClick.bind(
          this,
          coordinates,
          pointCount,
          getLeaves
        )}
      >
        <div className="div__cluster">
          <p className="p__cluster small white margin-off flex-center">{`Zoom In (${pointCount})`}</p>
        </div>
      </Marker>
    );
  };

  handleSelectMarker = data => {
    this.setState({ center: [data.lng, data.lat], toggle: true, zoom: [16] });
    this.props.updateStateSelectedGig(data.id);
  };

  render() {
    const { selectedGig } = this.props;

    if (this.state.isLoading) {
      return <h2>Loading...</h2>;
    }

    if (!this.state.isLoading) {
      return (
        <div className="map__container">
          {this.state.gigs && this.state.gigs.length && <div className="map__gigs__counter">Results: <CountUp start={1000} end={this.state.gigs.length} /></div>}
          <MapBoxMap
            style="mapbox://styles/mapbox/streets-v9"
            center={this.state.center}
            zoom={this.state.zoom}
            containerStyle={{
              height: '60vh',
              width: '95%',
            }}
            onStyleLoad={this.onStyleLoad}
            onMove={this.onMove}
          >

            { this.state.gigs && (
            <Cluster ClusterMarkerFactory={this.clusterMarker}>
              {this.state.gigs &&
                this.state.gigs.map((each, key) => (
                  <PostMarkers
                    key={key}
                    data={each}
                    handleClick={() => this.handleSelectMarker(each)}
                    coordinates={[each.lng, each.lat]}
                  />
                ))}
            </Cluster>
            )}
          </MapBoxMap>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
  selectedGig: state.gigs.selectedGig
});

const mapDispatchToProps = dispatch => ({
  updateStateSelectedGig: obj => dispatch(selectedGig(obj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapBox);
