import React, { Component } from 'react';
import useStyles from './styles';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage } from '../../components'

function HomePage() {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FunkyTitle text="Home" />
    </div>
  )
}

export default withPage(HomePage);
