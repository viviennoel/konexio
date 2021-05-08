import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render() {
  	const user = this.props.user;

    return (
      	<div className="masthead">
			<div className="container w-100 row">
			  <h3 className="masthead-title col-10 text-center">
			    <a href="/" title="Home">Konexio</a>
			    <small>Formations digitales!</small>
				<span className="counter-indicator">{`Counter : ${user}`}</span>
				{console.log(JSON.stringify(user))}
			  </h3>
			  <div className="col-2 auth">
				<button href="/register">Inscription</button>
			  </div>
			</div>
		</div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string.isRequired
};

export default Header;