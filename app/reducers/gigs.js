import * as types from '../actions/types';

const initialState = {
  gigs: null,
  id: null,
  selectedGig: null,
  loading: false,
  error: null,
}

function gigs(state = initialState, action) {
  switch(action.type) {
    case types.REQ_GIGS:
      return {
        ...state,
        loading: true,
      }
      break;
    case types.RECEIVED_GIGS:
      return {
        ...state,
        gigs: action.gigs,
        loading: false,
      }
      break;
    case types.SELECT_GIG:
      return {
        ...state,
        id: action.id,
        selectedGig: state.gigs.filter((each) => each.id === action.id)[0],
      }
      break;

    case types.REMOVE_SELECT_GIG:
      return {
        ...state,
        selectedGig: null,
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default gigs;
