import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {

    //Get all users
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    //Delete an user 
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user._id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      console.log('removing from state')
      console.log(state.items)
      console.log(action.id)
      return {
        items: state.items.filter(user => user._id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user._id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };

    //Get one specific user 
    case userConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETONE_SUCCESS:
      return {
        items: action.user
      };
    case userConstants.GETONE_FAILURE:
      return {
        error: action.error
      };

    //Update an user
    case userConstants.UPDATE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user._id === action.id
            ? { ...user, changing: true }
            : user
        )
      };
    case userConstants.UPDATE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items
      };
    case userConstants.UPDATE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user._id === action.id) {
            // make copy of user without 'deleting:true' property
            const { changing, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, changingError: action.error };
          }

          return user;
        })
      }; 
      
    default:
      return state
  }
}

