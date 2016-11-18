import React, { Component } from 'react';
import Input from './input.js';

class List extends Component {

    currentlyEditing = null;

    state = {
        showToggle: false
    };

    handleEditToggle = (oid) => {

        this.currentlyEditing = oid;
        this.setState({
            showToggle: !this.state.showToggle
        });

    };

    render() {

        return (

            <ul id="all-exercise-list">

                {this.props.allExercises.map( (exercise) => {

                    return (
                        <li key={exercise._id.$oid}>

                            <span>{exercise.title} . . . {exercise.benefit}</span>

                            <a href="#" onClick={this.handleEditToggle.bind(null, exercise._id.$oid)}>edit</a>

                            <a href="#" onClick={this.props.delete.bind(null, exercise._id.$oid)}>delete</a>

                            { this.currentlyEditing === exercise._id.$oid ?

                                <Input
                                onSubmit={this.props.edit}
                                editing={this.currentlyEditing}
                                />

                            : null }

                        </li>
                    )})
                }
            </ul>
        )
    };
}

export default List;
