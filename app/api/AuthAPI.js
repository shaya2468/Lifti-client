
var axios = require('axios')
var fakeAccessToken = 'fakeAccessToken';
var fakeTime = 1000;
module.exports = {

  login:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            // localStorage.setItem('access_token', fakeAccessToken);
            // resolve({uid:fakeAccessToken});
            reject({errorMessage: 'incorrect password'})
          }, fakeTime);
      });
  },

  signUp:function (email, pass) {

    var url = 'http://localhost:4444/users';
    return axios.post(url, {email: email,password: "11111111", name: "aaaaaa"});
  },

  logout:function () {
    localStorage.removeItem('access_token');
    return new Promise(function (resolve, reject) {
          setTimeout(function () {

             resolve();
          }, fakeTime);
      });
  },

  isLoggedIn: function() {
    return localStorage.getItem('access_token');
  }
}
