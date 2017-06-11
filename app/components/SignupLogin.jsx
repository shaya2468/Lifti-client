import React from 'react';
import $ from 'jquery';
import * as actions from 'actions';
var axios = require('axios');
var {connect} = require('react-redux');
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import {
  Redirect
} from 'react-router-dom'

export class Login extends React.Component{


  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.state = {file: '',imagePreviewUrl: ''};

  }

  onLogin = (e) => {
    e.preventDefault();

    this.loginEmail = this.refs.loginEmail.value;
    var password = this.refs.loginPassword.value;

    this.dispatch(actions.startLogin(this.loginEmail, password));
    this.dispatch(actions.errorAuthErase());

  }

  onSignup = (e) => {
    e.preventDefault();

    this.signUpEmail = this.refs.signUpEmail.value;
    var password = this.refs.signUpPassword.value;
    this.signUpFirstName  = this.refs.signUpFirstName.value;
    this.signUpLastName  = this.refs.signUpLastName.value;

    let {file} = this.state;
    this.dispatch(actions.startSignup(this.signUpEmail, password, file));
    this.dispatch(actions.errorAuthErase());
  }

  switchTabs = (e) => {

    e.preventDefault();

    var $this = $(e.currentTarget)
    $($this).parent().addClass('active');
    $($this).parent().siblings().removeClass('active');

    var target = $($this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);
    this.dispatch(actions.errorAuthErase());
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

  generateActiveHighlight = (val)  => {
    return val ? "active highlight" : "";
  }

  generateDefaultValue = (val)  => {
    return val ? val : "";
  }

  generateElementInForm = (title, fieldName, inputType) => {
    return (
      <div className="field-wrap">
        <label className={ this.generateActiveHighlight(this[fieldName])}>
          {title}<span className="req">*</span>
        </label>
        <input type={inputType} required autoComplete="off" onKeyUp={this.handleKeyUp} ref={fieldName}  disabled={this.props.isLoading} defaultValue={ this.generateDefaultValue(this[fieldName]) }/>
      </div>
    )
  }

  generateTabClassName = (fromLogin) => {
      var both = 'tab';

      if (fromLogin){
        if (this.loginEmail){
          both += ' active'
        }
      }else{
        if (!this.loginEmail){
          both += ' active'
        }
      }
      return both;
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }


  componentDidMount(){

    $('.imgPreview').click(function(){
      $("input[type='file']").trigger('click');
    })

    $("input[type='file']").change(function(){
      $('#val').text(this.value.replace(/C:\\fakepath\\/i, ''))
    })
  }


  generateSignUp = () => {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<button id='button' className="imgPreview"><img src={imagePreviewUrl} /></button>);
    } else {
       $imagePreview = (<button id='button' className="imgPreview">Profile pic</button>);
    }
    return (

      <div id="signup">

        {
          this.props.errorMessage
          ? <h1 id="auth_error">{this.props.errorMessage}</h1>
          : <h1>Sign Up for Free</h1>
        }
        <form onSubmit={this.onSignup}>

          <div id="profile-pic">
            <input required type='file' onChange={(e)=>this._handleImageChange(e)}/>
            <span id='val'></span>

            {$imagePreview}

          </div>

        <div className="top-row">
          {this.generateElementInForm("First Name", "signUpFirstName", "text")}
          {this.generateElementInForm("Last Name", "signUpLastName", "text")}
        </div>

        {this.generateElementInForm("Email Address", "signUpEmail", "email")}
        {this.generateElementInForm("Set A Password", "signUpPassword", "password")}

        <button type="submit" className="button button-block" disabled={this.props.isLoading} >Get Started</button>

        </form>

      </div>

    )
  }

  generateLogin = () => {
    return (

      <div id="login">

        {
          this.props.errorMessage
          ? <h1 id="auth_error">{this.props.errorMessage}</h1>
          : <h1>Welcome Back!</h1>
        }

        <form onSubmit={this.onLogin}>

        {this.generateElementInForm("Email Address", "loginEmail", "email")}
        {this.generateElementInForm("Password", "loginPassword", "password")}

        <p className="forgot"><a href="#">Forgot Password?</a></p>

        <button className="button button-block" disabled={this.props.isLoading}>Log In</button>

        </form>

      </div>

    )
  }


  render() {

    var {uid, isLoading, errorMessage} = this.props;

    if (!(typeof uid==='undefined')){
      return (
        <Redirect to={{
          pathname: '/home'
        }}/>
      );
    }



    else if (isLoading){

        return (
          <div id="outer_div">
           <div id="auth_page">
             <h1 id="loading_text">Loading, please wait...</h1>
             <div id='loading'></div>
           </div>
          </div>
        )
    }

    else{
      return (
        <div id="outer_div">
         <div id="auth_page">
          <div className="form">

              <ul className="tab-group">
                <li className={this.generateTabClassName(false)}><a href="#signup" onClick={this.switchTabs} id='bbb'>Sign Up</a></li>
                <li className={this.generateTabClassName(true)}><a href="#login" onClick={this.switchTabs} id='aaa'>Log In</a></li>
              </ul>

              <div className="tab-content">

                {this.generateSignUp()}
                {this.generateLogin()}
              </div>

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
      isLoading: state.isLoading,
      errorMessage: state.errorAuth.errorMessage
    }
  }
)(Login);
