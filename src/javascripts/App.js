import React, { Component } from 'react';
import Admin from './admin.js';
import Workout from './workout.js';
import Login from './login.js';

class App extends Component {

    state = {
        admin: false,
        loggedIn: false
    };

    userLoggedIn = () => {
        this.setState({
            loggedIn: true,
        });
    };

    handleLogout = () => {
        this.setState({
            loggedIn: false
        });
    };

    handleAdminToggle = () => {
        this.setState({
            admin: !this.state.admin
        })
    };

    render() {

        return (
            <div className="exercise-wrapper cf">

                { this.state.loggedIn ?
                    <div className="when-logged-in">

                        <a href="#" onClick={this.handleLogout}>Log Out</a>
                        <a href="#" onClick={this.handleAdminToggle}>{ this.state.admin ? "go to regular view" : "go to admin view" }</a>
                    </div>
                :
                    <Login loginCallback={this.userLoggedIn} />
                }

                { this.state.admin ? <Admin /> : <Workout /> }

            </div>
        );
  };
}

export default App;
