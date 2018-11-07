import * as Redux from 'redux';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../App';
import { logOut } from './';
import {
  GET_CHANNELS,
  SEARCH_CHANNELS,
  READ_NEW,
  SEARCH_RESET,
  GET_CHANNEL_CONVESATION,
} from './types';

export const getChannels = () => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token, userID } = getState().auth;
    axios.get(`${API_URL}/conversations/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => dispatch({type: GET_CHANNELS, payload: response.data}))
      .catch((error) => {
        console.log(error, error.response);
        const { status } = error.response
        if (status === 401 && userID) {
          AsyncStorage.clear();
          dispatch(logOut());
          dispatch(NavigationActions.navigate({routeName: 'Login'}));
        }
      });
  }
}

export const searchChannel = (text: string) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/conversations/search/?text=${text}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => dispatch({type: SEARCH_CHANNELS, payload: response.data}))
      .catch((error) => console.log(error, error.response));
  }
}

export const searchReset = () => {
  return(dispatch: Redux.Dispatch<any>) => {
    dispatch({ type: SEARCH_RESET })
  }
}

export const readNew = (channelID: number) => {
  return(dispatch: Redux.Dispatch<any>) => {
    dispatch({type: READ_NEW, payload: channelID})
  }
}


export const createCannel = (users: Array<Number>) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.post(`${API_URL}/conversations/`, { users }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => dispatch({ type: GET_CHANNEL_CONVESATION, payload: response.data }))
    .then(() => dispatch(NavigationActions.navigate({ routeName: 'Chat' })))
    .catch((error) => console.log(error, error.response));
  }
}
