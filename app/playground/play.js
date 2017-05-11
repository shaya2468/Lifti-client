var AuthAPI = require('AuthAPI');

AuthAPI.signUp('shaya', 123456)
.then((res) => {
  console.log('success');
  console.log(res);
}).catch((e) =>{
  console.log('error');
  console.log(e);
})
