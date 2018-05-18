import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "../Components/Header/Header";
import RegisterPage from "../Components/RegisterPage/RegisterPage";

import './App.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="/" component={Header}/>
					<Route path="/register" component={RegisterPage}/>
				</div>
			</Router>
		)
	}
}

export default App;
