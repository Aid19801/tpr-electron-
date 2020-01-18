
import * as types from './types';

export const fetchFilters = () => {
  return { type: types.LOAD_FILTERS };
};

export const filtersLoaded = () => {
  return { type: types.LOADED_FILTERS };
};
export const filtersChanged = arr => {
  return { type: types.FILTERS_CHANGED, filters: arr };
};
