import React, { Component } from 'react'
import $ from 'jquery'
import List from './list.js'
import Input from './input.js'

class Admin extends Component {
  state = {
    allExercises: []
  };

  host = window.location.hostname;

  componentDidMount () {
    $.ajax({
      url: 'http://' + this.host + ':5500/all',
      type: 'get',
      success: function (obj) {
        var concatted = this.state.allExercises.concat(obj)
        this.setState({
          allExercises: concatted
        })
      }.bind(this)
    })
  }

  handleAdd = data => {
    $.ajax({
      url: 'http://' + this.host + ':5500/add',
      type: 'post',
      data: data,
      success: function (obj) {
        var concatted = this.state.allExercises.concat(obj)
        this.setState({
          allExercises: concatted
        })
      }.bind(this)
    })
  };

  handleEdit = obj => {
    // hang out to object - mongoDB returns success number not object
    var forSuccess = obj

    $.ajax({
      url: 'http://' + this.host + ':5500/edit',
      type: 'put',
      data: obj,
      success: () => {
        var oidToBeEdited = forSuccess._id
        var indexOfOid = this.state.allExercises
          .map(exercise => {
            return exercise._id.$oid
          })
          .indexOf(oidToBeEdited)

        var toBeInserted = {
          _id: {
            $oid: forSuccess._id
          },
          title: forSuccess.title,
          benefit: forSuccess.benefit
        }

        this.state.allExercises[indexOfOid] = toBeInserted
        this.setState({
          allExercises: this.state.allExercises
        })
      }
    })
  };

  handleDelete = exercise => {
    $.ajax({
      url: 'http://' + this.host + ':5500/delete',
      data: { id: exercise },
      type: 'delete',
      success: data => {
        var response = JSON.parse(data)
        var oidToBeDeleted = response._id.$oid

        var newList = this.state.allExercises.filter(exerciseObj => {
          return exerciseObj._id.$oid !== oidToBeDeleted
        })
        this.setState({
          allExercises: newList
        })
      }
    })
  };

  render () {
    return (
      <div className="admin-panel cf">
        <List
          allExercises={this.state.allExercises}
          edit={this.handleEdit.bind(this)}
          delete={this.handleDelete.bind(this)}
        />

        <Input
          allExercises={this.state.allExercises}
          edit={this.handleEdit.bind(this)}
          add={this.handleAdd.bind(this)}
        />
      </div>
    )
  }
}

export default Admin
