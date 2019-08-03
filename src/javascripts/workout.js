import React, { Component } from 'react'
import $ from 'jquery'
import Email from './email.js'

class Workout extends Component {
  state = {
    exercises: []
  };

  host = window.location.hostname;

  shuffle = a => {
    for (let i = a.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }
    return a
  };

  handleExerciseToggle = index => {
    this.state.exercises[index].complete = !this.state.exercises[index]
      .complete
    this.setState({
      exercises: this.state.exercises
    })
  };

  handleGetWorkout = () => {
    $.ajax({
      url: 'http://' + this.host + ':5500/all',
      type: 'get',
      contentType: 'application/json',
      success: objList => {
        var shuffled = this.shuffle(objList)
        var firstFive = shuffled.slice(0, 5)
        var concatted = this.state.exercises.concat(firstFive)
        this.setState({
          exercises: concatted
        })
      }
    })
  };

  render () {
    var workoutLength = this.state.exercises.length

    var exercises = this.state.exercises.map((exercise, i) => {
      return (
        <li key={exercise._id.$oid}>
          <label className="switch">
            <input
              type="checkbox"
              onChange={this.handleExerciseToggle.bind(null, i)}
              className={exercise.complete ? 'complete' : 'not-complete'}
              checked={exercise.complete}
            />
            <div className="slider round"></div>
          </label>
          {exercise.title}
        </li>
      )
    })

    var completeCount = this.state.exercises.filter(exercise => {
      return exercise.complete === true
    }).length

    return (
      <div className="workout cf">
        <iframe src="http://cat.coach/cat.php" className="cat" />

        <div className="cat-hero cf">
          {workoutLength < 1 ? (
            <button id="get-workout" onClick={this.handleGetWorkout}>
              Make me sweat
            </button>
          ) : (
            <div className="focus cf">
              <div className="status">
                <div id="counter">
                  {completeCount} out of {workoutLength} completed{' '}
                  {workoutLength !== 0 && workoutLength === completeCount ? (
                    <span id="congrats">HOORAY!!!</span>
                  ) : null}
                  <br />
                </div>
              </div>
              <ul id="exercise-list">{exercises}</ul>
              <Email exercises={this.state.exercises} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Workout
