import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        //this.fileInput = React.createRef();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            status: "",
            newsletter: false,
            cgu: false,
            file: null,
            fileUrl: null,
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePicture = this.handleChangePicture.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Fields modification
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //Picture upload
    handleChangePicture(event) {
        console.log(event.target.files[0]);
        this.setState({
            file: event.target.files[0],
            fileUrl: URL.createObjectURL(event.target.files[0])
        })
    }

    //Profile creation
    handleSubmit(event) {
        event.preventDefault();

        //Warning & Verifications - More custom than the simple 'required'
        if (this.state.firstname === "") {
            alert('Bonjour! Quel est votre prénom?')
        } else if (this.state.lastname === "") {
            alert('Bonjour! Quel est votre nom de famille?')
        } else if (this.state.passwordConfirmation !== this.state.password) {
            alert('Attention! Les mots de passe no correspondent pas!')
        } else if (!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            alert("Le n'est pas assez sécurisé! Il faut au moins une majuscule, une minuscule et au moins 6 caractères!")
        } else if (this.state.file === null) {
            alert('Bonjour! Une photo de profile est requise pour créer un compte.')
        } else if (this.state.status === "") {
            alert('Bonjour! Pourrions nous vous demander quel est votre status Konexio?')
        } else if (this.state.cgu === false) {
            alert('Bonjour! Vous devez accepter les cgu pour créer un compte.')
        } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)) {
            //Create user
            var formData = new FormData();
            formData.append("file", this.state.file);
            formData.append("firstname", this.state.firstname);
            formData.append("lastname", this.state.lastname);
            formData.append("email", this.state.email);
            formData.append("password", this.state.password);
            formData.append("passwordConfirm", this.state.passwordConfirmation);
            formData.append("status", this.state.status);
            formData.append("newsletter", this.state.newsletter);
            formData.append("cgu", this.state.cgu);

            //fetch the data to the backend        
            this.props.register(formData);
        } else {
            alert("Votre mail n'a pas le bon format.")
        }
    }

    //Render the form on the page
    render() {
        const { registering } = this.props;
        return (
            <div className="register__welcome row">
                <div className="col-12 mb-5 text-center">
                    <h1>Bienvenue chez konexio!</h1>
                    <p>Vous allez maintenant créer votre profile sur notre plateforme!</p>
                </div>

                {/*The form to create an account*/}
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 register__form">

                    <form onSubmit={this.handleSubmit} autoComplete="on">
                        {/*Firstname*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Prénom :
              {this.state.firstname === ""
                                ? <img className="register__form-icons missing" id="missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                        </label>

                        {/*Familyname*/}
                        <label className="col-12 mt-3  d-flex flex-wrap">
                            Nom :
              {this.state.lastname === ""
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                        </label>

                        {/*Email*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Adresse Email :
              {this.state.email === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) === false
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </label>

                        {/*Password*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Mot de passe:
              {this.state.password === "" || !this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                        </label>

                        {/*Password Confirmation*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            confirmez le mot de passe :
              {this.state.passwordConfirmation === "" || this.state.password !== this.state.passwordConfirmation
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} />
                        </label>

                        {/*Status*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Votre status :
              {this.state.status === ""
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
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Votre photo de profile :
              {this.state.file === null
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input type="file" className="w-100" onChange={this.handleChangePicture} />
                        </label>

                        {/*Preview of the picture*/}
                        <div className="col-6 offset-3 mt-3 register__preview">
                            <img src={this.state.fileUrl} />
                        </div>

                        {/*Newsletter*/}
                        <label className="col-12 mt-3 d-flex">
                            Souscrire à la newsletter
              <input type="checkbox" name="newletter" className="w-100" defaultChecked={this.state.newsletter} onChange={this.handleChange} />
                        </label>

                        {/*CGU*/}
                        <label className="col-12 mt-3 d-flex">
                            J'accepte les CGU de konexio
              {this.state.cgu === false
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input type="checkbox" name="cgu" className="w-100" defaultChecked={this.state.cgu} onChange={this.handleChange} />
                        </label>

                        {/*Envoyer le formulaire
            Dernière vérification que les champs sont correctement remplis*/}
                        <div className="col-12 mt-5 mb-5 text-center">
                            {this.state.firstname === ""
                                || this.state.lastname === ""
                                || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) === false
                                || this.state.password !== this.state.passwordConfirmation
                                || !this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
                                || this.state.status === ""
                                || this.state.file === null
                                || this.state.cgu === false
                                || this.state.newsletter === null
                                ? <button className="button__unabled">Envoyer</button>
                                : <button className="button__validation" type="submit">Envoyer</button>
                            }
                        </div>
                    </form>
                    <div>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </div>
            </div>


        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };