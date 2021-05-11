import React, { Component } from 'react';
import FlyingKonexio from './FlyingKonexio';

class Footer extends Component {

  render() {
    return (
      <div className="footer text-center row m-0">
        <div className="col-6 m-auto">
          <h2 className="pt-5">Test technique réalisé par Vivien NOEL</h2>
          <p>Rendu le 12 Mai 2021</p>
          <p>Mission de formateur en développement web chez Konexio</p>
        </div>
        <div className="col-6">
          <FlyingKonexio></FlyingKonexio>
        </div>

      </div>
    );
  }
}

export default Footer;