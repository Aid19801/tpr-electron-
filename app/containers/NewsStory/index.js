import React, { Component, useState, useEffect } from 'react';
import { RichText } from 'prismic-reactjs';
import Prismic from 'prismic-javascript';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Fade from 'react-reveal/Fade';

import { withFirebase } from '../../components/Firebase';
import { Input, FunkyTitle, Button, withPage, Modal, Icon, ProfilePic, withFooter } from '../../components';

import './styles.css';

const NewsStoryPage = ({ selectedStory }) => {

return (
    <div>

      <div className="container tpr__container margin-bottom">
        <div className="row flex-center">

          <h1 className="act-name mt-100">{selectedStory && selectedStory[0].data['news-headline1'][0].text}</h1>

          <div className="col-sm-12">
          { selectedStory && (
            <React.Fragment>
              <img
                className="tpr__image"
                src={selectedStory[0].data['news-image'].url}
                alt={
                  selectedStory[0].data['news-headline1'][0].text
                }
              />
              <RichText
                render={selectedStory[0].data['news-body']}
              />
            </React.Fragment>
          )}
          </div>
        </div>

      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  newsStories: state.news.stories,
  selectedStory: state.news.selectedStory,
})

// const mapDispatchToProps = dispatch => ({
//   updateStateFetchNewsStories: () => dispatch(fetchNewsStories()),
//   updateStateReceivedNewsStories: (arr) => dispatch(receivedNewsStories(arr))
// });

export default compose(
  withPage,
  withFooter,
  withRouter,
  connect(mapStateToProps, null),
)(NewsStoryPage);

