// Initialize Cloud Firestore through Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCqWOvIXqA5K6hGHh1WN3ShfcPkgz1nylk",
  authDomain: "find-my-landlord-mtl.firebaseapp.com",
  databaseURL: "https://find-my-landlord-mtl.firebaseio.com",
  projectId: "find-my-landlord-mtl",
  storageBucket: "find-my-landlord-mtl.appspot.com",
  messagingSenderId: "1044042294237",
  appId: "1:1044042294237:web:71d05a181a6e411cbf4c34",
  measurementId: "G-R1HRE7GT95"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().signInAnonymously().catch(function(error) {
	console.log(error.code);
	console.log(error.message);
});

var db = firebase.firestore();
var featuresRef = db.collection(databaseCollectionName);
