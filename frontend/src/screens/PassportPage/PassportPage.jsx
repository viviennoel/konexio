import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../redux/actions';
import Header from '../../components/Header';


class PassportPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "not selected",
            file: null,
            fileUrl: null,
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePicture = this.handleChangePicture.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Get user information
    componentDidMount() {
        const { user } = this.props;
        this.props.getOne(user.userId);
    }

    //Submit form (user modification)
    handleSubmit(event) {
        event.preventDefault();
        const { user, displayed } = this.props;
        let file = this.state.file === null ? displayed.items.picture : this.state.file;
        let status = this.state.status === "not selected" ? displayed.items.status : this.state.status;

        //Create user
        var newProfile = new FormData();
        newProfile.append("file", file);
        newProfile.append("firstname", displayed.items.firstname);
        newProfile.append("lastname", displayed.items.lastname);
        newProfile.append("email", displayed.items.email);
        newProfile.append("password", displayed.items.password);
        newProfile.append("status", status);
        newProfile.append("newsletter", displayed.items.newsletter);
        newProfile.append("cgu", true);

        //fetch the data to the backend        
        this.props.updatePicture(newProfile, user.userId);

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

    //Picture upload
    handleChangePicture(event) {
        this.setState({
            file: event.target.files[0],
            fileUrl: URL.createObjectURL(event.target.files[0])
        })
    }

    //Render the user's passport
    render() {
        const { user, users, displayed } = this.props;
        return (
            <div>
                <Header></Header>
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <h1 className="pt-5 font__Marcelus text-center">Voici votre passeport!</h1>
                    <p className="text-center">Voici donc le membre que vous recherchez chez Konexio!</p>
                    <h3 className="text-center">Accès aux informations: {user.status === "teacher" || user.status === "assistant"
                        ? <b>Authorisé</b> : <b>Seuls les membres de l'équipe pédagogique peuvent accéder à ces informations</b>}
                    </h3>
                    {displayed.changing && <em>Loading users...</em>}
                    {displayed.error && <span className="text-danger">ERROR: {displayed.error}</span>}
                    {displayed.items ?

                        //Thisplay the passport if the user is entitled
                        <div className="row preview__passport mb-5">
                            <div className="col-sm-6 d-flex flex-wrap text-center p-2">
                                <div className="m-auto"><img src={displayed.items.picture} title="profile picture" alt="profile picture" className="preview__img m-auto"></img></div>
                                <h2 className="text-center w-100 pt-5 font__Marcelus">{displayed.items.firstname} {displayed.items.lastname}</h2>
                                <p className="preview__text text-center mb-0">Ce membre de Konexio est enriegistré avec l'identifiant :</p>
                                <p className="preview__text text-center"><b>{displayed.items._id}</b></p>
                                <img className="passport__stamps m-auto" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620737978/stamps_yfolva.png" title="stamps" alt="stamps"></img>
                            </div>
                            <div className="col-sm-6 d-flex flex-wrap text-center p-2 border-start">
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
                                                {/*Status*/}
                                                <label className="col-12 mt-3 d-flex flex-wrap pt-5 pb-5">
                                                    Votre status :
                                                    {this.state.status === "not selected"
                                                        ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                                        : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                                                    <select className="ml-3 w-100" name="status" defaultValue="" onChange={this.handleChange}>
                                                        <option hidden value="">Mon status</option>
                                                        <option value="teacher">Professeur</option>
                                                        <option value="assistant">Professeur assistant</option>
                                                        <option value="student">Apprenant</option>
                                                    </select>
                                                </label>

                                                {/*Photo de profile*/}
                                                <label className="col-12 mt-3 d-flex flex-wrap pb-5">
                                                    Votre photo de profile :
                                                    {this.state.file === null
                                                        ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                                        : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                                                    <input type="file" className="w-100" onChange={this.handleChangePicture} />
                                                </label>

                                                {/*Envoyer le formulaire - Dernière vérification que les champs sont correctement remplis*/}
                                                <div className="col-12 mt-5 mb-5 text-center">
                                                    {this.state.status === "" && this.state.file === null
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
                            <div className="col-12 text-center">
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
    updatePicture: userActions.updatePicture
}

const connectedPassportPage = connect(mapState, actionCreators)(PassportPage);
export { connectedPassportPage as PassportPage };