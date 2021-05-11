import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../redux/actions';
import Header from '../../components/Header'

class PreviewPage extends React.Component {
    constructor(props) {
        super(props);

        //this.fileInput = React.createRef();
        this.state = {
            firstname: "",
            lastname: "",
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        //get the specific user when the component did mount
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        this.props.getOne(id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user, users, displayed } = this.props;
        const query = new URLSearchParams(this.props.location.search);
        const id = query.get('id')
        let firstname = this.state.firstname === "" ? displayed.items.firstname : this.state.firstname;
        let lastname = this.state.lastname === "" ? displayed.items.lastname : this.state.lastname;

        //Create user
        let newuser = {
            _id: displayed.items._id,
            firstname: firstname,
            lastname: lastname,
            email: displayed.items.email,
            password: "The password is not shared",
            status: displayed.items.status,
            picture: displayed.items.picture,
            newsletter: displayed.items.newsletter,
        }

        //fetch the data to the backend
        this.props.updateOne(newuser, id);
    }

    //Fields modification
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //Display the preview
    render() {
        const { user, users, displayed } = this.props;
        return (
            <div>
                <Header></Header>
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 preview__container">
                    <h1 className="pt-5 font__Marcelus text-center">Besoin de plus d'information?</h1>
                    <p className="text-center">Voici donc le membre que vous recherchez chez Konexio!</p>
                    <h3 className="text-center">Accès aux informations: {user.status === "teacher" || user.status === "assistant"
                        ? <b>Authorisé</b> : <b>Seuls les membres de l'équipe pédagogique peuvent accéder à ces informations</b>}
                    </h3>
                    {displayed.loading && <em>Loading users...</em>}
                    {displayed.error && <span className="text-danger">ERROR: {displayed.error}</span>}
                    {displayed.items && (user.status === "teacher" || user.status === "assistant") ?

                        //Thisplay the passport if the user is entitled
                        <div className="row preview__passport mb-5">
                            <div className="col-md-6 d-flex flex-wrap text-center p-2">
                                <div className="m-auto"><img src={displayed.items.picture} title="profile picture" alt="profile picture" className="preview__img m-auto"></img></div>
                                <h2 className="text-center w-100 pt-5 font__Marcelus">{displayed.items.firstname} {displayed.items.lastname}</h2>
                                <p className="preview__text text-center">Ce membre de Konexio est enriegistré avec l'identifiant :</p>
                                <p className="preview__text text-center"><b>{displayed.items._id}</b></p>
                                <img className="passport__stamps m-auto" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620737978/stamps_yfolva.png" title="stamps" alt="stamps"></img>
                            </div>
                            <div className="col-md-6 d-flex flex-wrap text-center p-2 border-start">
                                <h2 className="text-center w-100 pt-5 font__Marcelus">{displayed.items.firstname} est : <b>{displayed.items.status}</b></h2>
                                <p className="preview__text w-100 text-center">E-mail <b>{displayed.items.email}</b></p>
                                <p className="preview__text w-100 text-center">{displayed.items.newsletter ?
                                    "Souhaite"
                                    : "Ne souhaite pas"
                                } recevoir la Newsletter</p>

                                {/*Enable modification*/}
                                {user.changing ? <em> - Deleting...</em>
                                    : user.changingError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <div className="preview_editor w-100 p-5 text-center">
                                            <h2 className="pt-5 pb-5 font__Marcelus">Souhaitez vous modifier le nom de ce membre?</h2>

                                            <form onSubmit={this.handleSubmit} autoComplete="on">
                                                {/*Firstname*/}
                                                <label className="col-12 mt-3 d-flex flex-wrap pt-5 pb-5">
                                                    Prénom :
                                                {this.state.firstname === ""
                                                        ? <img className="register__form-icons missing" id="missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                                        : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                                                    <input className="ml-3 w-100" type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                                                </label>

                                                {/*Familyname*/}
                                                <label className="col-12 mt-3  d-flex flex-wrap pb-5">
                                                    Nom :
                                                {this.state.lastname === ""
                                                        ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                                        : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                                                    <input className="ml-3 w-100" type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                                                </label>

                                                {/*Envoyer le formulaire - Dernière vérification que les champs sont correctement remplis*/}
                                                <div className="col-12 mt-5 mb-5 text-center">
                                                    {this.state.firstname === "" && this.state.lastname === ""
                                                        ? <button className="button__unabled">Envoyer</button>
                                                        : <button className="button__validation" type="submit">Envoyer</button>
                                                    }
                                                </div>
                                            </form>
                                        </div>
                                }
                            </div>
                        </div>

                        //Display an error message if the user is not entitled
                        : <div className="row">
                            <div className="col-6 d-flex flex-wrap">
                                <p>Vous n'êtes pas authorisé à accéder à ces informations</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, displayed } = state;
    const { user } = authentication;
    return { user, users, displayed };
}

const actionCreators = {
    getOne: userActions.getOne,
    updateOne: userActions.update
}

const connectedPreviewPage = connect(mapState, actionCreators)(PreviewPage);
export { connectedPreviewPage as PreviewPage };