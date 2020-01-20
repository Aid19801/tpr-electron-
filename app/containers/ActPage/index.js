import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withPage } from '../../components';
import { withFirebase } from '../../components/Firebase';
import './styles.css';

function ActPage({ firebase, match: { params: { id }} }) {

  const [loading, setLoading] = useState(false);
  const [usersProfile, setUsersProfile] = useState(null);
  useEffect(() => {
    fetchUser()
  }, []);

  const fetchUser = () => {

    setLoading(true);

    return firebase.user(id).on('value', snapshot => {
      let chosenUser = snapshot.val();
      console.log('AT | chosenUser back :', chosenUser);
      setUsersProfile(chosenUser);
      setLoading(false);
    });
  }

  return (
    <div className="act__container">
     <p>yo</p>
    </div>
  );
}
export default compose(
  withFirebase,
  withPage
)(ActPage)
