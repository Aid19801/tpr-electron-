import * as types from '../actions/types';

const initialState = {
  loading: false,
  error: null,
}

function spinner(state = initialState, action) {
  switch(action.type) {
    case types.SHOW_SPINNER:
      return {
        ...state,
        loading: true,
      }
      break;
    case types.HIDE_SPINNER:
      return {
        ...state,
        loading: false,
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default spinner;
