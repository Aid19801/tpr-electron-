import Prismic from 'prismic-javascript';
import { REQ_NEWS_STORIES, RECEIVED_NEWS_STORIES, SELECT_STORY, CACHE_EXPIRED_FETCHING_NEWS, LOADING_CACHE_NEWS_INTO_STORE } from './types';
import { shuffle } from '../utils';
const PRISMIC_ENDPOINT = 'https://des-lynham.prismic.io/api/v2';

// actions
export function requestNewsStories() {
  return {
    type: REQ_NEWS_STORIES,
  }
}
export function receivedNewsStories(arr) {
  return {
    type: RECEIVED_NEWS_STORIES,
    stories: arr,
  }
}
export function loadingCacheIntoStore() {
  return {
    type: LOADING_CACHE_NEWS_INTO_STORE,
  }
}
export function cacheExpiredFetchingNews() {
  return {
    type: CACHE_EXPIRED_FETCHING_NEWS,
  }
}
export function selectedStory(id) {
  return {
    type: SELECT_STORY,
    id: id,
  }
}

// asynchronous thunks - ALL News
export function fetchNewsStories() {

  return async function(dispatch) {

    dispatch(requestNewsStories());

    let gistNews = await fetchNewsStoriesFromGistAPI();
    let tprNews = await fetchTPRStoriesfromPrismicAPI();

    let concatNews = [
      ...tprNews,
      ...gistNews,
    ]

    const shuffled = shuffle(concatNews);

    return dispatch(receivedNewsStories(shuffled));
  }

}

// git gist api fetch
async function fetchNewsStoriesFromGistAPI() {
  let arr = [];

  try {
    const res = await fetch(
      'https://api.github.com/gists/424b043765bf5ad54cb686032f141b34'
    );

    const json = await res.json();

    const rawUrl = json.files.articles.raw_url;

    const req = await fetch(rawUrl);

    const reqJson = await req.json();

    arr = reqJson.articles.slice(0, 12);

    return arr;

  } catch (error) {
    console.log('fetch news from gist error: ', error);
  }
}

async function fetchTPRStoriesfromPrismicAPI() {

  const client = Prismic.client(PRISMIC_ENDPOINT);

    try {
      const res = await client.query(
        Prismic.Predicates.at('document.type', 'news-story'),
        { orderings: '[document.last_publication_date]' }
      );
      let mostRecentFirst = res.results.reverse();
      return mostRecentFirst;
    } catch (error) {
      console.log('fetch news from prismic error: ', error);
    }
}
