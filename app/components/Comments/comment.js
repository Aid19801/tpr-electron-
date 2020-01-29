import React, { useEffect, useState } from 'react';
import { DynamicImage } from '..';
import './styles.css';

function EachComment({ id, comment, username, profilePicture }) {
  return (
    <div className="comments__comment__container">
      <div className="flex-row flex-center margin-bottom">
        <DynamicImage small src={profilePicture} caption={username} />
        <p>{comment}</p>
      </div>
    </div>
  );
}
export default EachComment
