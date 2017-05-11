

module.exports = {
  signUp:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
              resolve({uid:'abcdefg'});
          }, 1000);
      });
  },

  login:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
              resolve({uid:'abcdefg'});
          }, 1000);
      });
  }
}
