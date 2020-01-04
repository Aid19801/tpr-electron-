import * as types from '../actions/types';

const initialState = {
  stories: null,
  id: null,
  selectedStory: null,
  loading: false,
  error: null,
}

function news(state = initialState, action) {
  switch(action.type) {
    case types.REQ_NEWS_STORIES:
      return {
        ...state,
        loading: true,
      }
      break;
    case types.RECEIVED_NEWS_STORIES:
      return {
        ...state,
        stories: action.stories,
        loading: false,
      }
      break;
    case types.SELECT_STORY:
      return {
        ...state,
        id: action.id,
        selectedStory: state.stories.filter((each) => each.id === action.id),
      }
      break;

      default:
        return {
          ...state,
        }
  }
}

export default news;
