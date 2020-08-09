import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select value={this.props.value} onChange={this.props.onSelect}>
        <option>{this.props.allTitle}</option>
        {this.props.data.map(obj => (
          <option key={obj[this.props.valueKey]}>{obj[this.props.titleKey]}</option>
        ))}
      </select>
    )
  }
}

export default Select;
