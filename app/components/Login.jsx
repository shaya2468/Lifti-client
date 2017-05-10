import React from 'react';

import * as actions from 'actions';
var {connect} = require('react-redux');
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import {

  Redirect

} from 'react-router-dom'


export class Login extends React.Component{
  onLogin = () => {
    var {dispatch} = this.props;

    dispatch(actions.startLogin());
  }


  render() {

    var {uid} = this.props;
    if (typeof uid==='undefined'){
      return (
        <div>
          <h1 className="page-title">Todo App</h1>

          <div className="row">
            <div className="columns small-centered small-10 medium-6 large-4">
              <div className="callout callout-auth">
                <h3>Login</h3>
                <p>
                  Login with GitHub account below.
                </p>
                <button className="button" onClick={this.onLogin}>Login With GitHub</button>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <Redirect to={{
          pathname: '/todos'

        }}/>
      );
    }

  }
};

export default connect(
  (state) => {
    return {
      uid: state.auth.uid,
    }
  }
)(Login);
