import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, BoxCard, LargeBoxCard } from '../../components'
import { fetchGigsFromGist, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs } from '../../actions/gigs';
import { getFromCache, saveToCache } from '../../components/Cache';
import './styles.css';

function GigPage({
  gigs,
  updateStateCacheExpiredFetchingGigs,
  updateStateLoadingCacheIntoStore,
  updateStateReceivedGigs,
  updateStateFetchGigs,
}) {

  // CDM
  useEffect(() => {

  }, []);


  return (
    <div className="row margin-bottom">
      <div className="col-sm-12">
        <FunkyTitle text="Gig Page" />
      </div>

      1x GIG PAGE

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
)(GigPage);


