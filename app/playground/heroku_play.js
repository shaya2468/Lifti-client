var axios = require('axios')


function sendXHR(url, callback) {
  var url = `http://liftii.herokuapp.com/`;
  axios.get(url)
  .then((res) => {
    console.log('success getting site');

  }).catch((e) => {
    console.log('error');
    console.log(e);
  });
}

function sendXHRCities() {
  var url = 'https://todo22.herokuapp.com/cities';
  var accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTk4NzcyMzIwYzZlZjAwMTFkZjhlZjAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAzMTY0MTk2fQ.nSsXaNBqzvR9rmMWa88E_bMjoSlPRYphwZ73dVad7Kc'
  axios.get(url, {headers: {"x-auth":accessToken}})
  .then((res) => {
    console.log('success cities');

  }).catch((e) => {
    console.log('error');
    console.log(e);
  });
}

function infinite() {
    sendXHR('url/path');
    sendXHRCities();
    setTimeout(infinite, 5 * 60 * 1000);
}

infinite();



//
