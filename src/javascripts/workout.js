import React, { Component } from 'react';
import $ from 'jquery';

class Workout extends Component {

    state = {
        exercises: [],
    };

    handleExerciseToggle = (index) => {
        this.state.exercises[index].complete = !this.state.exercises[index].complete;
        this.setState({
            exercises: this.state.exercises
        });
    };

    handleGetWorkout = () => {
        $.ajax({
            url: 'http://localhost:5000/exercises',
            type: 'get',
            contentType: "application/json",
            success: function(obj) {
                var concatted = this.state.exercises.concat(obj);
                this.setState({
                    exercises: concatted
                })
            }.bind(this)
        })
    };

    render() {

        var workoutLength = this.state.exercises.length;

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

        var completeCount = this.state.exercises.filter( (exercise) => {
            return exercise.complete === true;
        }).length;

        return (

            <div className="reg-user">
                <div className="workout cf">

                    <iframe src="http://cat.coach/cat.php" className='cat'/>

                    <div className="cf">
                        { workoutLength < 1 ?
                            <button id="get-workout" onClick={this.handleGetWorkout}>Make me sweat</button>
                            :
                            <div className="focus cf">
                                <div className="status">
                                    <span id="counter">
                                        {completeCount} out of {workoutLength} completed { workoutLength != 0 && workoutLength == completeCount ?
                                        <span id="congrats">HOORAY!!!</span> : null}
                                    </span>
                                </div>
                                <ul id="exercise-list">
                                    {exercises}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    };

}

export default Workout;
