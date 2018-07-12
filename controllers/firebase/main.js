import firebase from 'firebase';
import {DBFIREBASE} from '../../configs/db';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import crypto  from 'crypto';



 
export const insertMessages = async (req, res, next) =>{  

  const db = firebase.database();


  //  const message =  req.body.message;
    const password = req.body.password;
    const datetime = moment().format('LLL'); 
    const email = req.body.email;
    const username = req.body.username;
    const hashedPassword = crypto.createHash('md5').update(password).digest("hex");

   
    
   try{
    db.ref().child('users').push({
          username: username,
          email: email,
          password: hashedPassword,
          datetime: datetime
        });
        res.status(200).json('Inserted');
      }  catch (error) {
        let obj = {};
        obj.date =  moment().format('LLL'); 
        obj.err = error.message;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../../logs/db.json'), content , 'utf-8'); 
          }

        

          /*
          / since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline
var myConnectionsRef = firebase.database().ref('users/joe/connections');

// stores the timestamp of my last disconnect (the last time I was seen online)
var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');

var connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', function(snap) {
  if (snap.val() === true) {
    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    var con = myConnectionsRef.push();

    // When I disconnect, remove this device
    con.onDisconnect().remove();

    // Add this device to my connections list
    // this value could contain info about the device or a timestamp too
    con.set(true);

    // When I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  }
});*/
};

export const loginFirebase = async (req, res, next) => {

  const db = firebase.database();
  

      const username = req.body.username;
      const password = req.body.password;
      const hashedPassword = crypto.createHash('md5').update(password).digest("hex");

    
      console.log(hashedPassword);
     
    //userRef.orderByChild('email').equalTo().once(‘value’).then(…)
    /*ref https://stackoverflow.com/questions/37910008/check-if-value-exists-in-firebase-db*/
    db.ref().child("users").orderByChild('username').equalTo(username).on("value", function(snapshot) {
  

      console.log(snapshot.val());
      /*snapshot.forEach(function(childSnapshot) {
        
      */
    
      /*get key users*/
      /*var key = Object.keys(snapshot.val())[0];*/


        const passwordFirebase = snapshot.val().password;


       

      if(passwordFirebase === hashedPassword && usernameFirebase === username ){

        const usernameFirebase = snapshot.val().username;   //(snapshot.val() && snapshot.val().username) || 'Anonymous';
        const emailFirebase = snapshot.val().email;
        const datetimeFirebase = snapshot.val().datetime;

          const obj = {
                username : usernameFirebase,
                email : emailFirebase,
                datetime : datetimeFirebase
              };


              res.status(200).json(obj);


      }else{
              res.status(200).json(" Password not seems valid");
      }


 /* }).catch((err)=>{
              console.log(err);
  });*/


});


    /*
    bcrypt.compare('somePassword', hash, function(err, res) {
  if(res) {
   // Passwords match
  } else {
   // Passwords don't match
  } 
});*/
};