import React, { Component } from 'react';

class Dropdown extends Component {

    state = {
        listVisible: false,
    };

    items = ["Shoulders", "Arms", "Back", "Core", "Legs", "Butt"];

    select = (item) => {
        this.props.selected = item;
    };

    show = () => {
        this.setState({
            listVisible: true
        });
        document.addEventListener("click", this.hide);
    };

    hide = () => {
        this.setState({
            listVisible: false
        });
        document.removeEventListener("click", this.hide);
    };

    render() {

        var listItems = this.items.map( (item) => {
            return <li key={item} ref='body-part'>{item}</li>
        });

        return (
            <div className="dropdown">
                <button className="dropbtn" onClick={this.show}>Muscle Group</button>
                <div className={"dropdown-content" + (this.state.listVisible ? " show" : "")}>
                    {listItems}
                </div>
            </div>
        )
    };
}

export default Dropdown;
