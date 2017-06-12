var axios = require('axios')
module.exports = {

  login:function (email, password) {
    var url = `${process.env.URL}users/login`;
    return axios.post(url, {email: email,password: password, name: "aaaaaa"});
  },

  signUp:function (email, password) {

    var url = `${process.env.URL}users`;
    return axios.post(url, {email: email, password: password, name: "aaaaaa"});
  },

  logout:function () {
    localStorage.removeItem('access_token');
    return new Promise(function (resolve, reject) {
          resolve();
      });
  },

  isLoggedIn: function() {
    return localStorage.getItem('access_token');
  }
}
