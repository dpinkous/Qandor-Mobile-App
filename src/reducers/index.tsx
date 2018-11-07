import {combineReducers} from 'redux';
import {BaseRouter, TabBar} from '../TabBarNavigation';
import AuthReducer from './AuthReducer';
import ChannelReducer from './ChannelReducer';
import SearchReducer from './SearchReducer';
import ProfileReducer from './ProfileReducer';
import ChatReducer from './ChatReducer';
import TeamReducer from './TeamReducer';

export interface IAction {
  type: string;
  payload: any;
}

interface IAuth {
  access_token: string;
  userID: number;
  error: string;
  user: IProfile;
}

interface IProfile {
  image: string;
  username: string;
  position: string;
  company: string;
  id: number;
  rating: number;
  skills: string[];
  description: string;
  videos: object[];
}

export interface IChannel {
  id: number;
  users: object[];
  last_message_time: string;
  last_message_text: string;
  team: object;
  name: string;
  new: boolean;
}

interface ISearch {
  id: number;
  users: object[];
  last_message_time: string;
  last_message_text: string;
  messageID: number;
}

interface IChat {
  id: number;
  messages: object[];
  users: object[];
}

export interface IMember {
  id: number;
  username: string;
  position: string;
  image: string;
  user_type: string;
  email: string;
}

interface ITeam {
  name: string;
  users: IMember[];
  proposal: IMember[]
}

export interface IAppState {
  access_token: string;
  auth: IAuth;
  profile: IProfile;
  channels: IChannel[];
  search: ISearch[];
  chat: IChat;
  team: ITeam;
  baseRouting: object;
}

export default combineReducers({
  auth: AuthReducer,
  channels: ChannelReducer,
  search: SearchReducer,
  profile: ProfileReducer,
  chat: ChatReducer,
  team: TeamReducer,
  baseRouting: (state, action) => BaseRouter.router.getStateForAction(action, state),
  tabBarRouting: (state, action) => TabBar.router.getStateForAction(action, state)
});
