//const jwt = require('jsonwebtoken');


module.exports = function auth(authKeyword) { return function auth(req, res, next){

    const token = req.header('x-auth-token');
   // if(!token) res.status(401).send('Access Denied. No Token Provided.');
    req.user = {"name":"Mandeep Saini","_id":"12345"};
    req.authKeyword = authKeyword;
    next();

    // try{
    // const decoded = jwt.verify(token,'jwtPrivateKey');
    // req.user = decoded;
    // next();
    // }
    // catch(ex){
    //     res.status(400).send('Access Denied. Invalid Token');
    // }

    }
}