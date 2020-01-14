// import firebase from 'firebase';
import { REQ_ACTS, RECEIVED_ACTS, SELECT_ACT, REMOVE_SELECT_ACT, CACHE_EXPIRED_FETCHING_ACTS, LOADING_CACHE_ACTS_INTO_STORE } from './types';


// actions
export function requestActs() {
  return {
    type: REQ_ACTS,
  }
}
export function receivedActs(arr) {
  return {
    type: RECEIVED_ACTS,
    acts: arr,
  }
}
export function loadingCacheIntoStore() {
  return {
    type: LOADING_CACHE_ACTS_INTO_STORE,
  }
}
export function cacheExpiredFetchingActs() {
  return {
    type: CACHE_EXPIRED_FETCHING_ACTS
  }
}
export function selectedAct(id) {
  return {
    type: SELECT_ACT,
    id: id,
  }
}

export function removeSelectedAct() {
  return {
    type: REMOVE_SELECT_ACT,
  }
}
