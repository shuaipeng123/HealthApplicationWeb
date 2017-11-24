var config = {
    apiKey: "AIzaSyCF2s8kKdH6eG20bWfT15wGoOJEWLQoCHo",
    authDomain: "remote-health-monitoring.firebaseapp.com",
    databaseURL: "https://remote-health-monitoring.firebaseio.com",
    storageBucket: "remote-health-monitoring.appspot.com",
};
firebase.initializeApp(config);
var postData = {
    emergency: "true",
    userid:123,

};

// Get a key for a new Post.
var newPostKey = firebase.database().ref().child('emergency').push().key;

// Write the new post's data simultaneously in the posts list and the user's post list.
var updates = {};
updates['/emergency/'+newPostKey] = postData;


firebase.database().ref().update(updates);
