import {IAction} from './';
import {
  GET_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  id: null,
  position: '',
  company: '',
  rating: null,
  skills: [],
  description: '',
  videos: [],
  phoneNumber: '',
  email: '',
}

const getRating = (score: number, votesNo: number) => {
  if (score === 0 || votesNo === 0) {
    return 0;
  }
  return (score / votesNo).toFixed(1) || 0;
}

const getUsername = (fullName: string, username: string) => {
  return fullName || username || '';
}

const getPosition = (position: string) => {
  if (!position) return '';
  const pasitionArray = position.split('_');
  pasitionArray.map((str: string, index: number) => {
    pasitionArray[index] = str.charAt(0).toUpperCase() + str.slice(1);
  });
  const newPosition = pasitionArray.join(' ')
  return newPosition;
}

export default (state = INITIAL_STATE, action: IAction) => {
  let { payload } = action;
  switch (action.type) {
    case GET_PROFILE:
      console.log('GET_PROFILE: ', payload);
      return {
        ...state,
        image: payload.user.image,
        username: getUsername(payload.full_name, payload.user.username),
        position: getPosition(payload.position),
        company: payload.user.company,
        id: payload.user.id,
        rating: getRating(payload.score, payload.number_of_votes),
        skills: payload.skills,
        description: payload.description,
        videos: payload.videos || [],
        phoneNumber: payload.user.phone_number,
        email: payload.user.email,
      };
    case CLEAR_PROFILE:
      return {...INITIAL_STATE}
    default:
      return state;
  }
}
