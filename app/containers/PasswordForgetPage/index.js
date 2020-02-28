import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase';
import { Input, Button } from '../../components';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  hasReset: false,
}

class PasswordForgetFormBase extends Component {

  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ email: '', error: null, hasReset: true })
      })
      .catch(error => {
        this.setState({ error })
      })
    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    console.log('AT | psfnobd:', this.props);

    const { email, error, hasReset } = this.state;
    const isInvalid = email === '';

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Input
            name='email'
            value={this.state.email}
            handleChange={this.onChange}
            type='text'
            placeholder='Email Address'
          />

          <Button text="Submit" disabled={isInvalid} type='submit' medium />
          {error && <p className="orange padding-on fadeIn">{error.message}</p>}
          {hasReset && <p className="orange padding-on fadeIn">Please check your email for your reset instructions!</p>}
        </form>

        {hasReset && (
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Button onClick={() => this.props.history.push('/signin')} text="Go back to Sign In?" medium />
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default PasswordForgetPage;

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export {
  PasswordForgetForm,
}
