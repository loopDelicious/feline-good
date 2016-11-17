import React, { Component } from 'react';

class List extends Component {

    render() {

        return (

            <ul id="all-exercise-list">

                {this.props.allExercises.map( (exercise, i) => {
                    return (
                        <li key={exercise._id.$oid}>
                            {exercise.alias}
                            <a href="#" onClick={this.props.edit.bind(null, exercise._id.$oid)}>edit</a>
                            <a href="#" onClick={this.props.delete.bind(null, exercise._id.$oid)}>delete</a>
                        </li>
                    )})
                }
            </ul>

        )
    };
}

export default List;
