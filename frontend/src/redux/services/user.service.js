import config from 'config';
import { authHeader } from '../../helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    updatePicture
};

//Register a new user
function register(formData) {
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/api/users`, requestOptions)
        .then(handleResponse)
        .catch(function (error) {
            alert('TOKEN ERROR ' + error.message)
        });
}

//Login the user to his account
function login(email, password) {
    let user = {
        email: email,
        password: password,
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return fetch(`${config.apiUrl}/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

//Logout the user
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//Get all the users
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/users/usersGetAll`, requestOptions)
        .then(handleResponse)
        .catch(function (error) {
            console.log('GET ' + error.message)
        })
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/users/deleteUser/${id}`, requestOptions)
        .then(handleResponse);
}

//Get one user
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/users/userGet/${id}`, requestOptions)
        .then(handleResponse)
        .catch(function (error) {
            console.log('GET ' + error.message)
        })
}

//Update one user
function update(user, id) {
    let authUser = JSON.parse(localStorage.getItem('user'));
    
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': "multipart/form-data", 'Authorization': 'bearer ' + authUser.token }, 
        body: {user} 
    };

    return fetch(`${config.apiUrl}/api/users/userUpdate/${id}`, requestOptions)
        .then(handleResponse)
        .catch(function (error) {
            console.log('TOKEN ERROR ' + error.message)
        })
}

//Update one Picture user
function updatePicture(user, id) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: user
    };

    return fetch(`${config.apiUrl}/api/users/userUpdatePicture/${id}`, requestOptions)
        .then(handleResponse)
        .catch(function (error) {
            alert('TOKEN ERROR ' + error.message)
        });
}








function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.replace("/");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}