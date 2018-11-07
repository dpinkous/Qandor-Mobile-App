import {
  GET_CHANNELS,
  READ_NEW,
} from '../actions/types';
import { IAction } from './';
import { getTime } from '../components/Utils';

const INITIAL_STATE = new Array;

const readNew = (channels: any, channelID: number) => {
  channels.map((channel: any) => {
    if (channel.channelID === channelID) {
      channel.new = false;
    }
  });
  return channels;
}

const getChannels = (channels: any) => {
  channels.map((channel: any) => {
    if (!channel.last_message_time) {
      channel['last_message_text'] = "You haven't had conversation with this person yet"
    }
  });
  return channels;
}

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case GET_CHANNELS:
      return [
        ...getChannels(payload),
      ];
    case READ_NEW:
      return [
        ...readNew(state, payload),
      ]
    default:
      return [...state];
  }
};
