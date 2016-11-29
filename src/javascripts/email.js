import React, { Component } from 'react';
import $ from 'jquery';

class Email extends Component {

    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    isValid = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    handleForm = (e) => {
        e.preventDefault();

        var email = this.refs['new-email'].value;

        if (this.isValid(email)) {
            $.ajax({
                url: 'http://' + this.host + ':5500/email',
                type: 'post',
                contentType: "application/json",
                data: {
                    email: email,
                    exercises: this.props.exercises
                },
                success: () => {
                    this.refs['email_form'].reset();
                }
            });
        } else {
            alert('error');
        }
    };

    render() {
        return (
            <div className="email-block">
                <form id="email-input" ref="email_form" onSubmit={this.handleForm}>
                    <input className="email-text" ref="new-email" placeholder="email address" />
                    <button className="email-button" type="submit">Send this workout</button>
                </form>
            </div>
        )
    }
}

export default Email;
