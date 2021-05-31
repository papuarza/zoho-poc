const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');
const qs = require('qs');
var request = require("request");


router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/redirect', (req, res, next) => {
  console.log(req.query.code)
  var options = {
    method: 'POST',
    url: 'https://accounts.zoho.eu/oauth/v2/token',
    headers:
    {
      'Postman-Token': '7323b39b-bbbf-4775-a1c3-e3442bb81d37',
      'cache-control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form:
    {
      grant_type: 'authorization_code',
      client_id: '1000.Z2RD3B396MLYW3QR0HV4TKMSIBWKGN',
      client_secret: '4e08acb24a427eeec83bfa290e5414a715b5e9aaf4',
      redirect_uri: 'https://zoho-crm-pulsak.herokuapp.com/redirect',
      code: req.query.code,
      undefined: undefined
    }
  };

  request(options, function (error, response, body) {
    console.log(options)
    if (error) throw new Error(error);

    console.log(body);
  });
});

router.get('/final', (req, res, next) => {
  res.render('papu')

});

module.exports = router;