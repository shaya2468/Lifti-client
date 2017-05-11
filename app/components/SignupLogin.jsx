import React from 'react';
import $ from 'jquery';
import * as actions from 'actions';

var {connect} = require('react-redux');
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import {
  Redirect
} from 'react-router-dom'

export class Login extends React.Component{
  onLogin = (e) => {
    e.preventDefault();
    var email = this.refs.loginEmail.value;
    var password = this.refs.loginPassword.value;
    var {dispatch} = this.props;

    dispatch(actions.startLogin(email, password));

  }

  onSignup = (e) => {
    e.preventDefault();
    var email = this.refs.signupEmail.value;
    var password = this.refs.signupPassword.value;
    var {dispatch} = this.props;
    dispatch(actions.startSignup(email, password));
  }

  switchTabs (e) {

    e.preventDefault();

    var $this = $(e.currentTarget)
    $($this).parent().addClass('active');
    $($this).parent().siblings().removeClass('active');

    var target = $($this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);
  }

  handleKeyUp= (e) =>{
    e.preventDefault();

    var $this = $(e.currentTarget)
    var label = $this.prev('label');

    if ($this.val() === '') {
        label.removeClass('active highlight');
      } else {
        label.addClass('active highlight');
      }
  }

  render() {

    var {uid} = this.props;

    if (!(typeof uid==='undefined')){
      return (
        <Redirect to={{
          pathname: '/home'
        }}/>
      );
    }

    else{
      return (
        <div id="outer_div">
         <div id="auth_page">
          <div className="form">

              <ul className="tab-group">
                <li className="tab active"><a href="#signup" onClick={this.switchTabs} id='bbb'>Sign Up</a></li>
                <li className="tab"><a href="#login" onClick={this.switchTabs} id='aaa'>Log In</a></li>
              </ul>

              <div className="tab-content">
                <div id="signup">
                  <h1>Sign Up for Free</h1>

                  <form onSubmit={this.onSignup}>

                  <div className="top-row">
                    <div className="field-wrap">
                      <label>
                        First Name<span className="req">*</span>
                      </label>
                      <input type="text" required autoComplete="off" onKeyUp={this.handleKeyUp} />
                    </div>

                    <div className="field-wrap">
                      <label>
                        Last Name<span className="req">*</span>
                      </label>
                      <input type="text"required autoComplete="off" onKeyUp={this.handleKeyUp} />
                    </div>
                  </div>

                  <div className="field-wrap">
                    <label>
                      Email Address<span className="req">*</span>
                    </label>
                    <input type="email"required autoComplete="off" onKeyUp={this.handleKeyUp} ref="signupEmail"/>
                  </div>

                  <div className="field-wrap">
                    <label>
                      Set A Password<span className="req">*</span>
                    </label>
                    <input type="password"required autoComplete="off" onKeyUp={this.handleKeyUp} ref="signupPassword"/>
                  </div>

                  <button type="submit" className="button button-block">Get Started</button>

                  </form>

                </div>

                <div id="login">
                  <h1>Welcome Back!</h1>

                  <form onSubmit={this.onLogin}>

                    <div className="field-wrap">
                    <label>
                      Email Address<span className="req">*</span>
                    </label>
                    <input type="email"required autoComplete="off" onKeyUp={this.handleKeyUp} ref="loginEmail"/>
                  </div>

                  <div className="field-wrap">
                    <label>
                      Password<span className="req">*</span>
                    </label>
                    <input type="password"required autoComplete="off" onKeyUp={this.handleKeyUp} ref="loginPassword"/>
                  </div>

                  <p className="forgot"><a href="#">Forgot Password?</a></p>

                  <button className="button button-block">Log In</button>

                  </form>

                </div>

              </div>

                {
                  true
                  ? <div id='loading'></div>
                  : null
                }
            </div>

          </div>

      </div>
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
