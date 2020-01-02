import React from 'react';
import useStyles from './styles.js';

function List() {

  const classes = useStyles();

  return (
      <img className={classes.icon} src={require('./list.png')} alt="list of acts" />
  )
}


export default List;
