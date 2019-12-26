import React from 'react';
import useStyles from './styles';

const Input = ({
  name,
  value,
  handleChange,
  type,
  placeholder,
  }) => {

  const classes = useStyles();

  return (
    <div className={classes.inputContainer}>
      <input
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        type={type}
        placeholder={placeholder}
        className={classes.input}
        />
    </div>
  )
}

export default Input;
