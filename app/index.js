require('dotenv').config();

// import 'bootstrap/dist/css/bootstrap.min.css';
// ^^ doesnt seem to like import in react app ^^
// so have imported at app.html level

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import App from './App';

import './app.global.css';


const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

