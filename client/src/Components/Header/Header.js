import React from 'react';
import "./Header.css";

import {Link} from 'react-router-dom';

class Header extends React.Component {

	render() {
		return (
			<div className="header">
				<div>Welcome John</div>
				<Link to="/register">
					<button className="header__buttonLogin">Login</button>
				</Link>
			</div>
		)
	}
}

export default Header;