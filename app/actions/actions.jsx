import moment from 'moment';
import AuthAPI from 'AuthAPI';
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

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
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

export var startLogin = (email, password) => {
  return (dispatch, getState) => {
    dispatch(isLoading());
    return AuthAPI.login(email, password).then((uid) => {
      dispatch(isLoading());
      dispatch(setAccessToken(uid))
    }, (error) => {
      dispatch(isLoading());
      dispatch(errorAuth(error));
    });
  };
};

var finishAuthSuccess = (uid, dispatch) => {
  return () => {
    dispatch(isLoading());
    dispatch(setAccessToken(uid))
  }
}

export var startSignup = (email, password, file) => {
  return (dispatch, getState) => {
    dispatch(isLoading());

    return AuthAPI.signUp(email, password).then((response) => {


      var accessToken = response.headers['x-auth'];

      localStorage.setItem('access_token', accessToken);

      var uid = {
        uid: accessToken
      }
      var finish = finishAuthSuccess(uid, dispatch);
      if (file){
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:4444/upload', true);
        console.log(accessToken);
        xhr.setRequestHeader("x-auth", accessToken);
        var form = new FormData();
        form.append("upload", file);
        xhr.addEventListener("load", function(){
          finish();
        });
        xhr.addEventListener("error", function(){
          finish();
        });
        xhr.send(form);
      }else{
        finish();
      }
    }, (error) => {
      dispatch(isLoading());
      dispatch(errorAuth(error));
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
