import React, { Component } from 'react';
import $ from 'jquery';

class Admin extends Component {

    state = {
        allExercises: []
    };

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:5000/all',
            type: 'get',
            contentType: "application/json",
            success: function(obj) {
                var concatted = this.state.allExercises.concat(obj);
                this.setState({
                    allExercises: concatted
                })
            }.bind(this)
        })
    };

    handleEdit = (item) => {
        $.ajax({
            url: 'http://localhost:5000/edit/' + item,
            type: 'put',
            contentType: "application/json",
            success: function(res) {
                alert(res)
            }
        })
    };

    handleDelete = (item) => {
        $.ajax({
            url: 'http://localhost:5000/delete/' + item,
            type: 'delete',
            async: true,
            timeout: 300000,
            success: function (data) {

            },
            error: function (xhr, status, err) {

            }
        })
    };

    render() {

        var all_exercises = this.state.allExercises.map( (exercise, i) => {
            return (
                <li key={exercise._id.$oid}>
                    {exercise.alias}
                    <a href="#" onClick={this.handleEdit}>edit</a>
                    <a href="#" onClick={this.handleDelete}>delete</a>
                </li>
            )
        });

        return (
            <ul id="all-exercise-list">
                {all_exercises}
            </ul>
        )
    };
}

export default Admin;
