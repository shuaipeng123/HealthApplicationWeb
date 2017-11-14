/**
 * Created by Kyle on 2017-11-14.
 */
(function () {
    var config = {
        apiKey: "AIzaSyCF2s8kKdH6eG20bWfT15wGoOJEWLQoCHo",
        authDomain: "remote-health-monitoring.firebaseapp.com",
        databaseURL: "https://remote-health-monitoring.firebaseio.com",
        storageBucket: "remote-health-monitoring.appspot.com",
    };
    firebase.initializeApp(config);
    const txtEmail=document.getElementById('txtEmail');
    const txtPassword=document.getElementById('txtPassword');
    const btnLogin=document.getElementById('btnLogin');
    const btnSignup=document.getElementById('btnSignUp');
    const btnLogout=document.getElementById('btnLogout');
    btnLogin.addEventListener('click',e=>{
        const email=txtEmail.value;
        console.log(email);
        const pass=txtPassword.value;
        const auth=firebase.auth();
        const promise=auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e=>console.log(e.message));

    });
    btnSignup.addEventListener('click',e=>{
        const email=txtEmail.value;
    //console.log(email);
    const pass=txtPassword.value;
    const auth=firebase.auth();
    const promise=auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e=>console.log(e.message));

});
}());