import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from './dropdown.js';

// fitness {
//     exercises {
//         alias: pushups,
//         body: chest,
//         complete: false
//     }
// }

class App extends Component {

    state = {
        exercises: []
    };

    handleForm = (e) => {
        e.preventDefault();

        var data = {
            alias: this.refs['new-exercise'].value,
            body: this.refs['body-part'].value
        };

        $.ajax({
            url: 'http://localhost:5000',
            type: 'post',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(obj) {
                this.state.exercises.push(obj);
                this.setState({
                    exercises: this.state.exercises
                });
                this.refs['user_form'].reset();
            }.bind(this)
        })
    };

    handleExerciseToggle = (index) => {
        this.state.exercises[index].complete = !this.state.exercises[index].complete;
        this.setState({
            exercises: this.state.exercises
        });
    };

    handleGetWorkout = () => {
        $.ajax({
            url: 'http://localhost:5000',
            type: 'get',
            contentType: "application/json",
            success: function(exercises) {
                this.setState({
                    exercises: exercises
                })
            }.bind(this)
        })
    };

    render() {

        var workout_length = this.state.exercises.length;

        var exercises = this.state.exercises.map( (exercise, i) => {
           return (
               <li key={exercise._id.$oid}>
                   <label className="switch">
                       <input type="checkbox"
                              onChange={this.handleExerciseToggle.bind(null, i)}
                              className={exercise.complete ? 'complete' : 'not-complete'}
                              checked={exercise.complete}
                       />
                       <div className="slider round"></div>
                   </label>
                   {exercise.alias}
               </li>
           )
        });

        var complete_count = this.state.exercises.filter( (exercise) => {
            return exercise.complete === true;
        }).length;

        return (
            <div className="exercise-wrapper">

                <div className="workout cf">
                    <iframe src="http://cat.coach/cat.php" className='cat' />
                    { workout_length < 1 ?
                        <button id="get-workout" onClick={this.handleGetWorkout}>Make me sweat</button>
                        :
                        <ul id="exercise-list">
                            {exercises}
                        </ul>
                    }
                </div>

                <div className="admin cf">
                    <form id="exercise-input" ref="user_form" onSubmit={this.handleForm}>
                        <input className="exercise-text" ref="new-exercise" placeholder="Add a move" autoFocus="true" />
                        <Dropdown />
                        <button className="exercise-button" type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
  };
}

export default App;
