import React, { Component } from 'react';

class Dropdown extends Component {

    items = ["Shoulders", "Arms", "Back", "Core", "Legs", "Butt"];

    render() {

        var listItems = this.items.map( (item) => {
            return <option key={item} ref='body-part'>{item}</option>
        });

        return (
            <div className="dropdown">
                <select className="dropdown-content">
                    <option value="" disabled selected >Choose one</option>
                    {listItems}
                </select>
            </div>
        )
    };
}

export default Dropdown;
