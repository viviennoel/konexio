import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown'

class Header extends Component {

  render() {
    return (
      <div className="masthead">
        <div className="container w-100 row m-0">
          {window.innerWidth > 776 ?
            (<div className="masthead-title col-10 text-center d-flex justify-content-around m-auto">
              <div className="d-flex header__text-logo">
                <Link to="/" title="Home"><h1 className="header__logo">Konexio </h1></Link>
              </div>
              <Link to="/passport" title="Passport" className="m-auto header__text">Mon passeport</Link>
              <Link to="/" title="Home" className="m-auto header__text">Page d'accueil</Link>
              <Link to="/login" className="m-auto header__text">Déconnection</Link>
            </div>)
            :
            (<Dropdown 
              title={ <img src='https://res.cloudinary.com/viviennoel07/image/upload/v1620734628/menu_rlw3oe.png' id="button_drop" className="menu_icon m-auto" alt="website" /> } 
              items={
              [
                  {
                    id: 1,
                    value: <Link to="/" id="Home">Menu Principal</Link>,
                  },
                  {
                    id: 2,
                    value: <Link to="/login" id="About">Déconnexion</Link>,
                  },
                  {
                    id: 3,
                    value: <Link to="/passport" id="Web">Mon passport</Link>,
                  }
                ]
              } ></Dropdown>
            )
          }
        </div>
      </div>
    );
  }
}

export default Header;