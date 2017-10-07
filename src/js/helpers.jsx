import * as  firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyD4fy9y5ukKnKgs_TjwXSI331v7o8D7jp8",
    authDomain: "testfire-9a50c.firebaseapp.com",
    databaseURL: "https://testfire-9a50c.firebaseio.com",
    projectId: "testfire-9a50c",
    storageBucket: "testfire-9a50c.appspot.com",
    messagingSenderId: "172778261539"
  };
  firebase.initializeApp(config);
export const fire = firebase.storage();


export const ref = firebase.database().ref()
const firebaseAuth = firebase.auth

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function verify(){
    firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
        return true
		  } else {
		    // No user is signed in.
		    return false
		  }
		});
  
}
		