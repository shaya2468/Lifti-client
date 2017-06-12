module.exports = {

  uploadFile:function (file, gropuId) {

    //reference: https://developers.google.com/web/fundamentals/getting-started/primers/promises
    return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open('post', `${process.env.URL}upload`, true);

      xhr.setRequestHeader("x-auth", localStorage.getItem('access_token'));
      var form = new FormData();
      form.append("upload", file);
      if (gropuId){
        form.append("group_id", gropuId);
      }

      xhr.addEventListener("load", function(){
        resolve(JSON.parse(xhr.response));
      });
      xhr.addEventListener("error", function(){
        reject();
      });
      xhr.send(form);
  });
  }
}
