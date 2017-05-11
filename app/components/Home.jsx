import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList'
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';
import {
  Redirect
} from 'react-router-dom'


export class Home extends React.Component{


  onLogout = (e) => {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startLogout());
  }

  render(){
    var {uid} = this.props;
    if (typeof uid==='undefined'){
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      );
    }else{
      return (
        <div id="home_full">
          <div id="home_nav">
            <button type="button" name="button" id="btn_logout" onClick={ this.onLogout }>Logout</button>
          </div>
        </div>
      )
    }
  }
}

export default Redux.connect(
  (state) => {
    return {
      uid: state.auth.uid,
    }
  }
)(Home);
