
var fakeAccessToken = 'fakeAccessToken';
var fakeTime = 5000;
module.exports = {

  login:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            localStorage.setItem('access_token', fakeAccessToken);
            resolve({uid:fakeAccessToken});
          }, fakeTime);
      });
  },

  signUp:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            localStorage.setItem('access_token', fakeAccessToken);
            resolve({uid:fakeAccessToken});
          }, fakeTime);
      });
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
