import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// const PasswordForgetLink = () => (
//   <div>
//     <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
//   </div>
// );

class PasswordForgetLink extends React.Component {
  render() {
    return (
      <p style={{ margin: 2, color: 'orange', fontFamily: 'Arial', fontSize: 20, textAlign: 'center', width: '100%' }}>
        <Link style={{ color: 'white', textDecoration: 'none', fontWeight: 300 }} to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
      </p>
    )
  }
}
export default PasswordForgetLink;
