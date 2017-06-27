var axios = require('axios')
module.exports = {

  getCities:function () {
    var url = `${process.env.URL}cities`;
    var accessToken = localStorage.getItem('access_token');
    return axios.get(url, {headers: {"x-auth":accessToken}});
  }
}
