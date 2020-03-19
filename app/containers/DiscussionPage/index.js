import React, { useEffect, useState } from 'react';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, Modal, Button, EachActCard, DynamicImage } from '../../components';
import { loadedDiscussionPage, failDiscussionPage, loadDiscussionPage } from '../../actions/discussions';
import { withAuthentication } from '../../components/Session';
import { trimStringSpecifically } from '../../utils';
import './styles.css';

const foo = {
  id: "isassignedbyfirebase",
  startedBy: {
    id: "BjXbpuR4XleEzojEXjIA28liOIC3",
    profilePicture: "https:ooihbsdv.net",
    username: "John Johnson",
  },
  timestamp: 1584388393083,
  title: "What are we all doing during Covid then?",
  subtitle: "lipsum orem things and stuff and i just dont know what to say to this ipsum orem things and stuff and i just dont know what to say to this ipsum orem things and stuff and i just dont know what to say to this",
  comments: [
    {
      id: 19374501745,
      uid: "BjXbpuR4XleEzojEXjIA28liOIC3",
      profilePicture: "https:ooihbsdv.net",
      username: "John Johnson",
      comment: "lipsum orem things and stuff and i just dont know what to say to this ipsum or",
      timestamp: 1584388393083,
    },
    {
      id: 19374500045,
      uid: "BjXbpuR4XleEzojEXjIA28liOIC3",
      profilePicture: "https:ooihbsdv.net",
      username: "John Johnson",
      comment: "lipsum orem things and stuff and i just dont know what to say to this ipsum or",
      timestamp: 1584388393083,
    }
  ]
}

function DiscussionPage({
  firebase,
  user,
  id,
  uid,
  updateStateLoadedDiscussion,
  updateStatePageFailed,
  history,
  match
}) {

  const [discussionFromDatabse, setDiscussionFromDatabse] = useState(null);
  const [modal, setModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchDiscussion()
    updateStateLoadedDiscussion();
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keyup", escFunction);
  }, []);

  const escFunction = () => {
    if (event.keyCode === 27) {
      setModal(false);
    }
  }

  const fetchDiscussion = async () => {
    const backupID = match.params.id;
    const res = await firebase.discussion(backupID);
    setDiscussionFromDatabse(res);
    const el = document.querySelector('.messages__bottom');
    return el.scrollIntoView(false);

  }

  const goBack = () => {
    return history.goBack();
  }

  const toggleModal = () => setModal(!modal);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const thisComment = {
      commentId: `${uid}_${Date.now()}`,
      discussionId: match.params.id,
      uid,
      profilePicture: user.profilePicture,
      username: user.username,
      comment: newComment,
      timestamp: Date.now(),
    }

    let updatedComments = [
      ...discussionFromDatabse.comments,
      thisComment,
    ]

    let updatedDiscussionObject = {
      ...discussionFromDatabse,
      comments: updatedComments,
    }
    setModal(false);
    setNewComment('');
    firebase.patchDiscussion(match.params.id, updatedDiscussionObject);
    setTimeout(() => {
      fetchDiscussion();
    }, 500);
  }


  return (
    <div className="discussion__page row margin-bottom flex-center">

      <div className="w-100 flex-start">
        <Button text="⏪Back" onClick={() => goBack()} />
      </div>

      <div className="col-sm-12">


        <React.Fragment>
          <Jump>
            <FunkyTitle text={discussionFromDatabse ? discussionFromDatabse.title : "Loading..."} />
            <h4 className="white">{discussionFromDatabse && discussionFromDatabse.subtitle}</h4>
          </Jump>
        </React.Fragment>

      </div>

      <div className="col-sm-12 flex-center flex-col">

        <div className="discussion__allcomments__container flex-center flex-col">

          {discussionFromDatabse &&
            discussionFromDatabse.comments &&
            discussionFromDatabse.comments.map((each, i) => {
              return (
                <React.Fragment key={i}>
                  <Fade>
                    <div className="discussion__comment__container flex-row space-between" id={ each.uid === uid && "my_own_comment"}>
                      <div className="flex-col cell-small">
                        <DynamicImage src={each.profilePicture} small />
                        <p className="username grey white skew-left">{each.username}</p>
                      </div>
                      <div className="flex-col">
                        <p className="comment white">{each.comment}</p>
                      </div>
                      <div className="flex-col">
                        <p className="timestamp white">{moment(each.timestamp).format('DD/MM/YYYY')}</p>
                      </div>
                    </div>
                  </Fade>
                </React.Fragment>
              )
            })
          }

          { discussionFromDatabse &&
            (!discussionFromDatabse.comments || discussionFromDatabse.comments.length < 1 || discussionFromDatabse.comments === []) &&
            <p className="white">Oh No! No one has said anything yet...</p>
          }


        </div>


        {!modal && (
          <div className="speech__bubble">
            <Button text="💬" onClick={toggleModal} color="orange" />
          </div>
        )}

        {modal && (
          <React.Fragment>
            <Fade bottom big>
              <div className="discussion__modal__container">

                <div className="flex-col flex-center">
                  <p className="white margin-bottom">post your comment</p>

                  <div className="flex-row flex-center">
                    <DynamicImage src={user.profilePicture} small />

                    <form onSubmit={handleSubmitComment} className="flex-center flex-col">
                      <textarea onChange={(e) => setNewComment(e.target.value)} />
                      <Button type="submit" text="post" />
                    </form>
                  </div>

                </div>
                </div>
            </Fade>
          </React.Fragment>
        )}

        <div className="col-sm-12 messages__bottom" style={{ marginBottom: 65 }} />

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  topics: state.discussions.topics,
  user: state.user.userProfile,
  id: state.discussions.id,
  uid: state.user.uid,
})

const mapDispatchToProps = dispatch => ({
  updateStateLoadDiscussion: () => dispatch(loadDiscussionPage()),
  updateStateLoadedDiscussion: () => dispatch(loadedDiscussionPage()),
  updateStatePageFailed: (err) => dispatch(failDiscussionPage(err)),
});

export default compose(
  withRouter,
  withFooter,
  withPage,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
)(DiscussionPage);
