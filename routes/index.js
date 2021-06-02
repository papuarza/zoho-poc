const express = require('express');
const router = express.Router();
var request = require("request");


router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/redirect', (req, res, next) => {
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
      redirect_uri: 'http://localhost:3000/redirect',
      code: req.query.code,
      undefined: undefined
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.render('token', {data: JSON.parse(body)})
  });
});


router.get('/refresh/:token', (req, res, next) => {
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
      grant_type: 'refresh_token',
      client_id: '1000.Z2RD3B396MLYW3QR0HV4TKMSIBWKGN',
      client_secret: '4e08acb24a427eeec83bfa290e5414a715b5e9aaf4',
      redirect_uri: 'http://localhost:3000/redirect',
      refresh_token: req.params.token,
      undefined: undefined
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let data = JSON.parse(body);
    data['refresh_token'] = req.params.token;
    res.render('refresh', {data})
  });

});

module.exports = router;