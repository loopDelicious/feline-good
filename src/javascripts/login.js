import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {

    state = {
        existingUser: true,
        error: false
    };

    host = window.location.hostname;

    handleToggle() {
        this.state.existingUser = !this.state.existingUser;
        this.setState({
            existingUser: this.state.existingUser
        });
    };

    handleForm = (e) => {
        e.preventDefault();

        var email = this.refs.email.value;
        var password = this.refs.password.value;

        $.ajax({
            url: this.state.existingUser ? 'http://' + this.host + ':5000/login' : 'http://' + this.host + ':5000/register',
            method: 'post',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: (data) => {

                if (data != null && JSON.parse(data)[0].admin) { this.props.adminCallback(); }
                this.setState({
                    existingUser: true
                });
                this.props.loginCallback();
            },
            error: (err) => {
                this.setState({
                    error: true
                });
            }
        })
    };

    render() {
        return (
            <div className="Login cf">
                <form onSubmit={this.handleForm.bind(this)}>
                    <span className="login-intro">{this.state.existingUser ? 'Log in' : 'Create an account' }</span>

                    <input className="text email" ref="email" placeholder="email address" autoFocus="true" />
                    <input className="text password" ref="password" placeholder="password" />

                    <span className="error-message">{this.state.error ? 'Sorry, please try again' : '' }</span>

                    <button className="button" type="submit">{this.state.existingUser ? 'Log in' : 'Create account'}</button>

                    <a className="login-link" onClick={this.handleToggle.bind(this)}>
                        {this.state.existingUser ? 'Create an account' : 'Have an account? Log in.'}
                    </a>
                </form>
            </div>
        );
    };
};

export default Login;
