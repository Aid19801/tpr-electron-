import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeSelectedGig } from '../../actions/gigs';
import Button from '../Button';
import './styles.css';

const PopOut = ({
  selectedGig,
  updateStateKillSelectedGig,
  history,
}) => {

  const handleClick = () => {
    console.log('clicked more on: ', selectedGig);
    history.push(`/gig/${selectedGig.id}`);
  }

  const killPopout = () => {
    updateStateKillSelectedGig();
  }


  return (
    <div className="popout__container">
      <div className="popout__content-wrapper">

        <div className="flex-row flex-center">
          <h2 className="popout__heading">{selectedGig.name}</h2>
          <img
            className="popout__img"
            src={selectedGig.img || "https://cdn1.iconfinder.com/data/icons/capture-essentials/48/v-19-512.png"}
            alt="selected gig"
          />
        </div>
        <p className="popout__body">{selectedGig.blurb}</p>

        <div className="flex-row space-between">
          <Button text="close" small onClick={killPopout} disabled={false} color="grey" />
          <Button text="More =>" onClick={handleClick} disabled={false} color="orange" />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateStateKillSelectedGig: () => dispatch(removeSelectedGig()),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(PopOut);
