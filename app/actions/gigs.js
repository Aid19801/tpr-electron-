import Prismic from 'prismic-javascript';
import { REQ_GIGS, RECEIVED_GIGS, SELECT_GIG, CACHE_EXPIRED_FETCHING_GIGS, LOADING_CACHE_GIGS_INTO_STORE } from './types';
import { shuffle } from '../utils';

// actions
export function requestGigs() {
  return {
    type: REQ_GIGS,
  }
}
export function receivedGigs(arr) {
  return {
    type: RECEIVED_GIGS,
    gigs: arr,
  }
}
export function loadingCacheIntoStore() {
  return {
    type: LOADING_CACHE_GIGS_INTO_STORE,
  }
}
export function cacheExpiredFetchingGigs() {
  return {
    type: CACHE_EXPIRED_FETCHING_GIGS
  }
}
export function selectedGig(id) {
  return {
    type: SELECT_GIG,
    id: id,
  }
}

// asynchronous thunks - ALL gigs
export function fetchGigsFromGist() {

  return async function(dispatch) {

    dispatch(requestGigs());

    let gistGigs = await fetchGigsFromGistAPI();

    return dispatch(receivedGigs(gistGigs));
  }

}

// git gist api fetch
async function fetchGigsFromGistAPI() {
  let arr = [];

  try {
    const res = await fetch(
      `https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`
    );
    const json = await res.json();
    const rawUrl = json.files.gigs.raw_url;
    const req = await fetch(rawUrl);
    const reqJson = await req.json();

    const sortedGigs = reqJson.sort((a, b) => {
      var textA = a.name;
      var textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return sortedGigs;
  } catch (error) {
    console.log('fetchGigs gist error: ', error);
  }
}

