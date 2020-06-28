'use strict'
var path = require('path')
var url = require('url');
const fs = require('fs')
const curl = require('curl')
var callRequest = require('request');

const send = require('gmail-send')({
  user: 'rushabhg358@gmail.com', //put your email ID here
  pass: 'mypassword@123', //put your email Id's password here
  to: 'kaykobtau@gmail.com',
  subject: 'Thank you for reaching me',
});

exports.sendMail = function (request, response, next) {
  console.log(request.body)
  send({
    text: 'gmail-send example 1',  
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    response.send([result, fullResult])
    console.log(result);
  })
}
