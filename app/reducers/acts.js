import * as types from '../actions/types';

const initialState = {
  acts: null,
  id: null,
  selectedGig: null,
  loading: false,
  error: null,
}

function acts(state = initialState, action) {
  switch(action.type) {
    case types.REQ_ACTS:
      return {
        ...state,
        loading: true,
      }
      break;
    case types.RECEIVED_ACTS:
      return {
        ...state,
        acts: action.acts,
        loading: false,
      }
      break;
    case types.SELECT_ACT:
      return {
        ...state,
        id: action.id,
        selectedAct: state.acts.filter((each) => each.id === action.id)[0],
      }
      break;

    case types.REMOVE_SELECT_ACT:
      return {
        ...state,
        selectedAct: null,
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default acts;
