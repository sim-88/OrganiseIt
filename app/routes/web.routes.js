
//Middlewares
const viewErrorsMiddleware = require('@middlewares/viewErrors.middleware');


//Controllers
const homeController = require('@controllers/web/home.controller');


module.exports = function(app){

  
  //Routes Starts Here ---------------------------------------------
  app.use('/', homeController)  


  //Routes Ends Here ---------------------------------------------

  //Log all thrown errors
  app.use(viewErrorsMiddleware);

}