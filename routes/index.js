const express = require('express');
const router = express.Router();
const axios = require('axios');



router.get('/', (req, res, next) => {
  res.render('index')

});

router.get('/redirect', (req, res, next) => {
  console.log(req.query.code)
  axios.post(`https://accounts.zoho.com/oauth/v2/token`, {
    grant_type: "authorization_code",
    client_id: "1000.KK6LLNE571SLLEFJTR6OZEJNR8S7BL",
    client_secret: "58353dd14d63550b8bbc426e13344944ee97591cec",
    redirect_uri: "http://localhost:3000/final",
    code: req.query.code
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