import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router/web';
import bodyParser from 'body-parser';
import SocketIO  from 'socket.io';
const port = process.env.PORT || 4000;
import http from 'http';
import connection from './configs/db';



// Initialize http server

connection();




const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index route
app.get('/',  (req, res, next) => {
});

app.use('/api', router);

/*
app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
})*/

app.listen(port, ()  =>{
  console.log('OlympusJS its alive! ' + port)
});

