import React from 'react';
import Fade from 'react-reveal/Fade';

import useStyles from './styles';
import Icon from '../Icons';
import DynamicImage from '../DynamicImage';

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

  const classes = useStyles();

  console.log('input has name ', name)

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
          ( type === 'text' || type === 'password') && (
          <input
            name={name}
            disabled={ name === 'email' || name === 'username' }
            value={value}
            onChange={(e) => handleChange(e)}
            type={type}
            placeholder={placeholder}
            className={classes.input}
            disabled={disabled ? disabled : null}
          />
          )
        }
        { icon && name !== "profilePicture" && <Icon icon={icon} /> }
        { icon && name === "profilePicture" && (
          <DynamicImage
            small
            src={value}
            fallbackSrc="https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg"
            greyBorder
          />
        )}
        </div>


      </div>
    </Fade>
    </React.Fragment>

  )
}

export default Input;
