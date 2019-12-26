import React from 'react';
import useStyles from './styles';

const FunkyTitle = ({ text }) => {
  const classes = useStyles();
  return (
    <div className={classes.funkyTitleContainer}>
      <h1 className={classes.funkyTitle}>{text}</h1>
    </div>
  )
}

export default FunkyTitle;
