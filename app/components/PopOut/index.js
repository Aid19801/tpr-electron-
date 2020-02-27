import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Icon from '../Icons';
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

        <div className="popout__actions">

          <div onClick={killPopout}>
            <Icon icon="trash_can" />
          </div>

          <div onClick={handleClick}>
            <p style={{ fontSize: 9, position: 'relative', top: 45, left: 17, color: 'grey' }}>more info</p>
            <Icon icon="more_info" />
          </div>
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
