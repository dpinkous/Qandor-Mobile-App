import * as Redux from 'redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { API_URL } from '../App';
import {
  GET_TEAM,
  ADD_MEMBER,
  SEARCH_NEW_MEMBER,
} from './types';

export const getTeam = () => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/team/`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => dispatch({type: GET_TEAM, payload: response.data}))
      .catch((error) => console.log(error, error.response));
  }
}

export const addMember = (userID: number) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.put(`${API_URL}/team/add-member/`, { "user_id": userID }, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => dispatch({ type: ADD_MEMBER, payload: response.data }))
      .catch((error) => console.log(error, error.response))
  }
}

export const searchNewMember = (position: string = "", user_type: string = "") => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/accounts/users/?position=${position}&user_type=${user_type}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((response) => dispatch({ type: SEARCH_NEW_MEMBER, payload: response.data }))
      .catch((error) => console.log(error, error.response));
  }
}
