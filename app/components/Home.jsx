import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList'
import Nav from 'Nav';
import Dummy from 'Dummy';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';
import {
  Redirect
} from 'react-router-dom'


export class Home extends React.Component{

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
          <Nav/>
          <Dummy/>
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
