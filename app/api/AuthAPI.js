

module.exports = {
  signUp:function (email, pass) {
    return new Promise(function (resolve, reject) {
          setTimeout(function () {
              resolve("sign in success");
          }, 1000);
      });
  }
}
