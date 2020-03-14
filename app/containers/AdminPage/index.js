import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from '../../components/Firebase';
import { MiniMap, FunkyTitle, Button, withPage, Modal, Icon, DynamicImage, Input } from '../../components';
import { requestGigs, receivedGigs } from '../../actions/gigs';
import Fade from 'react-reveal/Fade';
import * as ROUTES from '../../constants/routes';
import TrashCan from '../../components/Icons/trash-can';
import { validateGigObject } from '../../utils';
import './styles.css';

const AdminPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
    <FunkyTitle text="Admin CMS" />
    <AdminForm />
  </div>
);

const initialState = {
  id: '',
  name: 'Chuckle Deli',
  venue: 'The Lucas Arms',
  blurb: 'Non Bringer and last Thursday of the month | Chuckle Deli is a comedy club at The Lucas Arms, Kings Cross. Just moments from the tube. Message via FB if you would like to perform!',
  nights: ['Thu'],
  img: 'https://media-cdn.tripadvisor.com/media/photo-p/19/6e/fd/c3/dean-and-liam-going-viral.jpg',
  nearestTubes: ['Kings Cross'],
  postcode: 'WC1X 8QY',
  attended: [],
  comments: [],
  lat: null,
  lng: null,
  facebook: 'https://www.facebook.com/ChuckleDeliComedy/',
  twitterHandle: '',
  website: 'https://www.facebook.com/ChuckleDeliComedy/',
  prebook: 'Yes', // gets converted to bool
  bringer: 'No', // gets converted to bool
  walkins: 'No',// gets converted to bool
  walkinSignUp: null,
  howToBook: 'https://m.me/ChuckleDeliComedy?fbclid=IwAR1JAEqkti-tVrjjIwEEkRLSt5O7XL4-h2_dDaBFhrjz0JEkCNJg4adILFM',
  prebookSignUp: 'https://m.me/ChuckleDeliComedy?fbclid=IwAR1JAEqkti-tVrjjIwEEkRLSt5O7XL4-h2_dDaBFhrjz0JEkCNJg4adILFM',
  imgs: [],
}

class AdminFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbToPostTo: 'gigs',
      showModal: false,
      selectedGig: {},

      pageOne: true,
      pageTwo: false,
      pageThree: false,
      pageFour: false,
      ...initialState,
    }
  }

  componentDidMount() {
    this.fetchGigs();
  }

  fetchGigs = async () => {
    const { updateStateRequestingGigs, updateStateReceivedGigs, firebase } = this.props;
    updateStateRequestingGigs('London');
    const allGigs = await firebase.gigs();

    const sorted = allGigs.sort((a, b) => {
      var textA = a.name;
      var textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    updateStateReceivedGigs(sorted);
    this.setState({ dbToPostTo: 'gigs' });
  }

  fetchDifferentCity = async (str) => {
    const { updateStateRequestingGigs, updateStateReceivedGigs, firebase } = this.props;
    updateStateRequestingGigs(str);
    const diffCityGigs = await firebase.differentCityGigs(str);

    const sorted = diffCityGigs.sort((a, b) => {
      var textA = a.name;
      var textB = b.name;
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    updateStateReceivedGigs(sorted);
    this.setState({ dbToPostTo: str })
  }

  onSubmit = (event) => {


    const {
      uid,
      username,
      email,
      profilePicture,
      tagline,
      genre,
      rating,
      faveGig,
      includeInActRater,
      facebook,
      twitter,
      website,
      youtube,
      youtubeChannelURL,
      comments,
      attended,
    } = this.state;

    this.props.firebase.user(uid).set({
      username,
      email,
      tagline,
      profilePicture,
      includeInActRater,
      rating,

      faveGig,
      genre,
      facebook,
      twitter,
      website,
      youtube,
      youtubeChannelURL,
      comments,
      attended,
    });

    // debugger;

    event.preventDefault();
    return this.props.history.push(ROUTES.HOME);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCity = (str) => {
    console.log('AT | handleCity:');
    switch (str.toLowerCase()) {
      case 'london':
        this.fetchGigs()
        break;
      case 'manchester':
        this.fetchDifferentCity('manchester');
        break;

      default:
        return fetchGigs();
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleOpenModal = obj => {
    this.setState({
      ...obj,
      pageOne: false,
      pageTwo: true,
    });
  }

  handleCloseModal = () => this.setState({ selectedGig: {}, pageOne: true, pageTwo: false, });

  toggleEditor = () => this.setState({ pageTwo: false, pageThree: true });

  handleAddNightToNightsArray = (e) => {
    e.preventDefault();
    let arr = this.state.nights;
    arr.push(this.state.night);

    const list = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const inOrderDays = list.filter(each => arr.includes(each));

    this.setState({ nights: inOrderDays, night: '' });
  }

  handleNearestTubes = event => {
    let arr = [];
    arr.push(event.target.value);
    this.setState({ nearestTubes: arr });
  }

  handleRemoveNight = (nightToRemove) => {
    const updatedArray = this.state.nights.filter(each => each !== nightToRemove);
    this.setState({ nights: updatedArray });
  }

  transformPostBody = async (type) => {

    const validatedGigObject = await validateGigObject(this.state);

    if (type === 'new') {
      // Firestore won't let you rename the doc ID of database objects. It auto-gens a unique ID.
      // we need an individual pre-defined number eg 12, 14 etc.
      // so to get around it, we pull ALL existing gigs, bolt on the new object to it and post that.
      const existingGigs = this.props.gigs;
      const { id } = this.state;
      console.log('AT | BEFORE length :', existingGigs.length);
      this.props.firebase.addGig(validatedGigObject);
    }
    if (type === 'update') {
      this.props.firebase.patchGig(this.state.id, validatedGigObject);
    }

    this.setState({
      pageOne: true,
      pageTwo: false,
      pageThree: false,
      ...initialState,
    });

    setTimeout(() => {
      this.fetchGigs();

      window.scrollTo({
        top: 1,
        left: 100,
        behavior: 'smooth',
      });
    }, 500)
  }

  handleAddNewGig = () => this.setState({ id: this.props.gigs.length, pageOne: false, pageFour: true, });

  handleCancel = () => this.setState({ pageOne: true, pageTwo: false, pageThree: false, pageFour: false, ...initialState })

  render() {

    const { gigs } = this.props;
    const { selectedGig, name, img, lng, lat, venue, pageOne, pageTwo, pageThree, pageFour } = this.state;

    console.log('AT | this.state:', this.state);

    return (
      <React.Fragment>

        { pageOne && (
          <React.Fragment>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                <ToggleButton onClick={() => this.handleCity('London')} variant="outline-warning" value={1} size="lg">London</ToggleButton>
                <ToggleButton onClick={() => this.handleCity('Manchester')} variant="outline-warning" value={2} size="lg">Manchester</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>

            <div className="admin__gigs-list__container">
              <ul>
                (
                  <li onClick={this.handleAddNewGig} className="admin__gigs-list__each-gig white">
                    <Fade>
                      <p className="admin__gigs-list__gig admin__add_new">Add New</p>
                    </Fade>
                  </li>
                )
                {gigs && gigs.map((each, i) => {
                  return (
                    <li onClick={() => this.handleOpenModal(each)} key={i} className="admin__gigs-list__each-gig">
                      <Fade>
                        <p className="admin__gigs-list__gig">{each.name}</p>
                      </Fade>
                    </li>
                  )
                })}
              </ul>
            </div>
          </React.Fragment>
        )}

        { pageTwo && (
          <div className="admin__modal">

            <div className="flex-row flex-center w-100 space-between">
              <div className="admin__modal__close" onClick={() => this.handleCloseModal()}>
                <Icon icon="trash_can" />
              </div>

              <div className="flex-col">
                <h1>{name}</h1>
                <p className="venue">@ {venue}</p>
              </div>

              <div>

                <Button
                  onClick={this.toggleEditor}
                  text="edit"
                  color="orange"
                />

              </div>
            </div>

            <div className="admin__image-row__container">
              <DynamicImage
                src={img}
                small
                caption={`${name} | profile picture`}
              />

              <MiniMap coords={[lng, lat]} />

            </div>

            <h2>Nights of week: </h2>

            <div className="flex-row">
              {this.state.nights && this.state.nights.map((each, i) => {
                return <p key={i}>{each}</p>
              })}
            </div>

            <div className="admin__socials flex-center flex-row black space-between box-shadow">

              {this.state.twitterHandle && (
                <div onClick={() => window.open(`https://twitter.com/${selectedGig.twitterHandle}`, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="twitter" />
                </div>
              )}
              {this.state.facebook && (
                <div onClick={() => window.open(selectedGig.facebook, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="facebook" />
                </div>
              )}
              {this.state.website && (
                <div onClick={() => window.open(selectedGig.website, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="website" />
                </div>
              )}
              {this.state.email && (
                <div onClick={() => window.open(`mailto:${selectedGig.email}`, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="email" />
                </div>
              )}

              {this.state.howToBook && (
                <div onClick={() => window.open(selectedGig.howToBook, '_newtab')} className="bringer-and-tubes-etc__container flex-center flex-col">
                  <Icon icon="book" />
                  <p>How to book</p>
                </div>
              )}


            </div>

            <div className="admin__blurb__container flex-center space-between">
              <p className="admin__blurb">{this.state.blurb}</p>
            </div>

          </div>
        )}

        { pageThree && (

          <React.Fragment>

            <div className="admin__canx-btn w-100 flex-start">
              <Button text="<= Cancel" onClick={this.handleCancel}/>
            </div>





          <div className="admin__edit__container flex-col flex-center">

            <DynamicImage
              small
              src={this.state.img}
            />

            <Input
              name="img"
              value={this.state.img}
              placeholder={this.state.img}
              handleChange={this.handleChange}
              type="text"
              icon="avatar"
              descr="link to profile picture"
            />

            <Input
              name="name"
              value={this.state.name}
              placeholder={this.state.name}
              handleChange={this.handleChange}
              type="text"
              icon="mic"
              descr="name of the gig"
            />

            <Input
              name="venue"
              value={this.state.venue}
              placeholder={this.state.venue}
              handleChange={this.handleChange}
              type="text"
              icon="beer"
              descr="venue of the gig"
            />

            <Fade left>
              <div className="inputContainer">

                  <p className="inputTitle">Blurb</p>

                  <div className="inputAndIconRow">

                    <textarea
                      className="input"
                      name="blurb"
                      onChange={(e) => this.setState({ blurb: e.target.value })}
                      >
                      {this.state.blurb}
                    </textarea>

                    <Icon icon="speechBubble" />

                  </div>

              </div>
            </Fade>

            <Input
              name="postcode"
              value={this.state.postcode || ''}
              placeholder={this.state.postcode || 'eg. NW1 8TQ'}
              handleChange={this.handleChange}
              type="text"
              icon="map"
              descr="postcode"
            />

            <Input
              name="bringer"
              value={this.state.bringer}
              handleChange={this.handleChange}
              type="select"
              icon="bringer"
              descr="is this gig a bringer?"
              selectOptions={['Yes', 'No']}
            />

            <Input
              name="walkins"
              value={this.state.walkins}
              handleChange={this.handleChange}
              type="select"
              icon="walkins"
              descr="do they do walk-in spots?"
              selectOptions={['Yes', 'No']}
            />

            <Input
              name="nearestTubes"
              value={this.state.nearestTubes[0]}
              handleChange={this.handleNearestTubes}
              type="text"
              icon="tube"
              descr="What's the nearest Tube/Train station?"
            />

            <Fade left>

            <div className="inputContainer">

              <form onSubmit={this.handleAddNightToNightsArray}>

                <p className="inputTitle">Type night (eg 'Thu', 'Wed') press Enter</p>

                <div className="inputAndIconRow">
                  <input
                    className="input"
                    type="text"
                    name="night"
                    value={this.state.night}
                    onChange={(e) => this.setState({ night: e.target.value })}
                    placeholder="type night and press enter"
                  />
                  <Icon icon="calendar" />
                </div>

              </form>

              <div className="flex-row">
                {this.state.nights && this.state.nights.map((each, i) => <p onClick={() => this.handleRemoveNight(each)} className="white margin-right" key={i}>{each}</p>)}
              </div>

            </div>

            </Fade>

            <Input
              name="prebook"
              value={this.state.prebook}
              handleChange={this.handleChange}
              type="select"
              icon="book"
              descr="Can you pre-book?"
              selectOptions={['Yes', 'No']}
            />

            {(this.state.prebook === 'Yes' || this.state.prebook) && (
              <Input
                name="prebookSignUp"
                value={this.state.prebookSignUp}
                handleChange={this.handleChange}
                type="text"
                icon="book"
                descr="How do acts pre-book? eg Email / Facebook /Walk-ins Only?"
              />
            )}

            { this.state.prebook === 'Yes' || this.state.prebook && (
              <Input
                name="howToBook"
                value={this.state.howToBook}
                handleChange={this.handleChange}
                type="text"
                icon="book"
                descr="Link to your How To Book page"
              />
            )}

            <Input
              name="twitterHandle"
              value={this.state.twitterHandle}
              handleChange={this.handleChange}
              type="text"
              icon="twitter"
              descr="gig's Twitter username"
            />

            <Input
              name="facebook"
              value={this.state.facebook}
              handleChange={this.handleChange}
              type="text"
              icon="facebook"
              descr="gig's Facebook page/group"
            />

            <Input
              name="website"
              value={this.state.website}
              handleChange={this.handleChange}
              placeholder="website"
              type="text"
              icon="website"
              descr="gig's website"
            />

            <Input
              name="youtube"
              value={this.state.youtube}
              handleChange={this.handleChange}
              placeholder="youtube video"
              type="text"
              icon="youtube"
              descr="URL to a youtube video"
            />

            <Button
              text="Update"
              onClick={() => this.transformPostBody('update')}
              medium
              color="orange"
              />

          </div>

          </React.Fragment>
        )}

        { pageFour && (
          <React.Fragment>
          <div className="admin__canx-btn w-100 flex-start">
            <Button text="<= Cancel" onClick={this.handleCancel}/>
          </div>
          <div className="admin__edit__container flex-col flex-center">

            <DynamicImage
              small
              src={this.state.img}
            />

            <Input
              name="img"
              value={this.state.img}
              placeholder={this.state.img}
              handleChange={this.handleChange}
              type="text"
              icon="avatar"
              descr="link to profile picture"
            />

            <Input
              name="name"
              value={this.state.name}
              placeholder={this.state.name}
              handleChange={this.handleChange}
              type="text"
              icon="mic"
              descr="name of the gig"
            />

            <Input
              name="venue"
              value={this.state.venue}
              placeholder={this.state.venue}
              handleChange={this.handleChange}
              type="text"
              icon="beer"
              descr="venue of the gig"
            />

            <Fade left>
              <div className="inputContainer">

                  <p className="inputTitle">Blurb</p>

                  <div className="inputAndIconRow">

                    <textarea
                      className="input"
                      name="blurb"
                      onChange={(e) => this.setState({ blurb: e.target.value })}
                      >
                      {this.state.blurb}
                    </textarea>

                    <Icon icon="speechBubble" />

                  </div>

              </div>
            </Fade>

            <Input
              name="postcode"
              value={this.state.postcode || ''}
              placeholder={this.state.postcode || 'eg. NW1 8TQ'}
              handleChange={this.handleChange}
              type="text"
              icon="map"
              descr="postcode"
            />

            <Input
              name="bringer"
              value={this.state.bringer}
              handleChange={this.handleChange}
              type="select"
              icon="bringer"
              descr="is this gig a bringer?"
              selectOptions={['', 'Yes', 'No']}
            />

            <Input
              name="walkins"
              value={this.state.walkins}
              handleChange={this.handleChange}
              type="select"
              icon="walkins"
              descr="do they do walk-in spots?"
              selectOptions={['', 'Yes', 'No']}
            />

            <Input
              name="nearestTubes"
              value={this.state.nearestTubes[0]}
              handleChange={this.handleNearestTubes}
              type="text"
              icon="tube"
              descr="What's the nearest Tube/Train station?"
            />

            <Fade left>

            <div className="inputContainer">

              <form onSubmit={this.handleAddNightToNightsArray}>

                <p className="inputTitle">Type night (eg 'Thu', 'Wed') press Enter</p>

                <div className="inputAndIconRow">
                  <input
                    className="input"
                    type="text"
                    name="night"
                    value={this.state.night}
                    onChange={(e) => this.setState({ night: e.target.value })}
                    placeholder="type night and press enter"
                  />
                  <Icon icon="calendar" />
                </div>

              </form>

              <div className="flex-row">
                {this.state.nights && this.state.nights.map((each, i) => <p onClick={() => this.handleRemoveNight(each)} className="white margin-right" key={i}>{each}</p>)}
              </div>

            </div>

            </Fade>

            <Input
              name="prebook"
              value={this.state.prebook}
              handleChange={this.handleChange}
              type="select"
              icon="book"
              descr="Can you pre-book?"
              selectOptions={['', 'Yes', 'No']}
            />

            {(this.state.prebook === 'Yes' || this.state.prebook) && (
              <Input
                name="prebookSignUp"
                value={this.state.prebookSignUp}
                handleChange={this.handleChange}
                type="text"
                icon="book"
                descr="How do acts pre-book? eg Email / Facebook /Walk-ins Only?"
              />
            )}

            { this.state.prebook === 'Yes' || this.state.prebook && (
              <Input
                name="howToBook"
                value={this.state.howToBook}
                handleChange={this.handleChange}
                type="text"
                icon="book"
                descr="Link to your How To Book page"
              />
            )}

            <Input
              name="twitterHandle"
              value={this.state.twitterHandle}
              handleChange={this.handleChange}
              type="text"
              icon="twitter"
              descr="gig's Twitter username"
            />

            <Input
              name="facebook"
              value={this.state.facebook}
              handleChange={this.handleChange}
              type="text"
              icon="facebook"
              descr="gig's Facebook page/group"
            />

            <Input
              name="website"
              value={this.state.website}
              handleChange={this.handleChange}
              placeholder="website"
              type="text"
              icon="website"
              descr="gig's website"
            />

            <Input
              name="youtube"
              value={this.state.youtube}
              handleChange={this.handleChange}
              placeholder="youtube video"
              type="text"
              icon="youtube"
              descr="URL to a youtube video"
            />

            <Button
              text="Update"
              onClick={() => this.transformPostBody('new')}
              medium
              color="orange"
              />

          </div>

          </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  gigs: state.gigs.gigs,
})

const mapDispatchToProps = dispatch => ({
  updateStateRequestingGigs: () => dispatch(requestGigs()),
  updateStateReceivedGigs: (arr) => dispatch(receivedGigs(arr)),
});

const AdminForm = compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AdminFormBase);

export default withPage(AdminPage);

export {
  AdminForm,
};
