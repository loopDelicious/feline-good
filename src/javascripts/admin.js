import React, { Component } from 'react';
import $ from 'jquery';
import Dropdown from './dropdown.js';
import List from './list.js';

class Admin extends Component {

    state = {
        allExercises: [],
        muscle: '',
    };

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:5000/all',
            type: 'get',
            success: function(obj) {
                var concatted = this.state.allExercises.concat(obj);
                this.setState({
                    allExercises: concatted
                })
            }.bind(this)
        })
    };

    handleEdit = (exercise) => {

        $.ajax({
            url: 'http://localhost:5000/edit',
            data: exercise,
            type: 'put',
            success: function(res) {
                alert(res)
            }
        })
    };

    handleDelete = (exercise) => {

        // console.log(exercise); //582d080c95a3ebc19e29f5cc
        // console.log(typeof(exercise)); //string
        $.ajax({
            url: 'http://localhost:5000/delete',
            data: exercise,
            type: 'delete',
            success: (data) => {
                var oidToBeDeleted = data._id.$oid;
                var newList = this.state.allExercises.filter( (exercise) => {
                    return exercise._id.$oid != oidToBeDeleted
                });
                this.setState({
                    allExercises: newList
                });
            }
        })
    };

    handleNewExercise = (muscleValue) => {
        this.setState({
            muscle: muscleValue
        })
    };

    handleForm = (e) => {
        e.preventDefault();

        var data = {
            alias: this.refs['new-exercise'].value,
            body: this.state.muscle
        };

        $.ajax({
            url: 'http://localhost:5000/add',
            type: 'post',
            data: data,
            success: function(obj) {
                var concatted = this.state.allExercises.concat(obj);
                this.setState({
                    allExercises: concatted
                });
                this.refs['user_form'].reset();
            }.bind(this)
        })
    };

    render() {

        return (
            <div className="admin-panel">

                <List
                    allExercises={this.state.allExercises}
                    edit={this.handleEdit.bind(this)}
                    delete={this.handleDelete.bind(this)}
                />

                <div className="admin cf">
                    <form id="exercise-input" ref="user_form" onSubmit={this.handleForm}>
                        <input className="exercise-text" ref="new-exercise" placeholder="Add a new move" autoFocus="true" />
                        <Dropdown onSelectMuscle={this.handleNewExercise} />
                        <button className="exercise-button" type="submit">Add</button>
                    </form>
                </div>

            </div>
        )
    };
}

export default Admin;
