import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { DynamicImage } from '..';
import { trimStringSpecifically } from '../../utils';
import './styles.css';

function EachComment({ id, uid, comment, username, profilePicture, timeposted, history }) {

  const handleClick = () => history.push(`/act/${uid}`);

  return (
    <div className="comments__comment__container flex-col black">

    <div className="flex-row space-between">
      <DynamicImage small src={profilePicture} caption={username} onClick={handleClick} />
      <p className="timeposted">{moment(timeposted).format('DD/MM/YYYY')}</p>
    </div>


      <p className="comments__comment">{comment}</p>

    </div>
  );
}
export default withRouter(EachComment)
