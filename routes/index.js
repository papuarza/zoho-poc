const express = require('express');
const router = express.Router();
const axios = require('axios');
const FormData = require('form-data');

function JSON_to_URLEncoded(element,key,list){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
      JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
}

router.get('/', (req, res, next) => {
  res.render('index')
});

router.get('/redirect', (req, res, next) => {
  let data = {
    "grant_type": "authorization_code",
    "client_id": "1000.Z2RD3B396MLYW3QR0HV4TKMSIBWKGN",
    "client_secret": "4e08acb24a427eeec83bfa290e5414a715b5e9aaf4",
    "redirect_uri": "https://zoho-crm-pulsak.herokuapp.com/final",
    "code": req.query.code
  }

  axios({
    method: "post",
    url: "https://accounts.zoho.eu/oauth/v2/token?",
    data: JSON_to_URLEncoded(data),
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