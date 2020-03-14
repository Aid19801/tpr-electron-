import React from 'react';
import { Link, Router } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { Icon, DynamicImage } from '../../components';
import { trimStringSpecifically } from '../../utils';
import './styles.css';

const downVoteSwitchedOn = false;

function EachActCard({
  voteAct,
  each,
  history,
}) {

  const handleClick = () => {
    console.log('clicked more on: ', each);
    history.push(`/act/${each.uid}`);
  }
  return (
    <React.Fragment>
      <Fade>

        <div className="each-act-container">

          <div className="each-act-row">
            <div className="each-act-rating-container">
              <div
                className="up-svg-container"
                onClick={() => voteAct('up', each)}
              >
                👍🏻
              </div>

              <h2 className="each-act-rating">{each.rating}</h2>

              { downVoteSwitchedOn && (
                <div
                  className="down-svg-container"
                  onClick={() => voteAct('down', each)}
                >
                  <p>DOWN</p>
                </div>
              )}
            </div>

            <div className="flex-row" onClick={handleClick}>

                <DynamicImage small src={each.profilePicture} fallbackSrc={require('../../media/panda_avatar.jpg')} />

                <div className="each-act-name">
                  <h4>{each.username}</h4>
                  <p>{trimStringSpecifically(each.tagline, 55)}</p>
                </div>

                { each.youtube && each.youtube !== "" && each.youtube !== "unknown" && <p>Watch Video!</p> }

            </div>


          </div>


        </div>

      </Fade>
    </React.Fragment>
  );
}


export default EachActCard
