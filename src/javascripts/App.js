import React, { Component } from 'react';
import Admin from './admin.js';
import Workout from './workout.js';
import Login from './login.js';

class App extends Component {

    state = {
        admin: false,
        adminToggle: false,
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

    userAdmin = () => {
        this.setState({
            admin: true
        });
    };

    handleAdminToggle = () => {
        this.setState({
            adminToggle: !this.state.adminToggle
        })
    };

    render() {

        return (
            <div className="exercise-wrapper cf">

                { this.state.loggedIn ?
                    <div className="when-logged-in">

                        <a href="#" onClick={this.handleLogout}>Log Out</a>
                        <br />
                        { this.state.admin ?
                            <a href="#" onClick={this.handleAdminToggle}>{ this.state.adminToggle ? "go to regular view" : "go to admin view" }</a>
                            :
                            null
                        }
                    </div>
                    :
                    <Login loginCallback={this.userLoggedIn} adminCallback={this.userAdmin} />
                }

                { this.state.adminToggle ? <Admin /> : <Workout /> }

            </div>
        );
  };
}

export default App;
