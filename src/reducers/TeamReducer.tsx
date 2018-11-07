import {IAction} from './';
import {
  GET_TEAM,
  ADD_MEMBER,
  SEARCH_NEW_MEMBER,
} from '../actions/types';

const INITIAL_STATE = {
  name: "",
  users: new Array(),
  proposal: new Array(),
}

const addMember = (users: any, newUser: any) => {
  users.push(newUser);
  return users;
}

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case GET_TEAM:
      return {
        ...state,
        name: payload.name,
        users: payload.users,
      }
    case ADD_MEMBER:
      return {
        ...state,
        users: addMember(state.users, payload.user),
      }
    case SEARCH_NEW_MEMBER:
      return {
        ...state,
        proposal: payload,
      }
    default:
      return state;
  }
}
