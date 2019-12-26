import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class SignUpLink extends React.Component {
  render() {
    return (
      <p style={{ margin: 2, color: 'orange', fontFamily: 'Arial', fontSize: 20, textAlign: 'center', width: '100%' }}>
        Don't have an account? <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 300 }} to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    )
  }
}

export default SignUpLink;
