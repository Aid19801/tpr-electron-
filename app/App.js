import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Navigation } from './components';

import AccountPage from './containers/AccountPage';
import AdminPage from './containers/AdminPage';
import GigPage from './containers/GigPage';
import GigsPage from './containers/GigsPage';
import HomePage from './containers/HomePage';
import LandingPage from './containers/LandingPage';
import NewsStoryPage from './containers/NewsStory';
import PasswordForgetPage from './containers/PasswordForgetPage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';
import { withAuthentication } from './components/Session';

import * as ROUTES from './constants/routes';

const App = () => (
    <Router>
      <div style={{ height: '120vh'}}>
        <Navigation />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.NEWS_STORY} component={NewsStoryPage} />

        <Route path={ROUTES.GIGS} component={GigsPage} />
        <Route path={ROUTES.GIG} component={GigPage} />

        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />

      </div>
    </Router>
);

export default withAuthentication(App);
