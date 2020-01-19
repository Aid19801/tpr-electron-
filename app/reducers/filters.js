import * as types from '../actions/types';
import { filters as initialStateFilters } from '../components/Filters/filters';

const initialState = {
  loading: false,
  filters: initialStateFilters,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_FILTERS:
            console.log('reducer heard LOAD_FILTERS ', action);
      return {
        ...state,
        loading: true
      };
      break;

    case types.LOADED_FILTERS:
      console.log('reducer heard LOADED_FILTERS ', action);
      return {
        ...state,
        loading: false,
      };
      break;

    case types.FILTERS_CHANGED:
      console.log('reducer heard FILTERS_CHANGED', action);
      return {
        ...state,
        filters: action.filters,
      };
      break;

    case types.RESET_FILTERS:
      console.log('reducer heard RESET_FILTERS', action);
      return {
        ...state,
        filters: initialStateFilters,
        loading: false,
      };
      break;

    default:
      return state;
  }
};

export default filtersReducer;
