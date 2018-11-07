import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import * as Redux from 'redux';
import { API_URL } from '../App';
import {
  GET_CHANNEL_CONVESATION,
  GET_CHAT_DETAILS,
  CLEAR_CHAT,
  SEND_MESSAGE,
  GET_NEW_MESSAGES,
} from './types';

export const getMessages = (channelID: number, name: string) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/conversations/${channelID}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => dispatch({ type: GET_CHANNEL_CONVESATION, payload: response.data }))
      .then(() => dispatch(NavigationActions.navigate({routeName: 'Chat', params: { title: name }})))
      .catch((error) => console.log(error, error.response));
  };
};
  
export const sendMessage = (message: any, messages: any) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    const { id } = getState().chat;
    axios.post(`${API_URL}/conversations/${id}/message/`, {
      ...message
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((error) => console.log(error, error.response));
    dispatch({type: SEND_MESSAGE, payload: messages});
  };
};

export const clearChat = () => {
  return(dispatch: Redux.Dispatch<any>) => {
    dispatch({type: CLEAR_CHAT})
  }
}

export const getNewMessages = (channelID: number) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/conversations/${channelID}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    	.then((response) => dispatch({ type: GET_NEW_MESSAGES, payload: response.data }))
    	.catch((error) => console.log(error, error.response));
  }
}

export const getSearchedChannelMessages = (channel: number, message: number) => {
  return(dispatch: Redux.Dispatch<any>, getState: any) => {
    const { access_token } = getState().auth;
    axios.get(`${API_URL}/conversations/${channel}/?id=${message}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        dispatch({ type: GET_CHANNEL_CONVESATION, payload: response.data })
      })
      .then(() => dispatch(NavigationActions.navigate({routeName: 'Chat'})))
      .catch((error) => console.log(error, error.response));
  }
}
