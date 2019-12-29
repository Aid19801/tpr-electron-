import React from 'react';
import Fade from 'react-reveal/Fade';
import useStyles from './styles';
import Icon from '../Icons';

const Input = ({
  name,
  value,
  handleChange,
  type,
  placeholder,
  descr,
  selectOptions,
  icon,
  disabled
  }) => {
console.log('input has icon ', icon)
  const classes = useStyles();


  return (
    <React.Fragment>
    <Fade left>

      <div className={classes.inputContainer}>

        {descr && <p className={classes.inputTitle}>{descr}</p> }

        <div className={classes.inputAndIconRow}>

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
          ( type === 'text' || type=== 'password') && (
          <input
            name={name}
            value={value}
            onChange={(e) => handleChange(e)}
            type={type}
            placeholder={placeholder}
            className={classes.input}
            disabled={disabled ? disabled : null}
          />
          )
        }
        { icon && <Icon icon={icon} /> }
        </div>


      </div>
    </Fade>
    </React.Fragment>

  )
}

export default Input;
