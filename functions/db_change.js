/**
 * Created by Kyle on 2017-11-14.
 */
var admin = require("firebase-admin");

var serviceAccount = require("./remote-health-monitoring-firebase-adminsdk-55c4n-6f0228f97f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://remote-health-monitoring.firebaseio.com"
});

//var ref=admin.database().ref();
// var heartRate=[];
var messagesRef = admin.database().ref('users/');
// const promise=record.once('value',function (snap) {
//     //console.log(snap.val())
//     snap.forEach(function (childSnap) {
//         childSnap.forEach(function (child_child_Snap) {
//             var child = child_child_Snap.val();
//             //console.log(child)
//             heartRate.push((child))
//         });
//     });
//     console.log(heartRate[0])
// });

var physician_selected = 'nNYsnfzKsUO0io8e52jjbURcLh12'
var patient_selected = 'N0Mm1aOUltOhKjow3orLjdrus663'
messagesRef.orderByChild("email").equalTo("ss@ss.com").on("child_added",function (snap) {
    console.log(snap.key);
    var updates={
        name:"sss",
        subject:"567"
    }

    messagesRef.child(snap.key).update(updates).then(e=>{
        messagesRef.child(snap.key).once('value',e1=> {
        console.log(e1.val().name + "this is key")
    console.log(snap.val().name)
})
    })


})








// messagesRef.orderByChild("name").equalTo("f2").on("child_added",function (higherSnap) {
//
//     messagesRef.orderByChild("name").equalTo("ali").on("child_added",function (snap) {
//        console.log(snap.val())
//         var postData = snap.val()
//         var updates = {};
//         updates['/patientlist/' + postData.userId] = postData;
//         messagesRef.child(higherSnap.key).update(updates);
//
//     });
//
// });
// messagesRef.orderByChild("name").equalTo("ali").on("child_added",function (higherSnap) {
//
//     messagesRef.orderByChild("name").equalTo("f2").on("child_added",function (snap) {
//         console.log(snap.val())
//         var postData = snap.val()
//         var updates = {};
//         updates['/familylist/' + postData.userId] = postData;
//         messagesRef.child(higherSnap.key).update(updates);
//
//     });
//
// });
// messagesRef.once('value')
//     .then(snap=>{
//     return snap.forEach(function (childSnap) {
//         console.log(childSnap.child("userType").val());
//             var userType=childSnap.child("userType").val();
//             var child=childSnap.val();
//             if(userType=="PATIENT")
//                 patient.push(child.name);
//             else if(userType=="FAMILY")
//                 family.push(child.name);
//     })
// }).then(snap=>{
//     console.log(patient);
//          console.log(family);
// })
//  messagesRef.orderByChild("email").equalTo('s@s.com').on("child_added",function (snap) {
// }).then(snap=>{
//     console.log(snap.key)
//  })
// messagesRef.orderByChild("email").equalTo('s@s.com').on("child_added",function (snap) {
//     console.log(snap.key);
//
//     name = snap.child('name').val();
//     console.log(name);
//     var patient=[];
//     var family=[];
//     messagesRef.once('value')
//     .then(function (snap) {
//         snap.forEach(function (childSnap) {
//             console.log(childSnap.child("userType").val());
//             var userType=childSnap.child("userType").val();
//             var child=childSnap.val();
//             if(userType=="PATIENT")
//                 patient.push(child.name);
//             else if(userType=="FAMILY")
//                 family.push(child.name);
//
//         });
//         console.log(patient);
//         console.log(family);
//         res.render('admin.ejs', {
//             email: name,
//             patient:patient,
//             family:family
//         });
//     });
//
// });


//
// var postData=
//     {
//     age: "40",
//     email: "t@t.com",
//     emergName: "",
//     emergNum: "",
//     familyId: "",
//     locationAddress: "",
//     name: "shuai",
//     patientId: "",
//     physicianId: "",
//     admin:"false",
//     userId: "",
//     userType: "PATIENT",
// };
// var newPostKey = messagesRef.push().key;
// var updates = {};
// postData.userId=newPostKey;
// updates[newPostKey] = postData;
// messagesRef.update(updates);
//messagesRef.push()
// messagesRef.push({
//     age: "50",
//     email: "d@d.com",
//     emergName: "",
//     emergNum: "",
//     familyId: "",
//     locationAddress: "",
//     name: "shuai1",
//     patientId: "",
//     physicianId: "",
//     admin:"false",
//     userId: "",
//     userType: "PATIENT",
// });
// messagesRef.orderByChild("email").equalTo('s@s.com').on("child_added",function (snap) {
//     console.log(snap.key);
//
//     var name=snap.child('name').val();
// });

// var postData = {
//     author: "k",
//     uid: 1,
//     body: "ss",
//     title: "kl",
//     starCount: 0,
//     authorPic: "s"
// };
// var newPostKey = messagesRef.push().key;
// var updates = {};
// updates['/posts/' + newPostKey] = postData;
// updates['/user-posts/' + 1 + '/' + newPostKey] = postData;
// messagesRef.update(updates);


// messagesRef.once('value')
//     .then(function (snap) {
//         snap.forEach(function (childSnap) {
//             console.log(childSnap.ref,childSnap.val())
//         });
//        // console.log('snap.val',snap.val());
//     });
// messagesRef.push({
//     age: "20",
//     email: "s@s.com",
//     emergName: "",
//     emergNum: "",
//     familyId: "",
//     locationAddress: "",
//     name: "shuai",
//     patientId: "",
//     physicianId: "",
//     admin:"false",
//     userId: "",
//     userType: "physician",
// });