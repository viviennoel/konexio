import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class PreviewPage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;

        return (
            <div className="col-md-10 col-md-offset-1">
                <h1>Bienvenue {user.firstname}!</h1>
                <p>Vous rejoignez la grande équipe de Konexio!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <div className="row">
                    <ul className="col-12 d-flex flex-wrap">
                        {users.items.map((user, index) =>
                        <li>
                            <Link to="/preview" key={user.id} className="col-3">
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <button onClick={this.handleDeleteUser(user.id)}>Delete</button></span>
                                }
                            </Link>
                        </li>
                        )}
                    </ul>
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

const connectedPreviewPage = connect(mapState, actionCreators)(PreviewPage);
export { connectedPreviewPage as PreviewPage };