import * as types from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  topics: [],
  newDiscussion: {},
  id: null,
};

const discussionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DISCUSSIONS_PAGE:
        console.log('reducer heard LOAD_DISCUSSIONS_PAGE ');
      return {
        ...state,
        loading: true
      };
      break;

    case types.LOADED_DISCUSSIONS_PAGE:
        console.log('reducer heard LOADED_DISCUSSIONS_PAGE ');
      return {
        ...state,
        loading: false,
        topics: action.topics,
      };
      break;

    case types.LOAD_DISCUSSION_PAGE:
        console.log('reducer heard LOAD_DISCUSSION_PAGE ');
      return {
        ...state,
        loading: true,
        id: action.id,
      };
      break;

    case types.LOADED_DISCUSSION_PAGE:
        console.log('reducer heard LOADED_DISCUSSION_PAGE ');
      return {
        ...state,
        loading: false,
      };
      break;

    case types.FAIL_DISCUSSIONS_PAGE:
        console.log('reducer heard FAIL_DISCUSSIONS_PAGE ');
      return {
        ...state,
        loading: false,
        error: action.error
      };
      break;

    case types.FAIL_DISCUSSION_PAGE:
        console.log('reducer heard FAIL_DISCUSSION_PAGE ');
      return {
        ...state,
        loading: false,
        error: action.error
      };
      break;

    case types.ADD_NEW_DISCUSSION:
        console.log('reducer heard ADD_NEW_DISCUSSION ');
      return {
        ...state,
        loading: true,
        newDiscussion: action.newDiscussion,
      };
      break;

    case types.NEW_DISCUSSION_ADDED:
        console.log('reducer heard NEW_DISCUSSION_ADDED ');
      return {
        ...state,
        loading: false,
      };
      break;

      default:
        return state;
  }
}

export default discussionsReducer;
