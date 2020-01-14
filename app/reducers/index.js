// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { HashHistory } from 'history';
import acts from './acts';
import connectivity from './connectivity';
import counter from './counter';
import gigs from './gigs';
import news from './news';
import user from './user';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    acts,
    connectivity,
    counter,
    gigs,
    news,
    user,
  });
}
