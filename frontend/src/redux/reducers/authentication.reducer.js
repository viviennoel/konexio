import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    //login
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};

    //Update an user's profile with Picture
    case userConstants.UPDATEPICTURE_REQUEST:
      // add 'changing:true' property to user being modified
      return {
        loggingIn: true,
        changing: true,
        user: action
      };
    case userConstants.UPDATEPICTURE_SUCCESS:
      // modify state of user
      return {
        loggingIn: true,
        changing: true,
        user: action.displayed
      };
    case userConstants.UPDATEPICTURE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return { user, changingError: action.error }
    default:
      return state
  }
}