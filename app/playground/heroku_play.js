var axios = require('axios')


function sendXHR(url, callback) {
  var url = `http://liftii.herokuapp.com/`;
  axios.get(url)
  .then((res) => {
    console.log('success');

  }).catch((e) => {
    console.log('error');
    console.log(e);
  });
}

function infinite() {
    sendXHR('url/path');
    setTimeout(infinite, 5 * 60 * 1000);
}

infinite();
