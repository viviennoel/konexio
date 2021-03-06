import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header'
import { userActions } from '../../redux/actions'

class HomePage extends React.Component {

    //Get all users
    componentDidMount() {
        this.props.getUsers();
    }

    //Handle deletion
    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    //Display the homepage
    render() {
        const { user, users } = this.props;
        return (
            <div>
                 <Header></Header>
            <div className="col-12 text-center homepage__container">
                <h1 className="pt-5 font__Marcelus homepage__welcome">Bienvenue sur votre espace personnel!</h1>
                <p className="homepage__welcome-subtitle">Vous rejoignez la grande équipe de Konexio!</p>
                <div className="homepage__banner">
                    <div className="homepage__banner-image"></div>
                </div>
                <h3 className="pb-md-5 pb-0 mb-md-5 mb-2 homepage__banner-subtitle">Voici tous nos membre enregistrés:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}

                {/*If the list is correctly loaded, the page display all the profiles*/}
                {users.items &&
                    <div className="row">
                        <div className="d-flex flex-wrap">
                            {users.items.map((user, index) =>
                                <div key={index} className="col-6 col-md-4 m-auto mb-5 homepage__profile">
                                    {/*This is for the picture*/}
                                    <Link to={"/users?id=" + user._id}>
                                        <div className="m-auto"><img src={user.picture} title="profile picture" alt="profile picture" className="homepage__profile-image m-auto"></img></div>
                                    </Link>
                                    {/*And this for the label*/}
                                    <div className="homepage__profile-label">
                                        <div className="text-center d-block w-100 homepage__profile-text">{user.firstname + ' ' + user.lastname}</div>
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : this.props.user.status === "teacher" ?
                                                    <span> - <button id="deleteUser" onClick={this.handleDeleteUser(user._id)}><img src="https://res.cloudinary.com/viviennoel07/image/upload/v1620499973/trash_gc9se1.png" title="delete" alt="delete"></img> Supprimer</button></span>
                                                        : <span></span>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
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