import React, { Component } from 'react';
import Dropdown from './dropdown.js';

class Input extends Component {

    state = {
        muscle: '',
    };

    handleNewExercise = (muscleValue) => {
        this.setState({
            muscle: muscleValue
        })
    };

    handleForm = (e) => {
        e.preventDefault();

        var data = {
            _id: this.props.editing ? this.props.editing : null,
            title: this.refs['new-exercise'].value,
            benefit: this.state.muscle
        };

        this.props.editing ? this.props.onSubmit(data) : this.props.add(data);
        this.refs['user_form'].reset();
    };

    render() {
        return (
            <div className="input cf">
                <form id="exercise-input" ref="user_form" onSubmit={this.handleForm}>
                    <input className="exercise-text" ref="new-exercise" placeholder={this.props.editing ? "Update this move" : "Add a new move"} autoFocus="true" />
                    <Dropdown onSelectMuscle={this.handleNewExercise} />
                    <button className="exercise-button" type="submit">{this.props.editing ? "Edit": "Add"}</button>
                </form>
            </div>
        )
    };
}

export default Input;
