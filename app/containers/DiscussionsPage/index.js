import React, { useEffect, useState } from 'react';
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'redux';
import FunkyTitle from '../../components/FunkyTitle';
import { withPage, withFooter, Modal, Button, EachActCard, DynamicImage, Input } from '../../components';
import { loadDiscussionsPage, loadedDiscussionsPage, failDiscussionsPage, loadDiscussionPage, addNewDiscussion } from '../../actions/discussions';
import { withAuthentication } from '../../components/Session';
import './styles.css';
import { trimStringSpecifically } from '../../utils';

function DiscussionsPage({
  firebase,
  user,
  uid,
  updateStateLoadDiscussions,
  updateStateLoadedDiscussions,
  updateStateSelectDiscussion,
  updateStateAddDiscussion,
  updateStatePageFailed,
  history
}) {

  const [newDiscussionObject, setNewDiscussionObject] = useState({});
  const [discussionsFromDatabse, setDiscussionsFromDatabse] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', subtitle: '', });

  useEffect(() => {
    updateStateLoadDiscussions();
    fetchDiscussions()
    updateStateLoadedDiscussions();
    document.addEventListener("keydown", escFunction, false);
    return () => document.removeEventListener("keyup", escFunction);
  }, []);

  const escFunction = () => {
    if (event.keyCode === 27) {
      setModal(false);
    }
  }

  const fetchDiscussions = async () => {
    setLoading(true);
    const res = await firebase.discussions();
    setDiscussionsFromDatabse(res);
    setLoading(false);
  }

  // TO-DO
  const addNewDiscussion = async (e) => {
    e.preventDefault();
    let transformedFormData = {
      id: "updatedByFirebase",
      startedBy: {
        id: uid,
        profilePicture: user.profilePicture,
        username: user.username,
      },
      timestamp: Date.now(),
      title: formData.title,
      subtitle: formData.subtitle,
      comments: [],
    }

    updateStateAddDiscussion(transformedFormData);
    await firebase.addDiscussion(transformedFormData);
    setModal(false);
    setFormData({ title: '', subtitle: '', });
    fetchDiscussions();

  }

  const routeToDiscussion = (id) => {
    updateStateSelectDiscussion(id)
    history.push(`discussion/${id}`);
  }

  const handleChange = e => {
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData(updatedFormData);
  }

  return (
    <div className="discussions__page row margin-bottom flex-center">

      <div className="col-sm-12">

        <React.Fragment>
          <Jump>
            <FunkyTitle text={loading ? "Loading..." : "Discussions"} />
          </Jump>
        </React.Fragment>

      </div>

      <div className="col-sm-12 flex-center flex-col">

        <div className="discussions__alldiscussions__container flex-center flex-col">
          { discussionsFromDatabse && <div className="flex-row w-100 space-around">
            <div className="cell-small heading margin-bottom">Started By</div>
            <div className="cell-large heading margin-bottom">Topic</div>
            <div className="cell-small heading margin-bottom">Posted</div>
            <div className="cell-small heading margin-bottom">No. Comments</div>
          </div> }

          { discussionsFromDatabse && discussionsFromDatabse.map((each, i) => {
            return (
              <div onClick={() => routeToDiscussion(each.id)} className="discussions__row flex-row w-100 space-around" key={i}>
                <div className="cell-small flex-col">
                  <DynamicImage src={each.startedBy.profilePicture} small />
                  {each.startedBy.username}
                </div>
                  <div className="cell-large flex-col">
                    <h4 className="heading flex-start">{each.title}</h4>
                    <p>{ trimStringSpecifically(each.subtitle, 200)}</p>
                  </div>
                <div className="cell-small">{ moment(each.timestamp).format('DD/MM/YYYY') }</div>
                <div className="cell-small">{each.comments.length}</div>
              </div>
            )
          })}
        </div>

        { modal && (
          <React.Fragment>
            <Fade bottom big>
              <div className="discussion__modal__container">

                <div className="flex-col flex-center">
                  <p className="orange skew-left">Start New Discussion</p>

                  <div className="flex-row flex-center">

                    <form onSubmit={addNewDiscussion} className="flex-center flex-col">

                      <Input
                        name="title"
                        type="text"
                        handleChange={handleChange}
                        value={formData.title}
                        placeholder="title of discussion"
                      />

                      <Input
                        name="subtitle"
                        type="text"
                        handleChange={handleChange}
                        value={formData.subtitle}
                        placeholder="subtitle / blurb for discussion"
                      />

                      <Button type="submit" text="Submit" />
                    </form>
                  </div>

                </div>
                </div>
            </Fade>
          </React.Fragment>
        )}

        { !modal && <Button text="Start New" onClick={() => setModal(true)} /> }

        <div className="col-sm-12" style={{ marginBottom: 65 }} />

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  topics: state.discussions.topics,
  user: state.user.userProfile,
  uid: state.user.uid,
})

const mapDispatchToProps = dispatch => ({
  updateStateLoadDiscussions: () => dispatch(loadDiscussionsPage()),
  updateStateLoadedDiscussions: (arr) => dispatch(loadedDiscussionsPage(arr)),
  updateStateSelectDiscussion: (id) => dispatch(loadDiscussionPage(id)),
  updateStateAddDiscussion: (obj) => dispatch(addNewDiscussion(obj)),
  updateStatePageFailed: (err) => dispatch(failDiscussionsPage(err)),
});

export default compose(
  withRouter,
  withFooter,
  withPage,
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps),
)(DiscussionsPage);
