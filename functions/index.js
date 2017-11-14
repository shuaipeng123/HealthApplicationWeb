const functions = require('firebase-functions');
const express=require('express');
const engines=require('consolidate');

const app=express();
app.engine('ejs',engines.ejs);
app.set('views','./views');
app.set('view engine','ejs');
app.get('/timestamp',(request,response)=>{
 response.render('login.ejs');
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
