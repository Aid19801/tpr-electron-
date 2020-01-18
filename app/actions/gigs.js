// import firebase from 'firebase';
import { REQ_GIGS, RECEIVED_GIGS, SELECT_GIG, FILTERED_GIGS, REMOVE_SELECT_GIG, CACHE_EXPIRED_FETCHING_GIGS, LOADING_CACHE_GIGS_INTO_STORE } from './types';


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
export function filteredGigs(arr) {
  return {
    type: FILTERED_GIGS,
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

export function removeSelectedGig() {
  return {
    type: REMOVE_SELECT_GIG,
  }
}
