import { userConstants } from '../constants';

export function displayed(state = {}, action) {
    switch (action.type) {

        //Get one specific user 
        case userConstants.GETONE_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETONE_SUCCESS:
            return {
                items: action.displayed
            };
        case userConstants.GETONE_FAILURE:
            return {
                error: action.error
            };

        //Update an user
        case userConstants.UPDATE_REQUEST:
            // add 'changing:true' property to user being modified
            return {
                changing: true
            };
        case userConstants.UPDATE_SUCCESS:
            // modify state of user
            return {
                items: action.displayed
            };
        case userConstants.UPDATE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return { user, changingError: action.error }


        //Update an user's profile with Picture
        case userConstants.UPDATEPICTURE_REQUEST:
            // add 'changing:true' property to user being modified
            return {
                changing: true
            };
        case userConstants.UPDATEPICTURE_SUCCESS:
            // modify state of user
            return {
                items: action.displayed
            };
        case userConstants.UPDATEPICTURE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return { user, changingError: action.error }



        default:
            return state
    }
}