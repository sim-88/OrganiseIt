
require('dotenv').config();
require('module-alias/register');//Needed for @ in path

//Init Startup Debuger
const debugStartUp = require('debug')('app:startup');

//Init Express App
const express = require('express');
const app = express();

//Init Startup Error Logger
require('@startup/errorLog.start')(process);

//Init all Databases Here




//Simulate an Uncaught Error code
//throw new Error('Thrown Error');

//Simulate an Unhandled Error code
// const p = Promise.reject(new Error('Thrown Rejected Promise Error'));
// p.then(()=> console.log('done'));





//All Routes //./app/routes/
require('@routes/admin.routes')(app);
require('@routes/api.routes')(app);




//Define Important Const / Var / Let
const port = process.env.PORT || 3000;
//App Listen Code
app.listen(port, () => {
  debugStartUp(`Node app Started`);
  console.log(`Node app listening on port ${port}`);
})