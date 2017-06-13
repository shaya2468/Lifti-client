var axios = require('axios')
module.exports = {

  createGroup:function (name, description) {
    var url = `${process.env.URL}groups`;
    var accessToken = localStorage.getItem('access_token');
    return axios.post(url, {name, description}, {headers: {"x-auth":accessToken}});
  },
  searchGroups:function (query){
    var url = `${process.env.URL}groups/search/${query}`;
    var accessToken = localStorage.getItem('access_token');
    return axios.get(url, {headers: {"x-auth":accessToken}});
  }
}
