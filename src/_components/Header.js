import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      	<div className="masthead">
			<div className="container w-100 row">
			  <h3 className="masthead-title col-10 text-center d-flex justify-content-around m-auto">
                <div className="d-flex header__text-logo">
                <Link to="/" title="Home"><h1>Konexio </h1></Link>
                    <p className="m-auto">Formations digitales!</p>
                </div>
                <Link to="/passport" title="Passport" className="m-auto header__text">Mon passeport</Link>
			    <Link to="/" title="Home" className="m-auto header__text">Page d'accueil</Link>
			    
			  </h3>
			</div>
		</div>
    );
  }
}

export default Header;