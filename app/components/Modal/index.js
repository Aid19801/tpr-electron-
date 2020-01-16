import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './styles.css';

const Modal = ({
  heading,
  body,
  killModal,
  }) => {

  const handleClick = () => {
    return killModal();
  }
    return (
      <div className="modalContainer">

        <div className="modal__foo">

          <h1 className="modalHeading">{heading}</h1>
          <p className="modalBody">{body}</p>
          <Button text="Ok" onClick={handleClick} disabled={false} color="grey" />

        </div>
      </div>
    )

}

export default Modal;
