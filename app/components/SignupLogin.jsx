import React from 'react';
import LiftiModal from 'LiftiModal';
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
    this.dispatch(actions.startSignup(this.signUpEmail, password, this.signUpFirstName, file));
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
          : <h1 id="sign-up-title">Sign Up for Free</h1>
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
          : <h1 id="welcome-message">Welcome Back!</h1>
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



    else{
      return (
        <div id="outer_div">
          {
            isLoading &&

            <LiftiModal
                isModalOpen={true}
                closeModal={() => {console.log('do nothing');}}
                >

                <div id="loading_wrapper-layout">
                  <div className="acc-rej">
                    <div className="loader"></div>
                  </div>

                  <h1 id="loading-message">Loading, please wait ....</h1>
                </div>
            </LiftiModal>
          }


         <div id="auth_page">

           <SignUpBuzz/>

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

class SignUpBuzz extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="sign-up-buzz">
          <div id="buzz-layout">
            <SearchSVG/>
            <div className="buzz-info">
              <h1 className="buzz-title">Search</h1>
              <h1 className="buzz-text">Find groups from your social and professional circles</h1>
            </div>
          </div>
          <div id="buzz-layout">
            <HandSVG/>
            <div className="buzz-info">
              <h1 className="buzz-title">Join</h1>
              <h1 className="buzz-text">Hop on Lifts and save time and money</h1>
            </div>
          </div>
          <div id="buzz-layout">
            <CarSVG/>
            <div className="buzz-info">
              <h1 className="buzz-title">Create</h1>
              <h1 className="buzz-text">Create lifts and pick up your friends and family</h1>
            </div>
          </div>

      </div>
    )
  }
}

class CarSVG extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
     <svg className="svg-in-buzz" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M352 1088q0-66-47-113t-113-47-113 47-47 113 47 113 113 47 113-47 47-113zm36-320h1016l-89-357q-2-8-14-17.5t-21-9.5h-768q-9 0-21 9.5t-14 17.5zm1372 320q0-66-47-113t-113-47-113 47-47 113 47 113 113 47 113-47 47-113zm160-96v384q0 14-9 23t-23 9h-96v128q0 80-56 136t-136 56-136-56-56-136v-128h-1024v128q0 80-56 136t-136 56-136-56-56-136v-128h-96q-14 0-23-9t-9-23v-384q0-93 65.5-158.5t158.5-65.5h28l105-419q23-94 104-157.5t179-63.5h768q98 0 179 63.5t104 157.5l105 419h28q93 0 158.5 65.5t65.5 158.5z"/></svg>
   )
  }
}

class SearchSVG extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
     <svg className="svg-in-buzz" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>
   )
  }
}

class HandSVG extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
     <svg className="svg-in-buzz" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M256 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm1408-576q0-51-39-89.5t-89-38.5h-576q0-20 15-48.5t33-55 33-68 15-84.5q0-67-44.5-97.5t-115.5-30.5q-24 0-90 139-24 44-37 65-40 64-112 145-71 81-101 106-69 57-140 57h-32v640h32q72 0 167 32t193.5 64 179.5 32q189 0 189-167 0-26-5-56 30-16 47.5-52.5t17.5-73.5-18-69q53-50 53-119 0-25-10-55.5t-25-47.5h331q52 0 90-38t38-90zm128-1q0 105-75.5 181t-180.5 76h-169q-4 62-37 119 3 21 3 43 0 101-60 178 1 139-85 219.5t-227 80.5q-133 0-322-69-164-59-223-59h-288q-53 0-90.5-37.5t-37.5-90.5v-640q0-53 37.5-90.5t90.5-37.5h288q10 0 21.5-4.5t23.5-14 22.5-18 24-22.5 20.5-21.5 19-21.5 14-17q65-74 100-129 13-21 33-62t37-72 40.5-63 55-49.5 69.5-17.5q125 0 206.5 67t81.5 189q0 68-22 128h374q104 0 180 76t76 179z"/></svg>
   )
  }
}



export default connect(
  (state) => {
    return {
      uid: state.auth.uid,
      isLoading: state.isLoading,
      errorMessage: state.errorAuth.errorMessage
    }
  }
)(Login);
