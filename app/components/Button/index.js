import React from 'react';
import useStyles from './styles';

const Button = ({ text, type, onClick, disabled }) => {
  const classes = useStyles();
  return (
    <div className={disabled ? classes.disabledContainer : classes.buttonContainer}>
      <button
        type={type}
        onClick={onClick}
        className={disabled ? classes.disabledButton : classes.button}
        disabled={disabled}
        >
        {text}
      </button>
    </div>
  )
}

export default Button;
