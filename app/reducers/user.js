import * as types from '../actions/types';

const initialState = {
  uid: null,
  userProfile: {},
  error: null,
}

function user(state = initialState, action) {
  switch(action.type) {
    case types.SAVE_UID:
      console.log('reducer heard SAVE_UID ', action)
      return {
        ...state,
        uid: action.uid,
      }
      break;
    case types.SAVE_USER_PROFILE:
        console.log('reducer heard SAVE_USER_PROFILE ', action)
      return {
        ...state,
        userProfile: action.userProfile,
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default user;
