var axios = require('axios')
module.exports = {

  createLift:function (body) {
    var url = `${process.env.URL}lifts`;
    var accessToken = localStorage.getItem('access_token');
    return axios.post(url, body, {headers: {"x-auth":accessToken}});
  }
}
