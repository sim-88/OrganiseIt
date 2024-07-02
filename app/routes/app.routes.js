const express = require('express');

const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');

const baseController = require('@controllers/app/base.controller');
const testController = require('@controllers/app/test.controller');
const test2Controller = require('@controllers/app/test2.controller');

 

module.exports = function(app){
 app.use(express.json());
 app.use('/admin/', baseController)  
 app.use('/admin/test', testController)  
 app.use('/admin/test2', test2Controller)  
 

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}