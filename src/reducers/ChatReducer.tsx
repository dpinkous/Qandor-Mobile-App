import {IAction} from './';
import {
  GET_CHANNEL_CONVESATION,
  GET_CHAT_DETAILS,
  CLEAR_CHAT,
  SEND_MESSAGE,
  GET_NEW_MESSAGES,
} from '../actions/types';
import { API_URL } from '../App';

const INITIAL_STATE = {
  id: null,
  messages: new Array(),
  users: [],
};

const getMessages = (messages: any) => {
  messages.map((message: any) => {
    message['_id'] = message.mobile_uid;
    message['user'] = {
      '_id': `${message.user.id}`
    };
    if ( message.image ) {
      message['image'] = `${API_URL.slice(0, -4)}${message.image}`;
    }
  });
  messages.sort((obj1: any, obj2: any) => obj1.position > obj2.position ? -1 : obj1.position < obj2.position ? 1 : 0);
  return messages;
}

const getNewMessages = (data: any, state: any) => {
  const { messages: oldMessages } = state;
  const { messages } = data;
  if (!messages || messages.length === oldMessages.length) {
    return oldMessages;
  }
  return getMessages(messages);
}

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case GET_CHANNEL_CONVESATION:
      return {
        ...state,
        id: payload.id,
        messages: getMessages(payload.messages),
        users: payload.users,
      }
    case GET_CHAT_DETAILS:
      return {
        ...state,
        details: payload,
      };
    case CLEAR_CHAT:
      return {
        ...INITIAL_STATE,
      }
    case SEND_MESSAGE:
      return {
        ...state,
        messages: payload.concat(state.messages),
      }
    case GET_NEW_MESSAGES:
      return {
        ...state,
        messages: getNewMessages(payload, state),
      }
    default:
      return state;
  }
}
