import React from 'react';
import useStyles from './styles';

const FunkyTitle = ({ text }) => {
  const classes = useStyles();
  return (
    <div className="flex-center">
      <h1>{text}</h1>
    </div>
  )
}

export default FunkyTitle;
