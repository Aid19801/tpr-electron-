// import firebase from 'firebase';
import {
  LOAD_DISCUSSIONS_PAGE,
  LOADED_DISCUSSIONS_PAGE,
  FAIL_DISCUSSIONS_PAGE,
  LOAD_DISCUSSION_PAGE,
  LOADED_DISCUSSION_PAGE,
  FAIL_DISCUSSION_PAGE,
  ADD_NEW_DISCUSSION,
 } from './types';

// actions
export function loadDiscussionsPage() {
  return {
    type: LOAD_DISCUSSIONS_PAGE,
  }
}

export function loadedDiscussionsPage(topics) {
  return {
    type: LOADED_DISCUSSIONS_PAGE,
    topics: topics
  }
}

export function failDiscussionsPage(err) {
  return {
    type: FAIL_DISCUSSIONS_PAGE,
    error: err
  }
}

export function loadDiscussionPage(id) {
  return {
    type: LOAD_DISCUSSION_PAGE,
    id: id
  }
}

export function loadedDiscussionPage() {
  return {
    type: LOADED_DISCUSSION_PAGE,
  }
}

export function failDiscussionPage() {
  return {
    type: FAIL_DISCUSSION_PAGE,
  }
}

export function addNewDiscussion(obj) {
  return {
    type: ADD_NEW_DISCUSSION,
    newDiscussion: obj
  }
}
export function newDiscussionAdded(args) {
  return {
    type: NEW_DISCUSSION_ADDED,
  }
}
