
var fakeAccessToken = 'fakeAccessToken';
module.exports = {

  login:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            localStorage.setItem('access_token', fakeAccessToken);
            resolve({uid:fakeAccessToken});
          }, 1000);
      });
  },

  signUp:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            localStorage.setItem('access_token', fakeAccessToken);
            resolve({uid:fakeAccessToken});
          }, 1000);
      });
  },

  logout:function () {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
            localStorage.removeItem('access_token');
              resolve();
          }, 1000);
      });
  },

  isLoggedIn: function() {
    return localStorage.getItem('access_token');
  }
}
