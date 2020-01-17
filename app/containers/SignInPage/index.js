import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from '../../components/Firebase';
import { SignUpLink, PasswordForgetLink, Input, FunkyTitle, Button, withPage, Modal } from '../../components';
import * as ROUTES from '../../constants/routes';
import withLayout from '../../components/Layout';
import { saveUid, saveUserProfile } from '../../actions/user';
import { getFromCache, saveToCache } from '../../components/Cache';

const SignInPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
    <FunkyTitle text="Sign In" />
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ ...INITIAL_STATE });
        this.props.updateStateAuthenticatedUID(res.user.uid); // add uid to redux
        saveToCache('uid', res.user.uid); // add uid to cache

        const cacheUserProfile = getFromCache('user-profile'); // check cache for user-profile, before trying to GET from firebase

        // IF nothing in Cache, fire off Firebase db user-profile getters
        if (!cacheUserProfile) {
          // call in the users profile
          this.props.firebase.user(res.user.uid).on('value', snapshot => {

            let fbuserProfile = snapshot.val();

            // get FB profile, check if faveGig exists
            if (
              (fbuserProfile && fbuserProfile.faveGig === '') ||
              (fbuserProfile && !fbuserProfile['faveGig'])
            ) {
              // if profile exists but faveGig empty, set cache to false (user hasnt completed db profile)
              return this.props.history.push(ROUTES.ACCOUNT);
            }

            if (fbuserProfile && fbuserProfile.faveGig) {
              console.log('saving this profile to cache: ', fbuserProfile);
              saveToCache('user-profile', fbuserProfile); // save to cache
              this.props.updateStateUserProfile(fbuserProfile); // dump in redux
            }
          });
        } else {
          // IF there *IS* a user profile in cache, add it to redux
          console.log('retrieved cached user profile was: ', cacheUserProfile);
          this.props.updateStateUserProfile(JSON.parse(cacheUserProfile));
        }

        setTimeout(() => {
          console.log('retrieved user profile correctly');
        }, 500);
        // re-direct to HOME page.
        return this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log('AT | 1. error back is ', error);
        if (error.code === 'auth/network-request-failed') {
          console.log('AT | 2. error back is ', error);
          const offlineUid = getFromCache('uid');
          console.log('AT | 3. offlineUid ', offlineUid);
          const offlineRetrievedUserProfile = getFromCache('user-profile');
          console.log('AT | 4. user prof ', offlineRetrievedUserProfile);
          this.props.updateStateAuthenticatedUID(offlineUid);
          this.props.updateStateUserProfile(JSON.parse(offlineRetrievedUserProfile))
          return this.props.history.push(ROUTES.HOME);
        }

        return this.setState({ error });
      });
      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleKillModal = () => {
    return this.setState({ error: null });
  }

  render() {

    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <form onSubmit={this.onSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

          <Input
            name="email"
            value={email}
            handleChange={this.onChange}
            type="text"
            placeholder="email"
          />

          <Input
            name="password"
            value={password}
            handleChange={this.onChange}
            type="password"
            placeholder="Password"
          />

          <Button text="Sign In" type="submit" disabled={isInvalid} />
          {error && <Modal heading="Oh No!" body={error.message} killModal={this.handleKillModal} /> }
        </form>

        <SignUpLink />

        <PasswordForgetLink />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateStateAuthenticatedUID: id => dispatch(saveUid(id)),
  updateStateUserProfile: (obj) => dispatch(saveUserProfile(obj)),
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(
    null,
    mapDispatchToProps
  )
)(SignInFormBase);

export default withPage(SignInPage);

export { SignInForm };
