import * as types from '../actions/types';

const initialState = {
  isConnected: true,
  error: null,
}

function connectivity(state = initialState, action) {
  switch(action.type) {
    case types.INET_CONNECTED:
      // console.log('reducer heard INET_CONNECTED ')
      return {
        ...state,
        isConnected: true,
      }
      break;
    case types.INET_DISCONNECTED:
        // console.log('reducer heard INET_DISCONNECTED ')
      return {
        ...state,
        isConnected: false,
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default connectivity;
