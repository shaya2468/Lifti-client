var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
require('play');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import TodoApp from 'TodoApp';
// import Login from 'Login';
import SignupLogin from 'SignupLogin';

var firstRender = true;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    // hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    // hashHistory.push('/');
  }

  if (firstRender){
    firstRender = false;

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <div>

              <Route path="/todos" component={TodoApp}/>
              <Route path="/" component={SignupLogin}/>

            </div>
        </Router>
      </Provider>,
      document.getElementById('app')
    );
  }
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')
