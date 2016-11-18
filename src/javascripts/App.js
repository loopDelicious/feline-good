import React, { Component } from 'react';
import Admin from './admin.js';
import Workout from './workout.js';

class App extends Component {

    state = {
        admin: false
    };

    handleAdminToggle = () => {
        this.setState({
            admin: !this.state.admin
        })
    };

    render() {

        return (
            <div className="exercise-wrapper">

                <a href="#" onClick={this.handleAdminToggle}>{ this.state.admin ? "go to regular view" : "go to admin view" }</a>

                { this.state.admin ? <Admin /> : <Workout /> }

            </div>
        );
  };
}

export default App;
