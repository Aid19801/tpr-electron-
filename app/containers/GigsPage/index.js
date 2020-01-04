import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, BoxCard, LargeBoxCard, MapBox } from '../../components'
import { fetchGigsFromGist, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs } from '../../actions/gigs';
import { getFromCache, saveToCache } from '../../components/Cache';
import './styles.css';

function GigsPage({
  gigs,
  updateStateCacheExpiredFetchingGigs,
  updateStateLoadingCacheIntoStore,
  updateStateReceivedGigs,
  updateStateFetchGigs,
}) {

  // CDM
  useEffect(() => {
    const cache = localStorage.getItem('gigs'); // check cache for gigs
    const ts = getFromCache('gigs-ts');
    // console.log('gigs timestamp:', ts);
    const now = Date.now();
    const isExpired =  (Date.now() - ts) > 10000000; // check date of cache

    if(!cache || cache.length < 1 || isExpired) { // if there's no cache gigs
      const store = gigs ;// check reduxStore
      if(!store || store.length < 1 || isExpired) { // if no cache & no store gigs, fetch the gigs!
        if (isExpired) { updateStateCacheExpiredFetchingGigs() }
        fetchGigs();
        const timestampToCache = Date.now();
        saveToCache('gigs-ts', timestampToCache); // time that `gigs` was saved to cache
      }
    } else { // if there IS cache gigs,
      const cachedGigs = JSON.parse(cache); // change it to a JS object
      updateStateLoadingCacheIntoStore();
      updateStateReceivedGigs(cachedGigs); // push it in the store (then it'll come thru props);
    }
  }, []);

  useEffect(() => {
    if(gigs) { // if news stories *do* exist, push them into cache
      saveToCache('gigs', JSON.stringify(gigs));
    }
  }, [gigs]);

  const fetchGigs = () => {
    updateStateFetchGigs();
  }

  return (
    <div className="row margin-bottom">
      <div className="col-sm-12">
        <FunkyTitle text="Gigs" />
      </div>

      <MapBox gigs={gigs} />

      <div className="col-sm-12" style={{ marginBottom: 65 }} />
    </div>
  )
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
})

const mapDispatchToProps = dispatch => ({
  updateStateFetchGigs: () => dispatch(fetchGigsFromGist()),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
  updateStateCacheExpiredFetchingGigs: () => dispatch(cacheExpiredFetchingGigs()),
  updateStateLoadingCacheIntoStore: () => dispatch(loadingCacheIntoStore()),
});

export default compose(
  withPage,
  withFooter,
  connect(mapStateToProps, mapDispatchToProps),
)(GigsPage);


