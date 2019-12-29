import React from 'react';
import useStyles from './styles';

const Button = ({
  text,
  type,
  onClick,
  disabled,
  color,
  small
}) => {
  const classes = useStyles();
  return (
    <div
      className={disabled ? classes.disabledContainer : classes.buttonContainer}
      style={ color ? { padding: 0, border: `1px solid ${color}` } : null }
      >
      <button
        type={type ? type : null}
        onClick={onClick}
        className={disabled ? classes.disabledButton : classes.button}
        disabled={disabled}
        style={ color ? { background: color, borderRadius: 12, } : null }
      >
        {text}
      </button>
    </div>
  )
}

export default Button;
