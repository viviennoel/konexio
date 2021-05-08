import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        console.log(users);
        console.log(user);
        return (
            <div className="col-12 col-lg-10 offset-lg-1 text-center">
                <h1>Bienvenue {user.firstname}!</h1>
                <p>Vous rejoignez la grande équipe de Konexio!</p>
                <h3 className="pb-5 mb-5">Voici tous nos membre enregistrés:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                
                {/*If the list is correctly loaded, the page display all the profiles*/}
                {users.items &&
                <div className="row">
                    <div className="d-flex flex-wrap">
                        {users.items.map((user, index) =>
                        <div key={index} className="col-6 col-md-4 m-auto mb-5 homepage__profile">
                            <Link to="/preview">
                                {/*This is for the picture*/}
                                <div className="m-auto"><img src={user.picture} title="profile picture" alt="profile picture" className="homepage__profile-image m-auto"></img></div>
                                
                                {/*And this for the label*/}
                                <div className="Homepage_profile-label">
                                    <div className="text-center d-block w-100 homepage__profile-text">{user.firstname + ' ' + user.lastname}</div>
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <button onClick={this.handleDeleteUser(user.id)}><img src="https://res.cloudinary.com/viviennoel07/image/upload/v1620499973/trash_gc9se1.png" title="delete" alt="delete"></img> Supprimer</button></span>
                                    }
                                </div>
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };