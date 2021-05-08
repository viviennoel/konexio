import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Sidebar extends Component {

  constructor(props){
	super(props);
  }

  render() {

  	const {version,user} = this.props;

    return (

    	<div className="sidebar">

		  <div className="sidebar-item">
		    <p>Votre interface Konexio!</p>
		    <p>Bienvenue <b className="user-name">{user.name}</b></p>
		  </div>

		  <nav className="sidebar-nav">
		    <Link to="/" className="sidebar-nav-item" activeClassName="active">Page d'accueil<span className="nav-note">[static]</span></Link>
		    <Link to="/register" className="sidebar-nav-item" activeClassName="active">Nouvel utilisateur<span className="nav-note">[api]</span></Link>
		    <Link to="/users" className="sidebar-nav-item" activeClassName="active">Utilisateurs<span className="nav-note">[stateful]</span></Link>
		    <Link to="/passport" className="sidebar-nav-item" activeClassName="active">Modifier mon profile<span className="nav-note">[stateful]</span></Link>
		    <span className="sidebar-nav-item"><span className="nav-note version">{`Currently version ${version}`}</span></span>
		  </nav>

		  <div className="sidebar-item sidebar-footer">
		    <p>Test technique Vivien NOEL</p>
		  </div>

		</div>
    );
  }
}

export default Sidebar;