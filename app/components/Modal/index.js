import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Button from '../Button';

const Modal = ({
  heading,
  body,
  killModal,
  }) => {

  const classes = useStyles();

  const handleClick = () => {
    return killModal();
  }


    return (
      <div className={classes.modalContainer}>
        <div className={classes.modalContentContainer}>
          <h1 className={classes.modalHeading}>{heading} poo</h1>
          <p className={classes.modalBody}>{body}</p>
          <Button text="Ok" onClick={handleClick} disabled={false} color="grey" />
        </div>
      </div>
    )

}

export default Modal;
