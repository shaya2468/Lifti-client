import moment from 'moment';
import AuthAPI from 'AuthAPI';
import UploadApi from 'UploadApi';
import GroupApi from 'GroupApi';
import CityApi from 'CityApi';
import firebase, {firebaseRef, githubProvider} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var addGroup = (group) => {
  return {
    type: 'ADD_GROUP',
    group
  };
};

export var errorAuth = (errorMessage) => {
  return {
    type: 'ERROR_AUTH',
    errorMessage
  };
};

export var errorAuthErase = () => {
  return errorAuth('');
}



export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export var addAllGroups = (groups) => {
  return {
    type: 'ADD_GROUPS',
    groups
  };
};

export var addAllCities = (cities) => {
  return {
    type: 'ADD_CITIES',
    cities
  };
};


export var addAllPermRequests = (perms) => {
  return {
    type: 'ADD_PERMS',
    perms
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
      var todos = snapshot.val() || {};
      var parsedTodos = [];

      Object.keys(todos).forEach((todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId]
        });
      });

      dispatch(addTodos(parsedTodos));
    });
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var uid = getState().auth.uid;
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};

export var setAccessToken = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var finishInit = () => {
  return {
    type: 'FINISH_INIT'
  };
};

export var sendJoinRequest = (groupId, message) => {
  return (dispatch, getState) => {
    return GroupApi.requestJoinGroup(groupId, message).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    })
  }
}


export var sendingAcceptJoin = (applicantId, groupId) => {
  return {
    type: 'ACCEPT_JOIN',
    groupId,
    applicantId
  };
};

export var joinAcceptDone = (applicantId, groupId) => {
  return {
    type: 'ACCEPT_JOIN_DONE',
    groupId,
    applicantId
  };
};



export var addFilter = (filter) => {
  return {
    type: 'ADD_FILTER',
    filter
  };
};


export var acceptJoin = (applicantId, groupId, isAccept) => {
  return (dispatch, getState) => {

    dispatch(sendingAcceptJoin(applicantId, groupId));
    return GroupApi.acceptJoin(applicantId, groupId, isAccept).then((res) => {
        dispatch(joinAcceptDone(applicantId, groupId));
    }).catch((e) => {
      console.log('exception on accept join');
      console.log(e);
    })
  }
}

function delay(t) {
   return new Promise(function(resolve) {
       setTimeout(resolve, t)
   });
}

export var startCreateGroup = (name, description, file) => {

  return (dispatch, getState) => {
    return GroupApi.createGroup(name, description).then((res) => {
      if (file){
        return UploadApi.uploadFile(file, res.data.id).then((newGroup) => {
           dispatch(addGroup(newGroup));
           return newGroup;
        });
      }else{
        finish();
      }
    })
  };
};

export var getGroups = () => {

  return (dispatch, getState) => {
    return GroupApi.getAllGroups()
    .then((res) => {
      if (res.data.groups){
        dispatch(addAllGroups(res.data.groups));
      }
      return GroupApi.getAllJoinRequests()
    }).then((res) => {
      dispatch(addAllPermRequests(res.data));
      return CityApi.getCities();
    }).then((res) => {
      dispatch(addAllCities(res.data))
      dispatch(finishInit());
    })
  };
};

export var startLogin = (email, password) => {
  return (dispatch, getState) => {
    dispatch(isLoading());
    return AuthAPI.login(email, password).then((response) => {


      var accessToken = response.headers['x-auth'];
      localStorage.setItem('access_token', accessToken);
      var uid = {
        uid: accessToken
      }
      var finish = finishAuthSuccess(uid, dispatch);
      finish();

    }, (error) => {
      console.log(error);
      dispatch(isLoading());
      dispatch(errorAuth({errorMessage: error.statusText}));
    });
  };
};

var finishAuthSuccess = (uid, dispatch) => {
  return () => {
    dispatch(isLoading());
    dispatch(setAccessToken(uid))
  }
}

export var startSignup = (email, password, name, file) => {
  return (dispatch, getState) => {
    dispatch(isLoading());

    return AuthAPI.signUp(email, password, name).then((response) => {

      var accessToken = response.headers['x-auth'];
      localStorage.setItem('access_token', accessToken);
      var uid = {
        uid: accessToken
      }
      var finish = finishAuthSuccess(uid, dispatch);

      if (file){
        return UploadApi.uploadFile(file, null, finish).then(() => {
          finish();
        });
      }else{
        finish();
      }
    }, (error) => {
      dispatch(isLoading());
      dispatch(errorAuth({errorMessage: error.statusText}));
    });
  };
};

export var isLoading = () => {
  return {
    type: 'IS_LOADING'
  };
};

export var startLogout = () => {
  AuthAPI.logout();
  return {
    type: 'LOGOUT'
  };

};
