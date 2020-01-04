import React from 'react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchNewsStories, receivedNewsStories, selectedStory } from '../../actions/news';

import { trimStringSpecifically } from '../../utils';

import './styles.css';

const BoxCard = ({ id, img, blurb, headline, link, src, updateStateSelectNewsStory, ...props }) => {

  const handleClick = () => {

    console.log('handled click! : ', props);

    if (src === 'TPR') {
      updateStateSelectNewsStory(id);
      props.history.push(`/news/${id}`);
    }
    if (src !== 'TPR') {
      window.open(link, '_newtab')
    }
  }

  if (src === 'TPR') {
    // TPR news stories box cards
    return (
      <div className="col-sm-4 margin-top" onClick={handleClick}>
        <Fade>


              <div className="box-card hvr-float-shadow">
                <h4 className="card-h4">
                  {trimStringSpecifically(headline, 45)}
                </h4>
                <p className="card-p">{trimStringSpecifically(blurb, 110)}</p>
                <h3 className="card-h3">{src}</h3>

                <div className="card-img-container">
                  <img
                    alt="open mic comedy news"
                    className="card-img"
                    src={img}
                  />
                </div>
              </div>


        </Fade>
      </div>
    );
  }
  if (src !== 'TPR' && src !== 'lp') {
    // every news story that ISNT TPR
    return (
      <div className="col-sm-4 margin-top" onClick={handleClick}>
        <Fade>
          <div className="box-card hvr-float-shadow">

              <h4 className="card-h4">
                {trimStringSpecifically(headline, 45)}
              </h4>
              <p className="card-p">{trimStringSpecifically(blurb, 110)}</p>
              <h3 className="card-h3">{src}</h3>

              <div className="card-img-container">
                <img
                  alt="open mic comedy news"
                  className="card-img"
                  src={img}
                />
              </div>

          </div>
        </Fade>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  selectedGig: state.news.selectedGig,
})

const mapDispatchToProps = dispatch => ({
  updateStateSelectNewsStory: (id) => dispatch(selectedStory(id))
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(BoxCard);
