import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList'
import Nav from 'Nav';
import Dummy from 'Dummy';
import Create from 'Create';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';
import {
  Redirect,  Route,
  Link
} from 'react-router-dom'


export class Home extends React.Component{

  onLogout = (e) => {
    e.preventDefault();
    var {dispatch} = this.props;
    dispatch(actions.startLogout());
  }

  render(){
    var {uid} = this.props;

    const routes = [
  { path: '/home',
    exact: true,
    main: () => <Dummy/>

  },
  { path: '/home/create',
    main: () => <Create/>
  }
]


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
            <Link to="/home" className="btn_nav">Home</Link>
            <Link to="/home/create" className="btn_nav">Create</Link>
            <button type="button" name="button" className="btn_nav" onClick={ this.onLogout }>Logout</button>
          </div>
          {routes.map((route, index) => (
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Route>s that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Route>s.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
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
