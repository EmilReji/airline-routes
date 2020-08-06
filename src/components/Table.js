import React, { Component } from 'react';
import data from '../data.js';

class Table extends Component {
  state = {
      offset: 0,
      max: this.props.perPage,
      routes: [],
      prevBtnDisabled: true,
      nextBtnDisabled: false,
  }

  componentDidMount(){
    this.setState({ 
      routes: data.routes.slice(this.state.offset, this.state.offset + this.state.max),
    });
  }

  /*componentDidUpdate() {
    console.log(`From ${this.state.offset} to ${this.state.offset + this.state.max}`);
  }*/

  disablePrev() {
    this.setState({ prevBtnDisabled: true });
  }

  enablePrev(){
    this.setState({ prevBtnDisabled: false });
  }

  disableNext() {
    this.setState({ nextBtnDisabled: true });
  }

  enableNext(){
    this.setState({ nextBtnDisabled: false });
  }

  validateOffset(newOffset){
    if (newOffset < this.state.max) {
      newOffset = 0
      this.disablePrev()
    } else {
      this.enablePrev()
    }
    
    if (newOffset + this.state.max > data.routes.length - 1) {
      this.disableNext();
    } else {
      this.enableNext();
    }
    
    return newOffset;
  }

  decreaseOffset = () => {
    let newOffset = this.state.offset - this.state.max
    newOffset = this.validateOffset(newOffset);
    this.setState({ offset: newOffset, routes: data.routes.slice(newOffset, newOffset + this.state.max), })
    
  }

  increaseOffset = () => {
    let newOffset = this.state.offset + this.state.max
    newOffset = this.validateOffset(newOffset); 
    this.setState({ offset: newOffset, routes: data.routes.slice(newOffset, newOffset + this.state.max), })
  }

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
            this.state.routes.map((route, idx) => (
            <tr key={idx}>
              <td>{data.getAirlineById(route[this.props.columns[0].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[1].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[2].property]).name}</td>
            </tr>
            ))
          }
          <tr>
            <td><button disabled={this.state.prevBtnDisabled} onClick={this.decreaseOffset}>Previous Page</button></td>
            <td></td>
            <td><button disabled={this.state.nextBtnDisabled} onClick={this.increaseOffset}>Next Page</button></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;
