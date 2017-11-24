const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate');
var admin = require("firebase-admin");

var serviceAccount = require("./remote-health-monitoring-firebase-adminsdk-55c4n-6f0228f97f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://remote-health-monitoring.firebaseio.com"
});

var ref = admin.database().ref();
var messagesRef = ref.child('users');




const app = express();
app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');


app.post('/index', function (req, res, next) {
    console.log(req.body.username);
    console.log(req.body.subject);
    console.log(req.body.txtEmail + "this is txtEmail");

    if (req.body.username === undefined) {
        var name;
        messagesRef.orderByChild("email").equalTo(req.body.txtEmail).on("child_added",function (snap) {
            console.log(snap.key);

            name = snap.child('name').val();
            console.log(name);
            var patient = [];
            var family = [];
            messagesRef.once('value')
                .then(function (snap) {
                    snap.forEach(function (childSnap) {
                        console.log(childSnap.child("userType").val());
                        var userType = childSnap.child("userType").val();
                        var child = childSnap.val();
                        if (userType == "PATIENT")
                            patient.push(child.name);
                        else if (userType == "FAMILY")
                            family.push(child.name);

                    });
                    console.log(patient);
                    console.log(family);
                    res.render('dropdown.ejs', {
                        email: name,
                        patient: patient,
                        family: family
                    });
                });
        });


    } else {
        var postData ={
            age: req.body.age,
                email: req.body.email,
            emergName: "",
            emergNum: "",
            familyId: "",
            locationAddress: "",
            name: req.body.username,
            patientId: "",
            physicianId: "",
            admin:"false",
            userId: "",
            userType: "physician",
        };
        var newPostKey = messagesRef.push().key;
        var updates = {};
        postData.userId=newPostKey;
        updates[newPostKey] = postData;
        messagesRef.update(updates)

        res.render('dropdown.ejs', {
            email: req.body.username

        });
    }
});

app.post('/pair', function (req, res, next) {
    var family_selected=req.body.family
    var patient_selected=req.body.patient
    var name=req.body.email
    console.log("I am in pair",name)


        var patient = [];
        var family = [];
        messagesRef.once('value')
            .then(function (snap) {
                snap.forEach(function (childSnap) {
                    console.log(childSnap.child("userType").val());
                    var userType = childSnap.child("userType").val();
                    var child = childSnap.val();
                    if (userType == "PATIENT")
                        patient.push(child.name);
                    else if (userType == "FAMILY")
                        family.push(child.name);

                });
                console.log(patient);
                console.log(family);
                res.render('dropdown.ejs', {
                    email: name,
                    patient: patient,
                    family: family
                });
            });



});

app.get('/query2', function (req, res, next) {
    res.render('query2Chart.ejs');
});
app.get('/patient', function (req, res, next) {
    res.render('patient.ejs');
});
app.get('/', function (req, res, next) {
    res.render('login.ejs');
});
app.get('/test', function (req, res, next) {
    res.send('respond with a resource');
});

app.get('/dropdown', function (req, res, next) {
    res.render('dropdown.ejs');
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
