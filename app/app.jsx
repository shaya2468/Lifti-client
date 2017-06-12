var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
// require('play');
import AuthAPI from 'AuthAPI';
import GroupInfo from 'GroupInfo';
var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import TodoApp from 'TodoApp';
import Home from 'Home';
// import Login from 'Login';
import SignupLogin from 'SignupLogin';

var firstRender = true;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // store.dispatch(actions.login(user.uid));
    // store.dispatch(actions.startAddTodos());
    // hashHistory.push('/todos');
  } else {
    // store.dispatch(actions.logout());
    // hashHistory.push('/');
  }


});

if (firstRender){
  firstRender = false;

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>

            <Route path="/home" component={Home}/>
            <Route path="/home/group/:id" component={GroupInfo}/>
            <Route path="/todos" component={TodoApp}/>
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


// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')
