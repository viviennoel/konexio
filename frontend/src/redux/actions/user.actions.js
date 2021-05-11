import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../../helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete,
    getOne,
    update,
    updatePicture
};

//Login the user
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

//logout the user
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

//Register the user
function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                response => { 
                    dispatch(success(response));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successfully done'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            ).catch(function (error) {
                alert(' error ' + error)
            });
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

//Get all the users of konexio
function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => {
                    dispatch(success(users))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript!
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => {
                    dispatch(success(id))
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

//Get one specific user of Konexio
function getOne(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                displayed => dispatch(success(displayed)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETONE_REQUEST } }
    function success(displayed) { return { type: userConstants.GETONE_SUCCESS, displayed } }
    function failure(error) { return { type: userConstants.GETONE_FAILURE, error } }
}

//Update an user
function update(user, id) {
    return dispatch => {
        dispatch(request());

        userService.update(user, id)
            .then(
                displayed => { 
                    dispatch(success(user));
                    dispatch(alertActions.success("User have been modified successfully"));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(displayed) { return { type: userConstants.UPDATE_REQUEST, displayed } }
    function success(displayed) { return { type: userConstants.UPDATE_SUCCESS, displayed } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

//Update an user with it's picture
function updatePicture(user, id) {
    return dispatch => {
        dispatch(request());

        userService.updatePicture(user, id)
            .then(
                displayed => { 
                    dispatch(success(displayed));
                    dispatch(alertActions.success("User picture have been modified successfully"));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(displayed) { return { type: userConstants.UPDATEPICTURE_REQUEST, displayed } }
    function success(displayed) { return { type: userConstants.UPDATEPICTURE_SUCCESS, displayed } }
    function failure(error) { return { type: userConstants.UPDATEPICTURE_FAILURE, error } }
}