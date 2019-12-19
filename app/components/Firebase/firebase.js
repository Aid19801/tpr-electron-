import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID
};

class Firebase {
  constructor() {
    !app.apps.length ? app.initializeApp(config) : app.app();

    // app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // Firebase *Authentication*

  // create user
  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  // sign-in user
  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };
  // sign-out user
  doSignOut = () => this.auth.signOut();

  // pw re-set
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  // pw update
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // get me
  meQuery = () => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        return user;
      } else {
        return console.log('no one signed in');
      }
    });
  };

  // Firebase *Database*
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref(`users`);
}

export default Firebase;
