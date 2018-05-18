import React from 'react';
import "./RegisterPage.css";

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			passwordConfirm: '',
			ethAccount: '',
			ethAccountConfirm: '',
			nimAccount: '',
			nimAccountConfirm: '',
			passwordMismatch: false,
			ethAccountMismatch: false,
			nimAccountMismatch: false
		};
	}

	onSignUp = event => {
		if (this.validateEmail(this.state.email)) {
			let a = this;
			event.preventDefault();
			fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
					ethaccount: this.state.ethAccount,
					minaccount: this.state.nimAccount
				}),
				credentials: "include",
				headers: new Headers({
					"Content-Type": "application/json"
				})
			})
				.then(res => res.json())
				.then(response => {
					console.log(response);
				});
			// 			if (response.success) {
			// 				// a.props.setUserData(response);
			// 				// a.props.toggleLoginRegisterModal();
			// 				// a.props.history.push("/");
			// 			} else {
			// 				a.setState({ statusCreateAccount: response.error.message });
			// 			}
			// 		});
			// } else {
			// 	this.setState({ statusCreateAccount: "Email is not in a valid format" });
			// }
		}
	};


	validateEmail = email => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	checkForSame = () => {
		if(this.state.password !== this.state.passwordConfirm) {
			this.setState({passwordMismatch: true});
		} else {
			this.setState({passwordMismatch: false});
		}
		if(this.state.ethAccount !== this.state.ethAccountConfirm) {
			this.setState({ethAccountMismatch: true});
		} else {
			this.setState({ethAccountMismatch: false});
		}
		if(this.state.nimAccount !== this.state.nimAccountConfirm) {
			this.setState({nimAccountMismatch: true});
		} else {
			this.setState({nimAccountMismatch: false});
		}
	};

	onInputChange = () => {
		this.setState({
			email: this.email.value,
			password: this.password.value,
			passwordConfirm: this.passwordConfirm.value,
			ethAccount: this.ETHAccount.value,
			ethAccountConfirm: this.confirmethAccount.value,
			nimAccount: this.nimAccount.value,
			nimAccountConfirm: this.confirmNIMAccount.value
		},this.checkForSame);
	};

	render() {
		return (
			<div>
				<h1 className="registerContainer__Title">Register</h1>
				<form className="registerContainer">
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>Email</label>
						</div>
						<input type="email" name="email" ref={ref => this.email = ref} onChange={this.onInputChange} required/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>Password</label>
						</div>
						<input type="password" name="password" ref={ref => this.password = ref} value={this.state.password} onChange={this.onInputChange} required placeholder="at least 6 characters"/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>Confirm Password</label>
						</div>
						{this.state.passwordMismatch && <p className="registerContainer__error">passwords do not match</p>}
						<input type="password" name="confirmpassword" ref={ref => this.passwordConfirm = ref} value={this.state.passwordConfirm}  onChange={this.onInputChange} required placeholder="at least 6 characters"/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>ETH Account</label>
						</div>
						<input type="text" name="ethAccount" ref={ref => this.ETHAccount = ref} value={this.state.ethAccount} onChange={this.onInputChange} required/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>Confirm ETH Account</label>
						</div>
						{this.state.ethAccountMismatch && <p className="registerContainer__error">ETH accounts do not match</p>}
						<input type="text" name="confirmethAccount" ref={ref => this.confirmethAccount = ref} value={this.state.ethAccountConfirm} onChange={this.onInputChange} required/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>NIM Account</label>
						</div>
						<input type="text" name="nimAccount" ref={ref => this.nimAccount = ref} value={this.state.nimAccount} onChange={this.onInputChange} required/>
					</div>
					<div className="registerContainer__input">
						<div className="registerContainer__label">
							<label>Confirm NIM Account</label>
						</div>
						{this.state.nimAccountMismatch && <p className="registerContainer__error">NIM accounts do not match</p>}
						<input type="text" name="confirmNIM-Account" ref={ref => this.confirmNIMAccount = ref} value={this.state.nimAccountConfirm} onChange={this.onInputChange} required/>
					</div>
					<p className="registerContainer__notes">ETH and NIM accounts are editable inside user settings</p>
					<button className="registerContainer__signUpButton" onClick={this.onSignUp}>Sign Up</button>
				</form>
			</div>
		)
	}
}

export default RegisterPage;