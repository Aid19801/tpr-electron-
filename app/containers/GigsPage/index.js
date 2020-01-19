import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { withPage, withFooter, MapBox, PopOut, Filters } from '../../components'
import { withFirebase } from '../../components/Firebase';
import { requestGigs, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs, filteredGigs } from '../../actions/gigs';
import { resetFilters } from '../../actions/filters';
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
  updateStateResetFilters,
}) {

  const [center, setCenter] = useState([-0.1255, 51.5090]);

  useEffect(() => {
    fetchGigs();
  }, []);

  useEffect(() => {
    let activeFilters = filters.filter(each => each.active);

    console.log('AT | active filters:', activeFilters);


    if (activeFilters && activeFilters.length && activeFilters.length === 1) {

      if (isDay(activeFilters[0].name)) {
        const arr = gigs.filter(each => each.nights.includes(activeFilters[0].name));
        updateStateFilteredGigs(arr);
      }
      if (activeFilters[0].name === 'Bringers') {
        const arr = gigs.filter(each => each.bringer);
        updateStateFilteredGigs(arr);
      }
      if (activeFilters[0].name === 'Non-bringers') {
        const arr = gigs.filter(each => !each.bringer);
        updateStateFilteredGigs(arr);
      }
    } // ^^ if theres only ONE filter, and its Mon/Tue/Wed etc, filter to that & push to Store
      // if its Bringers or Non Bringers, push that to the store.



    if (activeFilters && activeFilters.length && activeFilters.length === 2) {

      if (isDay(activeFilters[0].name)) {

        let arr = gigs.filter(each => each.nights.includes(activeFilters[0].name));

        if (activeFilters[1].name === 'Bringers') {
          let newArr = arr.filter(eachTwo => eachTwo.bringer);
          updateStateFilteredGigs(newArr);
        }
        if (activeFilters[1].name === 'Non-bringers') {
          let newArr = arr.filter(eachTwo => !eachTwo.bringer);
          updateStateFilteredGigs(newArr);
        }
        if (isDay(activeFilters[1].name)) {
          let newArr = arr.filter(eachTwo => eachTwo.nights.includes(activeFilters[1].name));
          updateStateFilteredGigs(newArr);
        }
      }

      // if (activeFilters[0].name === 'Mon') {
      //   let arr = gigs.filter(eachOne => eachOne.nights.includes('Mon'));
      //   if (activeFilters[1].name === 'Bringers') {
      //     let newArr = arr.filter(eachTwo => eachTwo.bringer);
      //     updateStateFilteredGigs(newArr);
      //   }
      //   if (activeFilters[1].name === 'Non-bringers') {
      //     let newArr = arr.filter(eachTwo => !eachTwo.bringer);
      //     updateStateFilteredGigs(newArr);
      //   }
      // }

      // if (activeFilters[0].name === 'Tue') {
      //   let arr = gigs.filter(eachOne => eachOne.nights.includes('Tue'));
      //   if (activeFilters[1].name === 'Bringers') {
      //     let newArr = arr.filter(eachTwo => eachTwo.bringer);
      //     updateStateFilteredGigs(newArr);
      //   }
      //   if (activeFilters[1].name === 'Non-bringers') {
      //     let newArr = arr.filter(eachTwo => !eachTwo.bringer);
      //     updateStateFilteredGigs(newArr);
      //   }
      // }

    }
    // ^^ if there's TWO filters, 1st one in Tue, filter to that
    // if 2nd filter is Bringers or Non-bringers, filter down Tue, to those, post that to Store

  }, [filters])

  const fetchGigs = async () => {
    updateStateResetFilters(); // anytime you fetch all gigs, filters should re-set to zero
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
  updateStateResetFilters: () => dispatch(resetFilters()),
});

export default compose(
  withPage,
  withFooter,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(GigsPage);


