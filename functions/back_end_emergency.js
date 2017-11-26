/* Created by Kyle on 2017-11-14.
*/
var admin = require("firebase-admin");

var serviceAccount = require("./remote-health-monitoring-firebase-adminsdk-55c4n-6f0228f97f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://remote-health-monitoring.firebaseio.com"
});

//var ref=admin.database().ref();
// var heartRate=[];


var postData = {
    emergency: "true",
    userid:789,

};

// Get a key for a new Post.
var newPostKey = admin.database().ref().child('emergency').push().key;

// Write the new post's data simultaneously in the posts list and the user's post list.
var updates = {};
updates['/emergency/'+newPostKey] = postData;


admin.database().ref().update(updates);
var removeKey=admin.database().ref().child('emergency/'+newPostKey)
removeKey.remove()