import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select onChange={this.props.onSelect}>
        <option>{this.props.allTitle}</option>
        {this.props.airlines.map(airline => (
          <option key={airline.id}>{airline.name}</option>
        ))}
      </select>
    )
  }
}

export default Select;
