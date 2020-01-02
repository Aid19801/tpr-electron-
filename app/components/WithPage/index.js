import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getFromCache } from '../Cache';
import { saveUid, saveUserProfile } from '../../actions/user';
import { isConnected, isDisconnected } from '../../actions/connectivity';

import useStyles from './styles';

const withPage = MyComponent => {

  const HOC = (props) => {

    const classes = useStyles();

    const cachedUID = getFromCache('uid');
    const cachedUserProfile = getFromCache('user-profile');

    // REDUX | uid & user-profile
    useEffect(() => {
      if (cachedUID && cachedUID !== '') {
        props.updateStateAuthenticatedUID(cachedUID); // if cache UID exists, pop it back in redux
      } // stops us losing it when we refresh the app.
      if (cachedUserProfile) {
        props.updateStateUserProfile(JSON.parse(cachedUserProfile));
      }
    }, []);

    // REDUX | connectivity
    useEffect(() => {
      setInterval(() => {
        navigator.onLine ? props.updateStateConnected() : props.updateStateDisconnected();
      }, 5000);
    }, []);

    return (
      <div className="container">
        <MyComponent {...props} />
        { !props.isConnected && <p className="offline-banner">Offline Mode</p> }
      </div>
    )
  }

  const mapDispatchToProps = dispatch => ({
    updateStateAuthenticatedUID: (uid) => dispatch(saveUid(uid)),
    updateStateUserProfile: (obj) => dispatch(saveUserProfile(obj)),
    updateStateConnected: () => dispatch(isConnected()),
    updateStateDisconnected: () => dispatch(isDisconnected()),
  });

  const mapStateToProps = (state) => ({
    isConnected: state.connectivity.isConnected,
  });

  return connect(mapStateToProps, mapDispatchToProps)(HOC);
}


export default withPage;
