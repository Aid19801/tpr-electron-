import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from '../../components/Firebase';
import { SignUpLink, PasswordForgetLink, Input, FunkyTitle, Button, withPage, Modal } from '../../components';
import * as ROUTES from '../../constants/routes';
import withLayout from '../../components/Layout';
import { saveUid, saveUserProfile } from '../../actions/user';
import { showSpinner, hideSpinner } from '../../actions/spinner';
import { getFromCache, saveToCache, clearCache } from '../../components/Cache';

const SignInPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
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


  componentDidMount() {
    clearCache();
  }
  onSubmit = event => {

    const { email, password } = this.state;
    const { updateStateShowSpinner, updateStateHideSpinner } = this.props;

    updateStateShowSpinner();

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

        // re-direct to HOME page.
        updateStateHideSpinner();
        return this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log('AT | 1. error back is ', error);
        if (error.code === 'auth/network-request-failed') {
          const offlineUid = getFromCache('uid');
          const offlineRetrievedUserProfile = getFromCache('user-profile');
          this.props.updateStateAuthenticatedUID(offlineUid);
          this.props.updateStateUserProfile(JSON.parse(offlineRetrievedUserProfile))
          return this.props.history.push(ROUTES.HOME);
        }
        updateStateHideSpinner();
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
    const { spinnerLoading } = this.props;

    const isInvalid = password === '' || email === '';

    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        {!spinnerLoading && (
          <React.Fragment>
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
              {error && <Modal heading="Oh No!" body={error.message} killModal={this.handleKillModal} />}
            </form>

          </React.Fragment>
        )}

        { spinnerLoading && <h1>Loading...</h1> }

        <SignUpLink />

        <PasswordForgetLink />
      </div>
    );
  }
}

const mapStateToProps = ({ spinner }) => ({
  spinnerLoading: spinner.loading,
});

const mapDispatchToProps = dispatch => ({
  updateStateAuthenticatedUID: id => dispatch(saveUid(id)),
  updateStateUserProfile: (obj) => dispatch(saveUserProfile(obj)),
  updateStateShowSpinner: () => dispatch(showSpinner()),
  updateStateHideSpinner: () => dispatch(hideSpinner()),
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignInFormBase);

export default withPage(SignInPage);

export { SignInForm };
