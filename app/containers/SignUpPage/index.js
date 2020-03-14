import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { compose } from 'redux';
import { withFirebase } from '../../components/Firebase';
import { Input, FunkyTitle, Button, withPage, Modal, Icon } from '../../components';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <FunkyTitle text="Sign Up" />
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
        stage: 0,
        submitting: false,
        error: null,

        // // stage 0
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',

        // stage 1
        profilePicture: 'https://i.ytimg.com/vi/kQBHzHBMlM4/hqdefault.jpg',
        tagline: '',
        genre: '',
        faveGig: '',

        // stage 2
        includeInActRater: true,
        youtube: '',
        youtubeChannelURL: '',

        // stage 3
        facebook: '',
        twitter: '@',
        website: '',

        rating: 0
      }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      profilePicture,
      tagline,
      genre,
      faveGig,
      includeInActRater,
      facebook,
      twitter,
      website,
      youtube,
      youtubeChannelURL,
    } = this.state;

    // create user auth entry
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(res => {
        // console.log('User Created! This user unique-id is: ', res.user.uid);
        // updateStateAuthenticatedUID(res.user.uid); // contains email & uid
        // cache.saveToCache('uid', res.user.uid); // just uid

        // create DB entry for user info
        this.props.firebase.user(res.user.uid).set({
          username,
          email,
          tagline,
          profilePicture,
          includeInActRater,
          rating: 0,

          faveGig,
          genre,
          facebook,
          twitter,
          website,
          youtube,
          youtubeChannelURL,
        });

        // console.log('created user in DB with ', this.state);
        this.props.history.push('/home');
      })
      .catch(error => {
        // console.log('firebase error: ', error);
        return this.setState({ error });
      });
      event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  moveForward = () => {
    const currentStage = this.state.stage;
    // if (currentStage <= 3) {
      this.setState({
        stage: currentStage + 1
      });
    // }
  };

  moveBackward = () => {
    const current = this.state.stage;
    const prevStage = current - 1;
    return this.setState({ stage: prevStage });
  }

  handleIncludeInActsSection = (bool) => {
    return this.setState({ includeInActRater: bool })
  }

  killErrorAndModal = () => {
    return this.setState({ error: null, stage: 0 });
  }
  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      stage,
      profilePicture,
      tagline,
      genre,
      faveGig,
      includeInActRater,
      facebook,
      twitter,
      website,
      youtube,
      youtubeChannelURL,
    } = this.state;


    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      // console.log('this state ', this.state);
      // console.log('this props ', this.props);

 return (
   <React.Fragment>
   { stage > 0 && (
      <div style={{ position: "absolute", top: 75, left: 15 }}>
        <Button small text="Back" onClick={this.moveBackward} disabled={false} color="darkgrey" />
      </div>
   )}
      <form onSubmit={this.onSubmit} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      { stage === 0 && (
        <React.Fragment>
          <Input
            name="username"
            value={username}
            handleChange={this.onChange}
            type="text"
            placeholder="Act Name"
            descr="Your Act Name"
          />
          <Input
            name="email"
            value={email}
            handleChange={this.onChange}
            type="text"
            placeholder="john@john.com"
            descr="email"
          />
          <Input
            name="passwordOne"
            value={passwordOne}
            handleChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Input
            name="passwordTwo"
            value={passwordTwo}
            handleChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Button text="next" disabled={isInvalid} type="text" onClick={this.moveForward} />
          {error && <p>{error.message}</p>}
        </React.Fragment>
      )}

      { stage === 1 && (
        <React.Fragment>
          <Input
            name="profilePicture"
            value={profilePicture}
            handleChange={this.onChange}
            type="text"
            placeholder="http://my-pic.jpg"
            descr="link to profile pic img"
            icon="avatar"
          />
          <Input
            name="tagline"
            value={tagline}
            handleChange={this.onChange}
            type="text"
            placeholder="Always funny, never fun!"
            descr="Your Tag Line"
            icon="speechBubble"
          />
          <Input
            name="genre"
            value={genre}
            handleChange={this.onChange}
            type="select"
            placeholder="style"
            descr="style"
            selectOptions={[
              'N/A',
              'Observational',
              'Abstract',
              'Adult',
              'Burlesque',
              'Character',
              'Just a fan',
              'MC',
              'Musical Comedy',
              'One Liner',
              'Political',
              'Promoter',
              'Pun Merchant',
              'Storytelling',
            ]}
          />
          <Input
            name="faveGig"
            value={faveGig}
            handleChange={this.onChange}
            type="text"
            placeholder="eg King Gong"
            descr="Favourite Open Mic"
            icon="mic"
          />
          <Button text="next" disabled={profilePicture === '' || faveGig === ''} type="text" onClick={this.moveForward} />
          {error && <p>{error.message}</p>}
        </React.Fragment>
      )}
      { stage === 2 && (
        <React.Fragment>

        <Fade left>
        <div style={{ border: 0, borderRadius: 12,  padding: 10, background: 'orange', width: '65%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <p style={{ color: 'white', fontFamily: 'monospace', textAlign: 'end', margin: 2, fontSize: 20, }}>Include me in acts section? </p>

          <div style={{ display: 'flex', flexDirection: 'row' }}>


          <div style={{ borderRadius: 12,  padding: 10, background: 'grey', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', margin: 10 }}>
            <div
              style={{
                backgroundColor: includeInActRater ? 'green' : 'grey',
                border: '5px solid black',
                borderRadius: 12,
                width: 100,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontFamily: 'Arial'
              }}
              onClick={() => this.handleIncludeInActsSection(true)}
              >
              Yes
            </div>
            <div
              style={{
                backgroundColor: includeInActRater ? 'grey' : 'red',
                border: '5px solid black',
                borderRadius: 12,
                width: 100,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontFamily: 'Arial'
              }}
              onClick={() => this.handleIncludeInActsSection(false)}>No</div>
          </div>

          <Icon icon="list" />
          </div>

        </div>
      </Fade>
          <Input
            name="facebook"
            value={facebook}
            handleChange={this.onChange}
            type="text"
            placeholder="facebook.com/johnsmith"
            descr="Link to your facebook"
            icon="facebook"
          />
          <Input
            name="twitter"
            value={twitter}
            handleChange={this.onChange}
            type="text"
            placeholder="twitter.com/johnsmith"
            descr="your twitter name"
            icon="twitter"
          />
          <Input
            name="youtube"
            value={youtube}
            handleChange={this.onChange}
            type="text"
            placeholder="youtube video"
            descr="YouTube Video"
            icon="youtube"
          />
          <Input
            name="youtubeChannelURL"
            value={youtubeChannelURL}
            handleChange={this.onChange}
            type="text"
            placeholder="youtube channel"
            descr="YouTube Channel URL"
            icon="youtube"
          />
          <Input
            name="website"
            value={website}
            handleChange={this.onChange}
            type="text"
            placeholder="www.myPage.com"
            descr="Your own website"
            icon="website"
          />
          <Button text="Submit" type="submit" disabled={error !== null} />
        </React.Fragment>
      )}

      </form>


      { error && <Modal heading="Oh No!" body={error.message} killModal={this.killErrorAndModal} /> }

      </React.Fragment>
    );
  }
}


const SignUpForm = compose(
  withFirebase,
  withRouter,
)(SignUpFormBase);

function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

export default withPage(SignUpPage);

export {
  SignUpForm,
  SignUpLink
};
