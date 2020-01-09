import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { withPage, withFooter, MapBox, PopOut} from '../../components'
import { withFirebase } from '../../components/Firebase';
import { requestGigs, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs } from '../../actions/gigs';
import { getFromCache, saveToCache } from '../../components/Cache';
import './styles.css';

function GigsPage({
  gigs,
  firebase,
  selectedGig,
  updateStateCacheExpiredFetchingGigs,
  updateStateLoadingCacheIntoStore,
  updateStateReceivedGigs,
  updateStateRequestingGigs,
}) {

  const [center, setCenter] = useState([-0.1255, 51.5090]);
  const [popoutBool, setPopoutBool] = useState(false);

  useEffect(() => {
    const cache = localStorage.getItem('gigs'); // check cache for news
    const ts = getFromCache('gigs-ts');
    console.log('gigs timestamp: ', ts)
    const isExpired =  (Date.now() - ts) > 10000000; // check date of cache

    if(!cache || cache.length < 1 || isExpired) { // if there's no cache gigs
      const store = gigs ;// check reduxStore
      if(!store || store.length < 1 || isExpired) { // if no cache & no store news, fetch the news!
        if (isExpired) { updateStateCacheExpiredFetchingGigs() }
        fetchGigs();
        const timestampToCache = Date.now();
        saveToCache('gigs-ts', timestampToCache); // time that gigs was saved to cache
      }
    } else { // if there IS cache gigs,
      const cachedGigs = JSON.parse(cache); // change it to a JS object
      updateStateLoadingCacheIntoStore();
      updateStateReceivedGigs(cachedGigs); // push it in the store (then it'll come thru props);
    }
  }, []);

  const fetchGigs = async () => {
    updateStateRequestingGigs();
    const gigs = await firebase.gigs();
    saveToCache('gigs', JSON.stringify(gigs));
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
        { selectedGig && <PopOut selectedGig={selectedGig} killPopout={() => null} /> }

        <div className="col-sm-12" style={{ marginBottom: 65 }} />

      </div>
    )
  }

  const mapStateToProps = state => ({
    gigs: state.gigs.gigs,
    selectedGig: state.gigs.selectedGig,
  })

  const mapDispatchToProps = dispatch => ({
    updateStateRequestingGigs: () => dispatch(requestGigs()),
    updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
    updateStateCacheExpiredFetchingGigs: () => dispatch(cacheExpiredFetchingGigs()),
    updateStateLoadingCacheIntoStore: () => dispatch(loadingCacheIntoStore()),
  });

  export default compose(
    withPage,
    withFooter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps),
  )(GigsPage);


