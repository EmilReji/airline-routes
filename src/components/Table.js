import React, { Component } from 'react';
import data from '../data.js';

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>{this.props.columns[0].name}</th>
            <th>{this.props.columns[1].name}</th>
            <th>{this.props.columns[2].name}</th>
          </tr>
        </thead>
        <tbody>
          {
            data.routes.map((route, idx) => (
            <tr key={idx}>
              <td>{data.getAirlineById(route[this.props.columns[0].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[1].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[2].property]).name}</td>
            </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default Table;
