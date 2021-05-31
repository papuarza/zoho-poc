const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');



router.get('/', (req, res, next) => {
  res.render('index')

});

router.get('/redirect', (req, res, next) => {
  var bodyFormData = new FormData();
  bodyFormData.append('grant_type', 'authorization_code');
  bodyFormData.append('client_id', '1000.Z2RD3B396MLYW3QR0HV4TKMSIBWKGN');
  bodyFormData.append('client_secret', '4e08acb24a427eeec83bfa290e5414a715b5e9aaf4');
  bodyFormData.append('redirect_uri', 'https://zoho-crm-pulsak.herokuapp.com/final');
  bodyFormData.append('code', req.query.code);

  axios.post({
    method: "post",
    url: "https://accounts.zoho.eu/oauth/v2/token?",
    data: bodyFormData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get('/final', (req, res, next) => {
  res.render('papu')

});

module.exports = router;