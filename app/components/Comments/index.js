import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import EachComment from './comment';
import { saveToCache, getFromCache } from '../Cache';
import Button from '../Button';
import './styles.css';

function Comments({
  comments,
  firebase,
  location,
  match,
  city,
  refetchData,
  id,
}) {

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

    console.log('AT | comment object is :', commentObject);
    console.log('AT | comments city is :', city);
    // 1. ADD TO USERS FIREBASE PROFILE
    // get users profile from FB

    let arr = [];

    // 1. SAVE TO USER CACHE
    let currentCacheProfile = JSON.parse(getFromCache('user-profile'));
    // if this user has comments existing, then include them
    // AND the comment obj
    // if it doesnt, just push 1 comment object into it ^^
    currentCacheProfile && currentCacheProfile.comments ? arr = [...currentCacheProfile.comments, commentObject]
      : arr.push(commentObject);

    currentCacheProfile.comments = arr;
    // then make that object's comments equal the `arr` of comments.
    const json = JSON.stringify(currentCacheProfile);
    saveToCache('user-profile', json);
    // save to cache
    setObj(currentCacheProfile);

    // 2. UPDATE FIREBASE USER | update the user's record on Firebase User Profile
    firebase.user(uid).set({
      ...currentCacheProfile,
    });

    // is this a GIG page comment, or an ACT page comment
    const isGig = location.pathname.includes('gig');
    const isAct = location.pathname.includes('act');

    console.log('AT | isGig :', isGig);
    console.log('AT | isAct :', isAct);

    // 3. UPDATE FIREBASE GIG DB
    if (isGig) {
      // if its a gig, take all of existing comments from selectedGig / store
      let existingCommentsFromStore = comments && comments.length ? comments : [];

      const allComments = [
        ...existingCommentsFromStore,
        commentObject,
      ]

      console.log('AT | allComments pushed to gig DB', allComments);

      firebase.editGig(id, "comments", allComments, city);
      // POST to gig fb firebase ^^
    }
    setStr(''); // nuke the content
    showAddComment(false); // kill the modal
    setTimeout(() => {
      refetchData(); // force a refetch
    }, 2000);
  }

  const handleChange = (event) => {
    setStr(event.target.value);
  }

  const handleAddCommentClick = () => showAddComment(!addComment);
  const handleCancelComment = () => showAddComment(!addComment);

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

