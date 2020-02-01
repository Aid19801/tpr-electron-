import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Navigation } from './components';
import LandingPage from './containers/LandingPage';

import * as ROUTES from './constants/routes';

const App = () => (
    <Router>
      <div style={{ height: '120vh'}}>
        <Navigation />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />

      </div>
    </Router>
);

export default App;
