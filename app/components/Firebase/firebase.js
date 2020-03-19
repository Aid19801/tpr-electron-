import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
// import 'firebase/analytics';

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
    this.fieldValue = app.firestore.FieldValue;
    this.auth = app.auth();
    this.db = app.database();
    this.dbTwo = app.firestore();
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

  // Firebase *Realtime* db
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref(`users`);

  discussions = () => this.dbTwo.collection("discussions")
    .get()
    .then(querySnapshot => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        let eachDiscussion = {
          ...doc.data(),
          id: docId,
        }
        arr.push(eachDiscussion);
      })
      return arr;
    })
    .catch(error => {
      console.log("Error getting discussions: ", error);
    })

  discussion = (id) => this.dbTwo.collection("discussions")
    .get()
    .then((querySnapshot) => {
      const arr = querySnapshot.docs.filter(each => each.id === id)[0]
      const obj = arr.data();
      return obj;
    })
    .catch((error) => {
      console.log("Error getting gig ID: ", error);
    });

    addDiscussion = (obj) => {
      this.dbTwo.collection('discussions')
        .add(obj)
        .then((res) => {

          console.log(`Document added successfully | ref: ${res.id}`);

          const ref = this.dbTwo.collection('discussions')
            .doc(res.id);

          ref.update({
            ...obj,
            id: res.id,
          })
          .then((res) => {
            console.log("Document successfully updated | ", res);
          })
          .catch((error) => {
            console.error("Error updating ID in document: ", error);
          })

        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        })
    }

    patchDiscussion = (id, obj) => {
      // const { territory } = obj;
      // debugger;
      const ref = this.dbTwo.collection("discussions")
        .doc(id);
        ref.update({
          ...obj,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        })
    }

  // firestore db
  gigs = () => this.dbTwo.collection("gigs")
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        let eachGig = {
          ...doc.data(),
          id: docId,
        }
        arr.push(eachGig);
      });

      return arr;
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });

  gig = (id) => this.dbTwo.collection("gigs")
    .get()
    .then((querySnapshot) => {
      console.log('AT | trying to find :', id);
      const arr = querySnapshot.docs.filter(each => each.id === id)[0]
      const obj = arr.data();
      return obj;
    })
    .catch((error) => {
      console.log("Error getting gig ID: ", error);
    });

  differentCityGigs = (str) => this.dbTwo.collection(str)
    .get()
    .then((querySnapshot) => {
      let arr = [];
      querySnapshot.forEach((doc) => {
        const docId = doc.id;
        let eachGig = {
          ...doc.data(),
          id: docId,
        }
        arr.push(eachGig);
      });
      return arr;
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });


  editGig = (id, key, value, city) => {
    // debugger;
    let str = city === 'london' ? 'gigs' : city;
    const ref = this.dbTwo.collection(str)
      .doc(id);
    ref.update({
      [key]: value,
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch(error => {
        console.error("Error updating document: ", error);
      });
  }

  patchGig = (id, obj) => {
    const { territory } = obj;
    // debugger;
    const ref = this.dbTwo.collection(territory)
      .doc(id);
      ref.update({
        ...obj,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
  }

  addGig = (obj) => {
    this.dbTwo.collection('gigs')
      .add(obj)
      .then((res) => {

        console.log(`Document ${obj.name} added successfully | ref: ${res.id}`);

        const ref = this.dbTwo.collection('gigs')
          .doc(res.id);

        ref.update({
          ...obj,
          id: res.id,
        })
        .then((res) => {
          console.log("Document successfully updated | ", res);
        })
        .catch((error) => {
          console.error("Error updating ID in document: ", error);
        })

      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
  }

   // firestore db
   replaceGigs = (json) => this.dbTwo.collection("gigs")
   .get()
   .then((querySnapshot) => {
     let arr = [];
     querySnapshot.forEach((doc) => {
       let eachGig = doc.data();
       arr.push(eachGig);
     });
     return arr;
   })
   .catch(function (error) {
     console.log("Error getting documents: ", error);
   });
}

export default Firebase;
