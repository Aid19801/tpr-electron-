import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import EachComment from './comment';
import { saveToCache, getFromCache } from '../Cache';
import './styles.css';

function Comments({ comments, firebase, location, match }) {

  const [ uid, setUid ] = useState(null); // useEffect | take from cache
  const [ userProfile, setUserProfile ] = useState(null); // useEffect | take from cache
  const [ str, setStr ] = useState(''); // handleChange | store in local state

  const [ obj, setObj ] = useState({});

  useEffect(() => {
    const usersUid = localStorage.getItem('uid');
    const userProfile = JSON.parse(localStorage.getItem('user-profile'));
    setUserProfile(userProfile);
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
      username: userProfile.username,
      profilePicture: userProfile.profilePicture || "https://vignette.wikia.nocookie.net/fma/images/c/cd/Avatar_xiao-mei.png/revision/latest/top-crop/width/360/height/450?cb=20170316205323"
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
        let myArr = comments && comments.length ? comments : [];
        console.log('AT | updated Comments w/ commenObject pushed ', myArr);
        // if comments exist, clone them, if not empty array
        firebase.editGig(match.params.id, "comments", [ ...myArr, commentObject ]);
        // edit the gig on firebase and make that array
        // the `comments`
        // FIND A WAY TO RE-FETCH this gig and re-populate
      }
  }

  const handleChange = (event) => {
    setStr(event.target.value);
  }

  return (
    <div className="col-sm-12 comments__container black">
      <div className="h-100 flex-center flex-col">

      <p className="orange margin-off">Comments ({comments.length})</p>
      { comments && comments.length && comments.map((each, i) => {
        return <EachComment {...each} key={i} />
      }) }


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

