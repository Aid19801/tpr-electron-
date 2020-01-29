import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from '../../components/Firebase';
import { requestGigs, cacheExpiredFetchingGigs, loadingCacheIntoStore, receivedGigs, filteredGigs } from '../../actions/gigs';
import { resetFilters } from '../../actions/filters';
import { days, isDay } from '../../utils';
import {
  fetchFilters,
  filtersChanged,
  filtersLoaded
} from '../../actions/filters';

import './styles.css';


function Filters({
  gigs,
  filters,
  firebase,
  city,
  handleCity,
  updateStateLoadInFilters,
  updateStateFiltersChanged,
  updateStateResetFilters,
  updateStateRequestingGigs,
  updateStateReceivedGigs,

}) {
  // debugger;
  const [nukeInactive, setNukeInactive] = useState(false);

  useEffect(() => {
    updateStateLoadInFilters();
    setNukeInactive(false);
  }, []);

  const handleClick = id => {
    const optionToChange = filters.filter(each => each.id === id)[0];
    let updatedFilters = filters.filter(each => each.id !== id);

    let updatedOption = {
      ...optionToChange,
      active: !optionToChange.active
    };

    updatedFilters.push(updatedOption);

    let sortedFilters = updatedFilters.sort((a, b) => {
      var textA = a.id;
      var textB = b.id;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    updateStateFiltersChanged(sortedFilters);
  };

  useEffect(() => {
    const activeFilters = filters.filter(
      each => each.active !== false
    );
    if (activeFilters.length > 1) {
      setNukeInactive(true);
    } else {
      setNukeInactive(false);
    }
  }, [filters]);

  const reloadAllGigs = async () => {
    let c = city;
    console.log('AT | reload all gigs:', c);

    updateStateRequestingGigs();
    let gigsToReRouteTo = [];
    if (c === 'london') {
      console.log('AT | city was london:', c)
      gigsToReRouteTo = await firebase.gigs();
      console.log('calling ldn gigs from firebase');
      handleCity(c);
    } else {
      console.log('AT | city wasnt london:', c);
      gigsToReRouteTo = await firebase.differentCityGigs(c);
      console.log('calling in OTHER gigs from firebase');
      handleCity(c);
    }
    updateStateReceivedGigs(gigsToReRouteTo);
    setNukeInactive(false);
    updateStateResetFilters();
    // handleCity(city);
  }

  return (
    <div className="filters__container">
      { gigs && gigs.length && filters && !nukeInactive && filters.map((each, i) => (
        <button
          disabled={each.active}
          onClick={() => handleClick(each.id)}
          key={i}
          style={each.active ? { background: 'rgba(139, 139, 141, 0.8)', border: '5px solid orange' } : { color: 'black' }}
        >
          {each.name}
        </button>
      )
      )}

      { filters && nukeInactive && filters.filter(each => each.active !== false)
        .map((each, i) => (
            <button
              disabled={each.active}
              onClick={() => null}
              key={i}
              style={{ background: 'rgba(139, 139, 141, 0.8)', border: '5px solid orange' }}
            >
              {each.name}
            </button>
          )
        )}

      { !filters || !gigs && (
        <h2>loading...</h2>
        )
      }

      { (!gigs || !gigs.length || gigs.length < 1) && <button onClick={() => reloadAllGigs()}>Reset</button> }

      { gigs && gigs.length && filters && <button onClick={() => reloadAllGigs()}>Show All</button> }

    </div>
  );
}

const mapStateToProps = state => ({
  city: state.gigs.city,
  gigs: state.gigs.gigs,
  filters: state.filters.filters,
})

const mapDispatchToProps = dispatch => ({
  updateStateRequestingGigs: () => dispatch(requestGigs()),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
  updateStateLoadInFilters: () => dispatch(fetchFilters()),
  updateStateFiltersLoaded: () => dispatch(filtersLoaded()),
  updateStateFiltersChanged: arr => dispatch(filtersChanged(arr)),
  updateStateResetFilters: () => dispatch(resetFilters()),
});


export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
)(Filters)
