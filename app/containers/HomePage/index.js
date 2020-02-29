import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, BoxCard, LargeBoxCard, Button, withMessagesHOC } from '../../components'
import { fetchNewsStories, receivedNewsStories, selectedStory, cacheExpiredFetchingNews, loadingCacheIntoStore } from '../../actions/news';
import { saveToCache, getFromCache } from '../../components/Cache';
import withFunding from '../../components/WithFunding';
import './styles.css';

function HomePage({
  updateStateFetchNewsStories,
  updateStateReceivedNewsStories,
  newsStories,
  updateStateLoadingCacheIntoStore,
  updateStateCacheExpiredFetchingNews,
}) {

  const [loadMore, setLoadMore] = useState(false);

  // CDM
  useEffect(() => {
    const cache = localStorage.getItem('news-stories'); // check cache for news
    const ts = getFromCache('news-ts');
    const isExpired = (Date.now() - ts) > 10000000; // check date of cache

    if (!cache || cache.length < 1 || isExpired) { // if there's no cache news
      const store = newsStories;// check reduxStore
      if (!store || store.length < 1 || isExpired) { // if no cache & no store news, fetch the news!
        if (isExpired) { updateStateCacheExpiredFetchingNews() }
        fetchNews();
        const timestampToCache = Date.now();
        saveToCache('news-ts', timestampToCache); // time that news was saved to cache
      }
    } else { // if there IS cache news,
      const cachedStories = JSON.parse(cache); // change it to a JS object
      updateStateLoadingCacheIntoStore();
      updateStateReceivedNewsStories(cachedStories); // push it in the store (then it'll come thru props);
    }
  }, []);

  useEffect(() => {
    if (newsStories) { // if news stories *do* exist, push them into cache
      saveToCache('news-stories', JSON.stringify(newsStories));
    }
  }, [newsStories]);

  const fetchNews = () => {
    updateStateFetchNewsStories();
  }

  return (
    <div className="row margin-bottom">
      <div className="col-sm-12">
        <FunkyTitle text="Home" />
      </div>

      {newsStories && newsStories.length > 0 && newsStories.slice(0, 3).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}

      {newsStories && newsStories.length > 0 && newsStories[3].first_publication_date && (
        <LargeBoxCard
          id={newsStories[3].id}
          img={newsStories[3].data["news-image"].url}
          blurb={newsStories[3].data["news-body"][0].text}
          headline={newsStories[3].data["news-headline1"][0].text}
          link={newsStories[3].id}
          src="TPR"
          key={newsStories[3].id}
        />)}

      {newsStories && newsStories.length > 0 && !newsStories[3].first_publication_date && (
        <LargeBoxCard
          id={newsStories[3]._id}
          img={newsStories[3].img}
          blurb={newsStories[3].blurb}
          headline={newsStories[3].headline}
          link={newsStories[3].link}
          src={newsStories[3].src}
          key={newsStories[3]._id}
        />)}

      {newsStories && newsStories.length > 0 && newsStories.slice(4, 7).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}

      {newsStories && newsStories.length > 0 && newsStories[7].first_publication_date && (
        <LargeBoxCard
          id={newsStories[7].id}
          img={newsStories[7].data["news-image"].url}
          blurb={newsStories[7].data["news-body"][0].text}
          headline={newsStories[7].data["news-headline1"][0].text}
          link={newsStories[7].id}
          src="TPR"
          key={newsStories[7].id}
        />)}

      {newsStories && newsStories.length > 0 && !newsStories[7].first_publication_date && (
        <LargeBoxCard
          id={newsStories[7]._id}
          img={newsStories[7].img}
          blurb={newsStories[7].blurb}
          headline={newsStories[7].headline}
          link={newsStories[7].link}
          src={newsStories[7].src}
          key={newsStories[7]._id}
        />)}

      {newsStories && newsStories.length > 0 && newsStories[8].first_publication_date && (
        <LargeBoxCard
          id={newsStories[8].id}
          img={newsStories[8].data["news-image"].url}
          blurb={newsStories[8].data["news-body"][0].text}
          headline={newsStories[8].data["news-headline1"][0].text}
          link={newsStories[8].id}
          src="TPR"
          key={newsStories[8].id}
        />)}

      {newsStories && newsStories.length > 0 && !newsStories[8].first_publication_date && (
        <LargeBoxCard
          id={newsStories[8]._id}
          img={newsStories[8].img}
          blurb={newsStories[8].blurb}
          headline={newsStories[8].headline}
          link={newsStories[8].link}
          src={newsStories[8].src}
          key={newsStories[8]._id}
        />)}

      {newsStories && newsStories.length > 0 && newsStories.slice(9, 12).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}

      {newsStories && newsStories.length > 0 && newsStories.slice(13, 15).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}

      {newsStories && newsStories.length > 0 && newsStories[15].first_publication_date && (
        <LargeBoxCard
          id={newsStories[15].id}
          img={newsStories[15].data["news-image"].url}
          blurb={newsStories[15].data["news-body"][0].text}
          headline={newsStories[15].data["news-headline1"][0].text}
          link={newsStories[15].id}
          src="TPR"
          key={newsStories[15].id}
        />)}

      {newsStories && newsStories.length > 0 && !newsStories[15].first_publication_date && (
        <LargeBoxCard
          id={newsStories[15]._id}
          img={newsStories[15].img}
          blurb={newsStories[15].blurb}
          headline={newsStories[15].headline}
          link={newsStories[15].link}
          src={newsStories[15].src}
          key={newsStories[15]._id}
        />)}


      { !loadMore && (
        <div className="col-sm-12">
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button text="More..." onClick={() => setLoadMore(true)} orange />
          </div>
        </div>
      )
    }

      {loadMore && newsStories && newsStories.length > 0 && newsStories.slice(16, 21).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}
      {loadMore && newsStories && newsStories.length > 0 && newsStories.slice(22, 27).map((each, i) => {

        if (!each.first_publication_date) {
          return (
            <BoxCard
              id={each._id}
              img={each.img}
              blurb={each.blurb}
              headline={each.headline}
              link={each.link}
              src={each.src}
              key={each._id}
            />
          )
        } else {
          return (
            <BoxCard
              id={each.id}
              img={each.data["news-image"].url}
              blurb={each.data["news-body"][0].text}
              headline={each.data["news-headline1"][0].text}
              link={each.id}
              src="TPR"
              key={each.id}
            />
          )
        }
      })}


      <div className="col-sm-12" style={{ marginBottom: 65 }}></div>
    </div>
  )
}

const mapStateToProps = state => ({
  newsStories: state.news.stories,
})

const mapDispatchToProps = dispatch => ({
  updateStateFetchNewsStories: () => dispatch(fetchNewsStories()),
  updateStateReceivedNewsStories: (arr) => dispatch(receivedNewsStories(arr)),
  updateStateCacheExpiredFetchingNews: () => dispatch(cacheExpiredFetchingNews()),
  updateStateLoadingCacheIntoStore: () => dispatch(loadingCacheIntoStore()),
  updateStateSelectedStory: (obj) => dispatch(selectedStory(obj)),
});

export default compose(
  withPage,
  withFunding,
  withFooter,
  withMessagesHOC,
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);


