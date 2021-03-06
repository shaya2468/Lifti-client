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



export var citiesReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_CITIES':
      return action.cities;
    default:
      return state;
  }
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

      var perms = action.perms;
      perms.map ( (perm) => {
        perm.requestStatus = 'static';
      })

      return perms;

    case 'ACCEPT_JOIN':

        var wantedPerm = state.filter( (e) => {
          return ((e.applicant_id === action.applicantId) && (e.group_id === action.groupId));
        })[0];

        wantedPerm.requestStatus = 'loading';

        return [...state];
      case 'ACCEPT_JOIN_DONE':

        var wantedPerm = state.filter( (e) => {
          return ((e.applicant_id === action.applicantId) && (e.group_id === action.groupId));
        })[0];

        wantedPerm.requestStatus = 'done';

        return [...state];
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

export var loadingLiftsReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADING_LIFTS':
      return !state;
    default:
      return state;
  }
};



export var filtersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {
        ...state,
        ...action.filter
      };
    default:
      return state;
  }
};


export var liftsReducer = (state = [] , action) => {
  switch (action.type) {
    case 'ADD_LIFTS':
      return action.lifts;

    case 'JOIN_LIFT':

      var liftRequested = state.filter( (e) => {
        return ((e.id === action.id));
      })[0];
      liftRequested.user_status = 'sending_request';
      return [...state];

    case 'LIFT_JOINED_SUCCESSFULLY':

      var liftRequested = state.filter( (e) => {
        return ((e.id === action.id));
      })[0];
      liftRequested.user_status = 'rider';
      liftRequested.riders = action.riders;
      return [...state];
    default:
      return state;
  }
};
