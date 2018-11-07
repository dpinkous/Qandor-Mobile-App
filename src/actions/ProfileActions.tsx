import * as Redux from 'redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { API_URL } from '../App';
import {
  GET_PROFILE,
  CLEAR_PROFILE,
} from './types';

export const getProfile = (userID: number) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/accounts/profile/${userID}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => dispatch({type: GET_PROFILE, payload: response.data}))
      .then(() => dispatch(NavigationActions.navigate({routeName: 'Profile'})))
      .catch((error) => console.log(error, error.response));
  }
}

export const clearProfile = () => {
  return(dispatch: Redux.Dispatch<any>) => {
    dispatch({type: CLEAR_PROFILE})
  }
}

export const getOwnProfile = () => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/accounts/profile/`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => dispatch({type: GET_PROFILE, payload: response.data}))
      .then(() => dispatch(NavigationActions.navigate({routeName: 'Settings'})))
      .catch((error) => console.log(error, error.response));
  }
}
