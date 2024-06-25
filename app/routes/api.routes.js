const express = require('express');

const baseController = require('@controllers/api/base.controller');
const apiErrorsMiddleware = require('@middlewares/apiErrors.middleware');


module.exports = function(app){


 app.use(express.json());

 //All Routes to Controller
 app.use('/api/', baseController);

 //Log all API trown errors
 app.use(apiErrorsMiddleware);



}