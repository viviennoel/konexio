import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            status: "not selected",
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
        this.setState({
            file: event.target.files[0],
            fileUrl: URL.createObjectURL(event.target.files[0])
        })
    }

    //Profile creation
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { submitted, firstname, lastname, email, password, passwordConfirmation, status, newsletter, cgu, file, fileUrl } = this.state;

        //Create a formData
        var formData = new FormData();
        formData.append("file", file);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirmation);
        formData.append("status", status);
        formData.append("newsletter", newsletter);
        formData.append("cgu", cgu);

        //fetch the data to the backend after field check
        if (firstname &&
            lastname &&
            passwordConfirmation === password &&
            (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) &&
            file &&
            cgu &&
            (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            this.props.register(formData);
        }
    }

    //Render the form on the page
    render() {
        const { registering } = this.props;
        const { submitted, firstname, lastname, email, password, passwordConfirmation, status, newsletter, cgu, file, fileUrl } = this.state;
        return (
            <div className="register__welcome row">
                <div className="col-12 mb-5 text-center register__welcome-text">
                    <h1 className="pt-5">Bienvenue chez konexio!</h1>
                    <p>Vous allez maintenant créer votre profile sur notre plateforme!</p>
                </div>

                {/*The form to create an account*/}
                <div className="col-10 offset-1 col-md-6 offset-md-3 register__form">

                    <form onSubmit={this.handleSubmit} autoComplete="on">
                        {/*Firstname*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Prénom :
                            {firstname === ""
                                ? <img className="register__form-icons missing" id="missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="firstname" value={firstname} onChange={this.handleChange} />
                            {submitted && !firstname &&
                                <div className="help-block">Quel est votre prénom?</div>
                            }
                        </label>

                        {/*Familyname*/}
                        <label className="col-12 mt-3  d-flex flex-wrap">
                            Nom :
                            {lastname === ""
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="lastname" value={lastname} onChange={this.handleChange} />
                            {submitted && !lastname &&
                                <div className="help-block">Quel est votre nom?</div>
                            }
                        </label>

                        {/*Email*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Adresse Email :
                            {email === "" || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="email" value={email} onChange={this.handleChange} />
                            {submitted && (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false) &&
                                <div className="help-block">Cet E-mail n'est pas valide</div>
                            }
                        </label>

                        {/*Password*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Mot de passe:
                            {password === "" || !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="password" value={password} onChange={this.handleChange} />
                            {submitted && (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) &&
                                <div className="help-block">Le mot de passe doit contenir au moins 6 caractères avec une majuscule et une minuscule</div>
                            }
                        </label>

                        {/*Password Confirmation*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            confirmez le mot de passe :
                            {passwordConfirmation === "" || password !== passwordConfirmation
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input className="ml-3 w-100" type="text" name="passwordConfirmation" value={passwordConfirmation} onChange={this.handleChange} />
                            {submitted && (password !== passwordConfirmation) &&
                                <div className="help-block">Les mots de passe sont différents</div>
                            }
                        </label>

                        {/*Status*/}
                        <label className="col-12 mt-3 d-flex flex-wrap">
                            Votre status :
                            {status === "not selected"
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
                            {file === null
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input type="file" className="w-100" onChange={this.handleChangePicture} />
                            {submitted && (!file) &&
                                <div className="help-block">Une photo de profile est obligatoire!</div>
                            }
                        </label>

                        {/*Preview of the picture*/}
                        <div className="col-6 offset-3 mt-3 register__preview">
                            <img src={fileUrl} />
                        </div>

                        {/*Newsletter*/}
                        <label className="col-12 mt-3 d-flex">
                            Souscrire à la newsletter
                            <input type="checkbox" name="newletter" className="w-100" defaultChecked={newsletter} onChange={this.handleChange} />
                        </label>

                        {/*CGU*/}
                        <label className="col-12 mt-3 d-flex">
                            J'accepte les CGU de konexio
                            {cgu === false
                                ? <img className="register__form-icons missing" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620403589/writte_oofiko.png"></img>
                                : <img className="register__form-icons" src="https://res.cloudinary.com/viviennoel07/image/upload/v1620401634/valid_jvjkmg.png"></img>}
                            <input type="checkbox" name="cgu" className="w-100" defaultChecked={cgu} onChange={this.handleChange} />
                            {submitted && !cgu &&
                                <div className="help-block">L'acceptation des CGU est obligatoire!</div>
                            }
                        </label>

                        {/*Send form (fields validation)*/}
                        <div className="col-12 mt-5 mb-5 text-center">
                            {firstname === ""
                                || lastname === ""
                                || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false
                                || password !== passwordConfirmation
                                || !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
                                || file === null
                                || cgu === false
                                || newsletter === null
                                ? <button className="button__unabled">Envoyer</button>
                                : <button className="button__validation" type="submit">Envoyer</button>
                            }
                        </div>
                    </form>
                    <div className="pb-5 pt-5 w-100 text-center">
                        <Link to="/login" className="btn btn-link"><button className="btn btn-primary">Retour à la connexion</button></Link>
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