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
            var name=snap.val().name
            var userType = snap.child('userType').val();
            console.log(userType);
            if(userType=="ADMIN"){
                var patient = [];
                var family = [];
                var patient_id=[];
                var family_id=[];
                messagesRef.once('value')
                    .then(function (snap) {
                        snap.forEach(function (childSnap) {
                            console.log(childSnap.child("userType").val());
                            var userType = childSnap.child("userType").val();
                            var child = childSnap.val();
                            if (userType == "PATIENT")
                            {
                                patient.push(child.name);
                                patient_id.push(child.userId);
                            }
                            else if (userType == "FAMILY")
                            {
                                family_id.push(child.userId);
                                family.push(child.name);
                            }

                        });
                        console.log(patient);
                        console.log(family);
                        console.log(snap.val().name+"this is name")
                        res.render('admin.ejs', {
                            name: name,
                            patient: patient,
                            family: family,
                            patient_id:patient_id,
                            family_id:family_id
                        });
                    });
            }
            else{
                messagesRef.child(`/${snap.key}/patients`).once('value').then(e1 => {
                    var index=0;
                    var patients=[]
                e1.forEach(function (childSnap) {

                    patients.push(childSnap.val())

                })
                var physicianRef=snap.val()
                console.log(physicianRef.name+"this is physicianRef")
                //console.log(patients[0].name+"this is Ref")
                res.render('physician.ejs', {
                    name: physicianRef.name,
                    key: snap.key,
                    physician: snap.val(),
                    patients: patients,
                    family: "",
                    patient_id: "",
                    family_id: ""
                })

            })
            }

        });


    } else {
        messagesRef.orderByChild("email").equalTo(req.body.email).on("child_added",function (snap) {
            console.log(snap.key);

            var updates={
                name:req.body.username,
                subject:req.body.subject
            }

            messagesRef.child(snap.key).update(updates).then(e=>{
                console.log(snap.key+"this is key")
            messagesRef.child(snap.key).once('value',e1=>{
                console.log(e1.val().name+"this is key")
            res.render('physician.ejs', {
                name: req.body.username,
                key: snap.key,
                physician: e1.val(),
                patients: "",
                family: ""



            })
            })

            })

            //snap.child('name').set(req.body.username);

        })

    }
});

app.post('/pair', function (req, res, next) {
    var family_selected=req.body.family
    var patient_selected=req.body.patient

    console.log("I am in family",family_selected)
    console.log("I am in patient",patient_selected)

    messagesRef.child(`/${family_selected}`).once('value').then(e1 => {
        messagesRef.child(`/${patient_selected}`).once('value').then(e2 => {
        console.log(e2.val())
        var postData = e2.val()
        var updates = {};
        updates['/patientlist/' + postData.userId] = postData;
        messagesRef.child(e1.key).update(updates);
        messagesRef.child(`/${patient_selected}`).once('value').then(e3 => {
            messagesRef.child(`/${family_selected}`).once('value').then(e4 => {
            console.log(e4.val())
            var postData = e4.val()
            var updates = {};
            updates['/familylist/' + postData.userId] = postData;
            messagesRef.child(e3.key).update(updates);
            var patient = [];
            var family = [];
            var patient_id=[];
            var family_id=[];
            messagesRef.once('value')
            .then(function (snap) {
                snap.forEach(function (childSnap) {
                    console.log(childSnap.child("userType").val());
                    var userType = childSnap.child("userType").val();
                    var child = childSnap.val();
                    if (userType == "PATIENT")
                    {
                        patient.push(child.name);
                        patient_id.push(child.userId);
                     }
                    else if (userType == "FAMILY")
                    {
                        family_id.push(child.userId);
                        family.push(child.name);
                    }

                });
                console.log(patient);
                console.log(family+"I am in pair");
                res.render('admin.ejs', {
                    email: "ADMIN",
                    patient: patient,
                    family: family,
                    patient_id:patient_id,
                    family_id:family_id
                });
                });
            })
        })
    })
}).catch (reason=>{
    console.log(reason)
    })






});

app.get('/query2', function (req, res, next) {
    res.render('physician.ejs');
});
app.get('/patient/:id', function (req, res, next) {
    console.log(req.params.id)

    messagesRef.child(`/${req.params.id}`).once('value').then(e1 => {
        var v=e1.val()

        res.render('patient.ejs',{
            user:v
    });
});

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
