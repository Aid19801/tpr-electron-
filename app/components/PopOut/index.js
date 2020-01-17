import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import { removeSelectedGig } from '../../actions/gigs';
import { trimStringSpecifically } from '../../utils';
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
        <p className="popout__body">{trimStringSpecifically(selectedGig.blurb, 300)}</p>

        <ButtonToolbar>
          <Button onClick={killPopout} variant="secondary" size="sm">X</Button>
          <Button onClick={handleClick} variant="success" size="sm">More Info...</Button>
        </ButtonToolbar>

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
