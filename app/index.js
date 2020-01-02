require('dotenv').config();

// import 'bootstrap/dist/css/bootstrap.min.css';
// ^^ doesnt seem to like import in react app ^^
// so have imported at app.html level

import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { configureStore } from './store/configureStore';
import Firebase, { FirebaseContext } from './components/Firebase';
import App from './App';

import './app.global.css';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

