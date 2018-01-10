'use strict'
const vision = require('node-cloud-vision-api')
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let port = 8888;
let authKey = process.env.Auth;

/**
 * cloud Vsion
 * @param {JSON} visionUrl Image url 
 * @return {string} cloud Vsion response
 */
function cloudVsion(visionUrl){
  vision.init({auth: authKey});
  const req = new vision.Request({
    image: new vision.Image({
      url: visionUrl.url
    }),

   features: [
      new vision.Feature('FACE_DETECTION', 4),
      new vision.Feature('LABEL_DETECTION', 10),
    ]
  })
  return new Promise( (resolve, reject) => {
    vision.annotate(req).then((res) => {
      console.log(JSON.stringify(res.responses))
      return resolve(JSON.stringify(res.responses))
    })
  })
}

app.post('/imgUrl', function(req, res) {

  Promise.resolve(req)
    .then(function(req) {
      console.log('123');
      console.log('req.body : ' + JSON.stringify(req.body));
      return cloudVsion(req.body);
    })
    .then(function(resData) {
      res.send(resData);
    })
    .catch(function(err) {
      console.log('Server ERR : ' + err);
      res.status(500);
      res.send(err);
    });
});

app.listen(port, function() {
  //console.log('Listening at http://' + ip.address() + ':' + port);
});
