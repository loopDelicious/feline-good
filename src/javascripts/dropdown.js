import React, { Component } from 'react'

class Dropdown extends Component {
  items = [
    'Shoulders',
    'Arms',
    'Back',
    'Core',
    'Legs',
    'Butt',
    'Chest',
    'Cardio'
  ];

  state = {
    selectedMuscle: ''
  };

  handleMuscleChange = () => {
    var muscle = this.refs['muscleGroup'].value
    this.props.onSelectMuscle(muscle)
  };

  render () {
    var listItems = this.items.map(item => {
      return <option key={item}>{item}</option>
    })

    return (
      <div className="dropdown">
        <select
          className="dropdown-content"
          ref="muscleGroup"
          onChange={this.handleMuscleChange}
        >
          <option value="" disabled selected>
            Choose one &#x25be;
          </option>
          {listItems}
        </select>
      </div>
    )
  }
}

export default Dropdown
