import React from 'react';
import './styles.css';

const Button = ({
  text,
  type,
  onClick,
  disabled,
  color,
  small,
  medium
}) => {

  return (
    <div
      className={disabled ? "disabledContainer" : "buttonContainer" }
      style={ color ? { padding: 0, border: `1px solid ${color}` } : null }
      style={ medium ? { width: '184px', height: '65px' } : null }
      >
      <button
        type={type ? type : null}
        onClick={onClick}
        className={disabled ? "disabledButton" : "button" }
        disabled={disabled}
        style={ color ? { background: color, borderRadius: 12, } : null }
      >
        {text}
      </button>
    </div>
  )
}

export default Button;
