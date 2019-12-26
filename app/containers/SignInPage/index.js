import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withFirebase } from '../../components/Firebase';
import { SignUpLink, PasswordForgetLink, Input, FunkyTitle, Button, withPage } from '../../components';
import * as ROUTES from '../../constants/routes';
import withLayout from '../../components/Layout';

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
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          {error && <p style={{ color: 'orange', fontFamily: 'Arial', fontSize: 20, textAlign: 'center', width: '60%' }}>{error.message}</p>}
        </form>

        <SignUpLink />

        <PasswordForgetLink />
      </div>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default withPage(SignInPage);

export { SignInForm };
