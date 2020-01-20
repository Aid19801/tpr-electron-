import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { days, isDay } from '../../utils';
import {
  fetchFilters,
  filtersChanged,
  filtersLoaded
} from '../../actions/filters';

import './styles.css';


function Filters({ gigs, filters, updateStateLoadInFilters, updateStateFiltersChanged }) {
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


  return (
    <div className="filters__container">
      { gigs && gigs.length && filters && !nukeInactive && filters.map((each, i) => (
        <button
          disabled={each.active}
          onClick={() => handleClick(each.id)}
          key={i}
          style={each.active ? { opacity: '0.3' } : { color: 'black' }}
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
              style={{ opacity: '0.5', color: 'white' }}
            >
              {each.name}
            </button>
          )
        )}

      { !filters || !gigs && (
            <h2>Loading...</h2>
          )
        }
    </div>
  );
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
  filters: state.filters.filters,
})

const mapDispatchToProps = dispatch => ({
  updateStateLoadInFilters: () => dispatch(fetchFilters()),
  updateStateFiltersLoaded: () => dispatch(filtersLoaded()),
  updateStateFiltersChanged: arr => dispatch(filtersChanged(arr))
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Filters)
