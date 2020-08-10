import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select value={this.props.value} onChange={this.props.onSelect}>
        <option>{this.props.allTitle}</option>
        {this.props.data.map(obj => (
          <option disabled={!this.props.matchingData[obj[this.props.valueKey]]} key={obj[this.props.valueKey]}>{obj[this.props.titleKey]}</option>
        ))}
      </select>
    )
  }
}

export default Select;
