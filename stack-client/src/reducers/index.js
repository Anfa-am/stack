import { combineReducers } from 'redux';
import Axios from 'axios'
import Store from '../stores';

const base = {
  isLoading: false,
  isUserLoggedIn: false
};

const usersReducer = {
  function(state=base, action) {
    switch (action.type) {
      case 'USER_LOGGED_IN': {
        state = {...state, isUserLoggedIn: true };
        break;
      }
    }
    return state;
  }
};

module.exports = combineReducers(usersReducer);
