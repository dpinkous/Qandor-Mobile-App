import {IAction} from './';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_AUTH_USER,
} from '../actions/types';

const INITIAL_STATE = {
  access_token: '',
  userID: null,
  error: '',
  user: null,
};

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        access_token: payload.token,
        userID: payload.userID,
      };
    }
    case LOGOUT: {
      return { ...INITIAL_STATE }
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        error: payload,
      }
    }
    case SET_AUTH_USER: {
      return {
        ...state,
        user: payload,
      }
    }
    default:
      return state;
  }
};

