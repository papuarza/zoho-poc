const express = require('express');
const router = express.Router();
const axios = require('axios');



router.get('/', (req, res, next) => {
  res.render('index')

});

router.get('/redirect', (req, res, next) => {
  console.log(req.query)
  let data = {
    "grant_type": "authorization_code",
    "client_id": "1000.Z2RD3B396MLYW3QR0HV4TKMSIBWKGN",
    "client_secret": "4e08acb24a427eeec83bfa290e5414a715b5e9aaf4",
    "redirect_uri": "https://zoho-crm-pulsak.herokuapp.com/final",
    "code": req.query.code
  }
  let final_data = JSON.stringify(data);
  axios.post(`https://accounts.zoho.eu/oauth/v2/token?`, final_data, {
    headers: { 'Content-Type': 'application/json' }
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