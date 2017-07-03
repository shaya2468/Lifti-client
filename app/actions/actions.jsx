import moment from 'moment';
import AuthAPI from 'AuthAPI';
import UploadApi from 'UploadApi';
import GroupApi from 'GroupApi';
import LiftApi from 'LiftApi';
import CityApi from 'CityApi';


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

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
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

export var sendJoinLiftRequest = (liftId) => {
  return (dispatch, getState) => {
    dispatch(sendJoinLift(liftId));
    return LiftApi.joinLift(liftId).then((res) => {
      dispatch(liftJoinedSuccessfully(liftId, res.data.riders));
    }).catch((e) => {
      console.log(e);
    })
  }
}



export var liftJoinedSuccessfully = (id, riders) => {
  return {
    type: 'LIFT_JOINED_SUCCESSFULLY',
    id,
    riders
  };
};

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

export var addLifts = (lifts) => {
  return {
    type: 'ADD_LIFTS',
    lifts
  };
};

export var sendJoinLift = (id) => {
  return {
    type: 'JOIN_LIFT',
    id
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

export var getLifts = (query) => {

  return (dispatch, getState) => {
    dispatch(isLoadingLifts());
    return LiftApi.getLifts(query)
      .then((res) => {
        dispatch(isLoadingLifts());
        dispatch(addLifts(res.data))
      }).catch((e) => {
        dispatch(isLoadingLifts());
        console.log(e);
        return e;
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
export var isLoadingLifts = () => {
  return {
    type: 'IS_LOADING_LIFTS'
  };
};



export var startLogout = () => {
  AuthAPI.logout();
  return {
    type: 'LOGOUT'
  };

};
