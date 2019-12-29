import React from 'react';
import useStyles from './styles';

const Input = ({
  name,
  value,
  handleChange,
  type,
  placeholder,
  descr,
  selectOptions,
  }) => {

  const classes = useStyles();


  return (
    <div className={classes.inputContainer}>
      {descr && <p className={classes.inputTitle}>{descr}</p> }
      { type === 'select' && (
        <select
          name={name}
          value={value}
          onChange={(e) => handleChange(e)}
          className={classes.input}
        >
         { selectOptions.map((each, i) => <option key={i}>{each}</option>) }
        </select>
      )}
      {
        (type === 'text' || type=== 'password') && (
        <input
          name={name}
          value={value}
          onChange={(e) => handleChange(e)}
          type={type}
          placeholder={placeholder}
          className={classes.input}
        />
        )
      }

    </div>
  )
}

export default Input;
