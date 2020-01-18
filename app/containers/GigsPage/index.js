import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { withPage, withFooter, MapBox, PopOut, Filters } from '../../components'
import { withFirebase } from '../../components/Firebase';
import { requestGigs, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs, filteredGigs } from '../../actions/gigs';
import { getFromCache, saveToCache } from '../../components/Cache';
import { days, isDay } from '../../utils';
import './styles.css';

function GigsPage({
  gigs,
  filters,
  firebase,
  selectedGig,
  updateStateReceivedGigs,
  updateStateRequestingGigs,
  updateStateFilteredGigs,
}) {

  const [center, setCenter] = useState([-0.1255, 51.5090]);
  const [popoutBool, setPopoutBool] = useState(false);

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    let updatedFilteredGigs = [];
    let onlyActiveFilters = filters.filter(each => each.active !== false);
    console.log('AT | onlyActiveFilters :', onlyActiveFilters);
    let gigsBefore = gigs;
    onlyActiveFilters.map((each) => {
      if (isDay(each.name)) {
        const filteredGigsToSpecificDay = gigsBefore.filter(eachGig => eachGig.nights.includes(each.name));
        updatedFilteredGigs = [
          ...filteredGigsToSpecificDay,
        ]
      }
      // if (each.name === "Bringers") {
      //   const filteredGigsToBringers = up
      // }

    })
    console.log('AT |2222  updatedFilteredGigs :', updatedFilteredGigs);
    updateStateFilteredGigs(updatedFilteredGigs);
  }, [filters])

  const fetchGigs = async () => {
    console.log('AT | fetching gigs again!!!!!');
    updateStateRequestingGigs();
    const gigs = await firebase.gigs();
    updateStateReceivedGigs(gigs);
  }

  // handle city changes the initial center value, passes down
  // to props, to <MapBox />.
  const handleCity = (str) => {
    switch (str) {
      case 'London':
        return setCenter([-0.1255, 51.5090]);
        break;
      case 'Manchester':
        return setCenter([-2.2426, 53.4808]);
        break;
      case 'Edinburgh':
        return setCenter([-3.1883, 55.9533]);
        break;
      case 'New York':
        return setCenter([-73.9840, 40.7610]);
        break;

      default:
        return setCenter([-0.1255, 51.5090]);
    }
  }

  // const updateThePopOutBool = () => setPopoutBool(!popoutBool);

  return (
    <div className="row margin-bottom">

      <div className="col-sm-12 margin-top">
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton onClick={() => handleCity('London')} variant="outline-warning" value={1} size="lg">London</ToggleButton>
            <ToggleButton onClick={() => handleCity('Manchester')} variant="outline-warning" value={2} size="lg">Manchester</ToggleButton>
            <ToggleButton onClick={() => handleCity('Edinburgh')} variant="outline-warning" value={3} size="lg">Edinburgh</ToggleButton>
            <ToggleButton onClick={() => handleCity('New York')} variant="outline-warning" value={4} size="lg">New York</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>

      <MapBox gigs={gigs} center={center} />
      {selectedGig && <PopOut selectedGig={selectedGig} killPopout={() => null} />}


      <Filters results={gigs} />
      <div className="col-sm-12" style={{ marginBottom: 65 }} />

    </div>
  )
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
  filters: state.filters.filters,
  selectedGig: state.gigs.selectedGig,
})

const mapDispatchToProps = dispatch => ({
  updateStateRequestingGigs: () => dispatch(requestGigs()),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
  updateStateCacheExpiredFetchingGigs: () => dispatch(cacheExpiredFetchingGigs()),
  updateStateLoadingCacheIntoStore: () => dispatch(loadingCacheIntoStore()),
  updateStateFilteredGigs: (arr) => dispatch(filteredGigs(arr)),
});

export default compose(
  withPage,
  withFooter,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(GigsPage);


