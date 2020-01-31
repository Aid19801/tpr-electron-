import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import EachComment from './comment';
import { saveToCache, getFromCache } from '../Cache';
import Button from '../Button';
import './styles.css';

function Comments({ comments, firebase, location, match, refetchGig }) {

  const [uid, setUid] = useState(null); // useEffect | take from cache
  const [userProfile, setUserProfile] = useState(null); // useEffect | take from cache
  const [str, setStr] = useState(''); // handleChange | store in local state
  const [addComment, showAddComment] = useState(false); // handleChange | store in local state

  const [obj, setObj] = useState({});

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

    currentCacheProfile && currentCacheProfile.comments ? arr = [...currentCacheProfile.comments, commentObject]
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
      firebase.editGig(match.params.id, "comments", [...myArr, commentObject]);
      // edit the gig on firebase and make that array
      // the `comments`
      // FIND A WAY TO RE-FETCH this gig and re-populate
    }
    setStr('');
    showAddComment(false);
    refetchGig();
  }

  const handleChange = (event) => {
    setStr(event.target.value);
  }

  const handleAddCommentClick = () => showAddComment(!addComment);
  const handleCancelComment = () => showAddComment(!addComment);

  console.log('AT | comments :', comments);

  return (
    <div className="col-sm-12 comments__container flex-center flex-col black">
      <div className="flex-center flex-col black">

        <p className="margin-top margin-bottom">Comments ({comments && comments.length})</p>


        { (!comments || comments.length === 0) && <p>No Comments Yet</p>}

        { comments && comments.length > 0 && comments.map((each, i) => <EachComment {...each} key={i} /> )}

        {addComment && (
          <div className="comments__add-comment-container">
            <div className="comments__add-comment-form">
              <form onSubmit={handleSubmit} className="flex-col flex-center">
                <textarea name="comment" onChange={handleChange} className="comments__box" />
                <Button type="submit" text="post" color="orange" />
              </form>
              <p onClick={handleCancelComment}>cancel</p>
            </div>
          </div>
        )}


      </div>

      {!addComment && <Button onClick={handleAddCommentClick} text="Add Comment" color="grey" />}

    </div>
  );
}
export default compose(
  withRouter,
)(Comments)

