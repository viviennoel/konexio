import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../_components/Header'

import { userActions } from '../_actions';

class PassportPage extends React.Component {
    componentDidMount() {
        //get the specific user when the component did mount
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        this.props.getOne(id);
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;

        return (
            <div className="">
                <h1>Bienvenue {user.firstname}!</h1>
                <p>Voici donc le membre que vous recherchez chez Konexio!</p>
                <h3>Accès aux informations: { user.status === "teacher" || user.status === "assistant" 
                    ? <b>Authorisé</b> : <b>Seuls les membres de l'équipe pédagogique peuvent accéder à ces informations</b>}
                </h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items && (user.status === "teacher" || user.status === "assistant") ?

                //Thisplay the passport if the user is entitled
                <div className="row preview__passport">
                    <div className="col-6 d-flex flex-wrap text-center p-2">
                        <div className="m-auto"><img src={users.items.picture} title="profile picture" alt="profile picture" className="preview__img m-auto"></img></div>
                        <h2 className="text-center w-100 pt-5">{users.items.firstname} {users.items.lastname}</h2>
                        <p className="preview__text text-justify">Ce membre de Konexio est enriegistré avec l'identifiant <b>{users.items._id}</b></p>
                    </div>
                    <div className="col-6 d-flex flex-wrap text-center p-2 border-start">
                        <h2 className="text-center w-100 pt-5">{users.items.firstname} est : <b>{users.items.status}</b></h2>
                        <p className="preview__text text-justify">E-mail <b>{users.items.email}</b></p>
                        <p>{users.items.newsletter ? 
                            "Souhaite"
                            : "Ne souhaite pas"
                        } recevoir la Newsletter</p>
                    </div>
                </div>

                //Display an error message if the user is not entitled
                : <div className="row">
                    <div className="col-6 d-flex flex-wrap">
                        <p>Vous n'êtes pas authorisé à accéder à ces informations</p>
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
    getOne: userActions.getOne,
    deleteUser: userActions.delete
}

const connectedPassportPage = connect(mapState, actionCreators)(PassportPage);
export { connectedPassportPage as PassportPage };