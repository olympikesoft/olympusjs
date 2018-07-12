import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import firebase from 'firebase';
import moment from 'moment';
import mysql from 'mysql';

export default function connection( ) {
    let inputs = {};
    let obj = {}
   // let array = []; or let obj = { array: []};

    try{
    
        let array = fs.readFileSync(path.resolve(__dirname, '../configs.json'), "utf8"); 
        let ob = JSON.parse(array);

        


  
  if(ob.mlab.hasOwnProperty("username")
         && 
         ob.mlab['username'].length > 0
         &&
         ob.mlab.hasOwnProperty("password")
         &&
         ob.mlab['password'].length > 0
         && 
         ob.mlab.hasOwnProperty("code") 
         &&
         ob.mlab['code'].length > 0
         &&
         ob.mlab.hasOwnProperty("subcode")
         &&
         ob.mlab['subcode'].length > 0
         && 
         ob.mlab.hasOwnProperty("db_name")
         &&
         ob.mlab['db_name'].length > 0)
        {
            inputs.name =  ob.mlab.username,
            inputs.password =  ob.mlab.password,
            inputs.code =  ob.mlab.code,
            inputs.subcode =  ob.mlab.subcode,
            inputs.db_name =  ob.mlab.db_name

            Object.assign(obj, inputs);

           
            let user = obj.name;
            let password = obj.password;
            let code = obj.code;
            let db_name = obj.db_name;
            let subcode = obj.subcode;

            const mongoURL = `mongodb://${user}:${password}@${code}.mlab.com:${subcode}/${db_name}`;

            connectMongo(mongoURL);
             
     
        
       /* }else{
            
            fs.writeFileSync(path.resolve(__dirname, '../logs/logs.json'), ob);
        }   */
    } else if(ob.hasOwnProperty("firebase") &&
/* obj[key] !== null && obj[key] != ""*/
        ob.firebase.hasOwnProperty("apiKey")
        && 
        ob.firebase['apiKey'].length > 0
        &&
        ob.firebase.hasOwnProperty("authDomain")
        &&
        ob.firebase['authDomain'].length > 0
        && 
        ob.firebase.hasOwnProperty("databaseURL") 
        &&
        ob.firebase['databaseURL'].length > 0
        &&
        ob.firebase.hasOwnProperty("storageBucket")
        &&
        ob.firebase['storageBucket'].length > 0
        && 
        ob.firebase.hasOwnProperty("projectId")
        &&
        ob.firebase['projectId'].length > 0)
       {

       
        inputs.apiKey = ob.firebase.apiKey;
        inputs.authDomain = ob.firebase.authDomain;
        inputs.databaseURL = ob.firebase.databaseURL;
        inputs.storageBucket = ob.firebase.storageBucket;

        Object.assign(obj, inputs);
        connectFirebase(obj);
    

       } else  if(ob.hasOwnProperty("mysql") &&
     /* obj[key] !== null && obj[key] != ""*/
             ob.mysql.hasOwnProperty("host")
             && 
             ob.mysql['host'].length > 0
             &&
             ob.mysql.hasOwnProperty("user")
             &&
             ob.mysql['user'].length > 0
             && 
             ob.mysql.hasOwnProperty("password") 
             &&
             ob.mysql['password'].length > 0
             &&
             ob.mysql.hasOwnProperty("database")
             &&
             ob.mysql['database'].length > 0)
            {
     
            
             inputs.host = ob.mysql.host;
             inputs.user = ob.mysql.user;
             inputs.password = ob.mysql.password;
             inputs.database = ob.mysql.database;
     
             Object.assign(obj, inputs);
             connectMysql(obj);

            }

        else{
     
        let errorOb = {};
        let error = "No db connected";  
        errorOb.date =  moment().format('LLL'); 
        errorOb.err = error;
        const content = JSON.stringify(errorOb);

        fs.writeFileSync(path.resolve(__dirname, '../logs/logs.json'),  content , 'utf-8');

        
    }

    }catch(e) { 
        let errorOb = {};
        errorOb.date =  moment().format('LLL'); 
        errorOb.err = e.stack;

        const content = JSON.stringify(errorOb);
        
        fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
    }
};


function connectMysql(obj){
    let errorOb = {};
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'database name'
    });
    connection.connect((err) => {
      if (err) {
       
        errorOb.date =  moment().format('LLL'); 
        errorOb.err = err.stack;

        const content = JSON.stringify(errorOb);
        
        fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
      }else{
      console.log('Connected!');
      if(err)
      {
        let obj = {};  
        obj.date =  moment().format('LLL'); 
        obj.err = err;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
      }else{
        if (!fs.existsSync(path.resolve(__dirname, '../controllers/mysql'))){
      fs.mkdir(path.resolve(__dirname, '../controllers/mysql'), function(err) {
        if (err) {
          let obj = {};;  
          obj.date =  moment().format('LLL'); 
          obj.err = err;
  
          const content = JSON.stringify(obj);
  
        fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
        }
      });
    }     
    if (!fs.existsSync(path.resolve(__dirname, '../models/mysql'))){
      fs.mkdir(path.resolve(__dirname, '../models/mysql'), function(err) {
        let obj = {};
        obj.date =  moment().format('LLL'); 
        obj.err = err;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
    });
      }
}

      }
    });
}
       


function connectMongo(mongoURL) {
    mongoose.Promise = global.Promise;
    
    mongoose.connect(mongoURL, (err) => {
      if(err)
      {
        let obj = {};
        obj.date =  moment().format('LLL'); 
        obj.err = err;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
      }else{
        if (!fs.existsSync(path.resolve(__dirname, '../controllers/mongo'))){
      fs.mkdir(path.resolve(__dirname, '../controllers/mongo'), function(err) {
        if (err) {
          let obj = {};
          obj.date =  moment().format('LLL'); 
          obj.err = err;
  
          const content = JSON.stringify(obj);
  
        fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
        }
      });
    }     
    if (!fs.existsSync(path.resolve(__dirname, '../models/mongo'))){
      fs.mkdir(path.resolve(__dirname, '../models/mongo'), function(err) {
        let obj = {};;  
        obj.date =  moment().format('LLL'); 
        obj.err = err;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
    });
      }
}
});
}

function connectFirebase(obj){

    let apiKey = obj.apiKey;
    let authDomain = obj.authDomain;
    let databaseURL = obj.databaseURL;
    let storageBucket = obj.storageBucket;

  const config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    storageBucket: storageBucket
  };
  const DBFIREBASE = firebase.initializeApp(config);

  // Get a reference to the database service
  const database = firebase.database();


  const connectedRef = database.ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
        if (!fs.existsSync(path.resolve(__dirname, '../controllers/firebase'))){
      fs.mkdir(path.resolve(__dirname, '../controllers/firebase'), function(err) {
        if (err) {
          let obj = {};
          obj.date =  moment().format('LLL'); 
          obj.err = err;
  
          const content = JSON.stringify(obj);
  
        fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
        }
      });
    }     
    if (!fs.existsSync(path.resolve(__dirname, '../models/firebase'))){
      fs.mkdir(path.resolve(__dirname, '../models/firebase'), function(err) {
        let obj = {};
        obj.date =  moment().format('LLL'); 
        obj.err = err;

        const content = JSON.stringify(obj);

      fs.writeFileSync(path.resolve(__dirname, '../logs/db.json'), content , 'utf-8'); 
    });
      }
      console.log("Connected");
    } else {
      console.log("Not connected!");
    }
  });

}