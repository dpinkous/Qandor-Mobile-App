import {
  SEARCH_CHANNELS,
  SEARCH_RESET,
} from '../actions/types';
import {IAction} from './';
import { getTime } from '../components/Utils';

const INITIAL_STATE = new Array;

const getSearchedChannels = (massages: any) => {
  let conversations = new Array();
  massages.map((message: any) => {
    const {
      id: messageID,
      conversation,
      user,
      text,
      created_at,
    } = message;

    const channel = {
      id: conversation,
      users: [user],
      last_message_text: text,
      last_message_time: created_at,
      messageID: messageID,
    }

    conversations.push(channel);
  });

  return conversations;
}

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case SEARCH_CHANNELS:
      return [
        ...getSearchedChannels(payload),
      ];
    case SEARCH_RESET:
      return [];
    default:
      return [...state];
  }
};
