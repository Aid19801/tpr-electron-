import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { saveToCache, getFromCache } from '../Cache';

function Comments({ comments, firebase, location, match }) {

  const [ uid, setUid ] = useState(null); // useEffect | take from cache
  const [ str, setStr ] = useState(''); // handleChange | store in local state

  const [ obj, setObj ] = useState({});

  useEffect(() => {
    console.log('AT | FBFBFBFBFB props:', firebase);
    const usersUid = localStorage.getItem('uid');
    setUid(usersUid);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObject = {
      commentId: `${uid}_${Date.now()}`, // so every comment is unique
      uid, // the user that posted it
      pageId: location.pathname, // pageID ref so we can group comments for Act page or Gig page
      timeposted: Date.now(), // time it was posted
      comment: str, // the comment itself
    }
    // 1. ADD TO USERS FIREBASE PROFILE
    // get users profile from FB

      let arr = [];

      let currentCacheProfile = JSON.parse(getFromCache('user-profile'));

      currentCacheProfile && currentCacheProfile.comments ? arr = [ ...currentCacheProfile.comments, commentObject ]
      : arr.push(commentObject);

      currentCacheProfile.comments = arr;

      const json = JSON.stringify(currentCacheProfile);
      saveToCache('user-profile', json);
      setObj(currentCacheProfile);

      firebase.user(uid).set({
        ...currentCacheProfile,
      });

      const isGig = location.pathname.includes('gig');
      const isAct = location.pathname.includes('act');

      console.log('AT | this isGig :', isGig);
      console.log('AT | this isAct :', isAct);

      if (isGig) {
        let updatedComments = comments && comments.length && comments || [];
        updatedComments.push(commentObject);
        // if comments exist, clone them, if not empty array
        firebase.editGig(match.params.id, "comments", updatedComments);
        // edit the gig on firebase and make that array
        // the `comments`
      }
  }

  const handleChange = (event) => {
    setStr(event.target.value);
  }

  return (
    <div className="comments__container row">
      <div className="col-sm-12 h-100 flex-center flex-col">
       <h4>Enter Your Comment</h4>

       <form onSubmit={handleSubmit} className="flex-col">
        <textarea name="comment" onChange={handleChange} className="comments__box" />
        <button type="submit">POST</button>
       </form>
      </div>
    </div>
  );
}
export default compose(
  withRouter,
)(Comments)

