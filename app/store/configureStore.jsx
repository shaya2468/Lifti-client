import * as redux from 'redux';
import thunk from 'redux-thunk';

import {searchTextReducer, showCompletedReducer, todosReducer, authReducer, loadingReducer,
        errorAuthReucer, groupsReducer, citiesReducer, permsReducer, finishInitReducer, filtersReducer, liftsReducer} from 'reducers'

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    groups: groupsReducer,
    cities: citiesReducer,
    perms: permsReducer,
    auth: authReducer,
    isLoading: loadingReducer,
    errorAuth: errorAuthReucer,
    finishInit: finishInitReducer,
    filters: filtersReducer,
    lifts: liftsReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
