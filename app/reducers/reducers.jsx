var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};


export var errorAuthReucer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR_AUTH':
      return action.errorMessage;
    default:
      return state;
  };
};

export var finishInitReducer = (state = false, action) => {
  switch (action.type) {
    case 'FINISH_INIT':
      return true;
    default:
      return state;
  };
};

export var groupsReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_GROUP':
      return [
        ...state,
        action.group
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_GROUPS':
      return action.groups;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var permsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PERMS':
      return action.perms;
    default:
      return state;
  }
}

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export var loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return !state;
    default:
      return state;
  }
};
