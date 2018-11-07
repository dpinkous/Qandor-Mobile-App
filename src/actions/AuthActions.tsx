import * as Redux from 'redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from "react-native"
import { API_URL } from '../App';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_AUTH_USER,
} from './types';

export const login = (username: string, password: string, remember: boolean) => {
  return(dispatch: Redux.Dispatch<any>) => {
    axios.post(`${API_URL}/accounts/login/`, {username, password})
      .then((response) => {
        const { token, userID } = response.data;
        dispatch({type: LOGIN_SUCCESS, payload: { token, userID }});
        if (remember) {
          AsyncStorage.setItem('loggedIn', JSON.stringify({ token, userID }));
        }
        dispatch(getUser(token, remember));
      })
      .then(() => dispatch(NavigationActions.navigate({routeName: 'MainScreen'})))
      .catch((error) => {
        console.log(error, error.response);
        if (error.response.status === 403 && error.response.data) {
          dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
        }
      });
  };
};

export const register = (password: string, email: string) => {
  return(dispatch: Redux.Dispatch<any>) =>
    axios.post(`${API_URL}/accounts/create/`, {username: email, password, email})
      .then(() => dispatch(NavigationActions.navigate({routeName: 'Login'})))
      .catch((error) => console.log(error, error.response));
};

export const setLogged = (token: string, userID: number) => {
  return(dispatch: Redux.Dispatch<any>) =>
    dispatch({type: LOGIN_SUCCESS, payload: {token, userID}})
}

export const setProfile = (user: {}) => {
  return(dispatch: Redux.Dispatch<any>) => 
    dispatch({type: SET_AUTH_USER, payload: user})
}

export const logOut = () => {
  return(dispatch: Redux.Dispatch<any>) =>
    dispatch({ type: LOGOUT })
}

const getUser = (token: string, remember: boolean) => {
  return(dispatch: Redux.Dispatch<any>) => {
    axios.get(`${API_URL}/accounts/profile/`, {
      headers: {
        Authorization: `Bearer ${ token }`
      }
    })
      .then((response) => {
        dispatch({ type: SET_AUTH_USER, payload: response.data });
        if (remember) {
          AsyncStorage.setItem('lastUser', JSON.stringify({ user: response.data }));
        }
      })
      .catch((error) => console.log(error))
  }
}
