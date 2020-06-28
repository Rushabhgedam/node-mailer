//SPDX-License-Identifier: Apache-2.0

let express = require('express');
let router = express.Router();
let controller = require('./controller/controller.js');

module.exports = router;

router.use(function (req, res, next) {

  console.log('::............ ' + req.url + ' .............');
  console.log('Request: ' + JSON.stringify(req.body, null, 4));
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); 

  function afterResponse() {
    res.removeListener('finish', afterResponse);
  }
  res.on('finish', afterResponse);

});


router.post('/sendMail', controller.sendMail);
