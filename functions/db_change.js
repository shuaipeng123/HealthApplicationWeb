/**
 * Created by Kyle on 2017-11-14.
 */
var admin = require("firebase-admin");

var serviceAccount = require("./remote-health-monitoring-firebase-adminsdk-55c4n-6f0228f97f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://remote-health-monitoring.firebaseio.com"
});

var ref=admin.database().ref();
var messagesRef=ref.child('messages');
messagesRef.push({
    name:'Chris',
    admin:'true',
    count:1,
    text:'Hey guys'
});