var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// require('play');
import AuthAPI from 'AuthAPI';
import GroupInfo from 'GroupInfo';
var actions = require('actions');
var store = require('configureStore').configure();


import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import Home from 'Home';
// import Login from 'Login';
import SignupLogin from 'SignupLogin';

var firstRender = true;



if (firstRender){
  firstRender = false;

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>

            <Route path="/home" component={Home}/>
            <Route path="/home/group/:id" component={GroupInfo}/>
            <Route path="/" component={SignupLogin}/>

          </div>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
}

var accessToken = AuthAPI.isLoggedIn();
if (accessToken){
  store.dispatch(actions.setAccessToken(accessToken));
}

// App css
require('style!css!sass!applicationStyles')
