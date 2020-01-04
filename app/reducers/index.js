// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import connectivity from './connectivity';
import counter from './counter';
import gigs from './gigs';
import news from './news';
import user from './user';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    connectivity,
    counter,
    gigs,
    news,
    user,
  });
}
