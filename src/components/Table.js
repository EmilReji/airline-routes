import React, { Component } from 'react';
import data from '../data.js';
import Select from './Select.js';

class Table extends Component {
  state = {
      offset: 0,
      max: this.props.perPage,
      routes: [],
      prevBtnDisabled: true,
      nextBtnDisabled: true,
      currAirline: "All Airlines",
      currAirport: "All Airports",
  }

  componentDidMount(){
    this.setState({ 
      routes: data.routes.slice(),
      nextBtnDisabled: false,
    });
  }

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
      this.disablePrev();
    } else {
      this.enablePrev();
    }
    
    if (newOffset + this.state.max > this.state.routes.length - 1) {
      this.disableNext();
    } else {
      this.enableNext();
    }

    return newOffset;
  }

  decreaseOffset = () => {
    let newOffset = this.state.offset - this.state.max
    newOffset = this.validateOffset(newOffset);
    this.setState({ 
      offset: newOffset, 
      routes: data.routes.filter(route => {
        return (this.state.currAirline === "All Airlines" || 
                this.state.currAirline === data.getAirlineById(route.airline).name) &&
               (this.state.currAirport === "All Airports" ||
                this.state.currAirport === data.getAirportByCode(route.src).name ||
                this.state.currAirport === data.getAirportByCode(route.dest).name)
      }), 
    });
  }

  increaseOffset = () => {
    let newOffset = this.state.offset + this.state.max
    newOffset = this.validateOffset(newOffset); 
    this.setState({ 
      offset: newOffset, 
      routes: data.routes.filter(route => {
        return (this.state.currAirline === "All Airlines" || 
                this.state.currAirline === data.getAirlineById(route.airline).name) &&
               (this.state.currAirport === "All Airports" ||
                this.state.currAirport === data.getAirportByCode(route.src).name ||
                this.state.currAirport === data.getAirportByCode(route.dest).name)
      }), 
    });
  }

  airlineChanged = (e) => {
    e.preventDefault();
    const airline = e.target.value;

    this.setState({
      offset: 0,
      routes: [],
      prevBtnDisabled: true,
      nextBtnDisabled: false,
      currAirline: airline,
    });

    this.setState({
      routes: data.routes.filter(route => {
        return ((airline === "All Airlines" || 
                airline === data.getAirlineById(route.airline).name) &&
               (this.state.currAirport === "All Airports" ||
                this.state.currAirport === data.getAirportByCode(route.src).name ||
                this.state.currAirport === data.getAirportByCode(route.dest).name))
      }),
    });

    if (this.state.routes.length < this.state.max) {
      this.disablePrev();
      this.disableNext();
    }
  }

  airportChanged = (e) => {
    e.preventDefault();
    const airport = e.target.value;

    this.setState({
      offset: 0,
      routes: [],
      prevBtnDisabled: true,
      nextBtnDisabled: false,
      currAirport: airport,
    });

    this.setState({
      routes: data.routes.filter(route => {
        return (airport === "All Airports" || 
                airport === data.getAirportByCode(route.src).name || 
                airport === data.getAirportByCode(route.dest).name) &&
               (this.state.currAirline === "All Airlines" ||
                this.state.currAirline === data.getAirlineById(route.airline).name)
      }),
    });
  }

  clearFilters = () => {
    this.setState({
      currAirline: "All Airlines",
      currAirport: "All Airports",
      routes: data.routes.slice(),
    });
  }

  getMatchingAirlines = () => {
    const airlines = {}

    this.state.routes.forEach(route => {
      if ((this.state.currAirline === "All Airlines" || 
           this.state.currAirline === data.getAirlineById(route.airline).name) &&
          (this.state.currAirport === "All Airports" ||
           this.state.currAirport === data.getAirportByCode(route.src).name ||
           this.state.currAirport === data.getAirportByCode(route.dest).name)) 
        {
          airlines[data.getAirlineById(route.airline).id] = data.getAirlineById(route.airline).name;
        }
    }); 

    return airlines
  }

  getMatchingAirports = () => {
    const airports = {};
    
    this.state.routes.forEach(route => {
      if ((this.state.currAirline === "All Airlines" ||
           this.state.currAirline === data.getAirlineById(route.airline).name) &&
          (this.state.currAirport === "All Airports" ||
           this.state.currAirport === data.getAirportByCode(route.src).name ||
           this.state.currAirport === data.getAirportByCode(route.dest).name))     
        {
          airports[data.getAirportByCode(route.src).code] = data.getAirportByCode(route.src).name;
          airports[data.getAirportByCode(route.dest).code] = data.getAirportByCode(route.dest).name;
        }
    });

    return airports;
  }

  render() {
    const currRoutes = this.state.routes.slice(this.state.offset, this.state.offset + this.state.max);
    
    return (
    <section>
      Show routes on
      <Select data={data.airlines} matchingData={this.getMatchingAirlines()} valueKey="id" titleKey="name" allTitle="All Airlines" value={this.state.currAirline} onSelect={this.airlineChanged} />
      flying in or out of
      <Select data={data.airports} matchingData={this.getMatchingAirports()} valueKey="code" titleKey="name" allTitle="All Airports" value={this.state.currAirport} onSelect={this.airportChanged} />
      <button onClick={this.clearFilters}>Show All Routes</button>
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
            currRoutes.map((route, idx) => (
            <tr key={idx}>
              <td>{data.getAirlineById(route[this.props.columns[0].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[1].property]).name}</td>
              <td>{data.getAirportByCode(route[this.props.columns[2].property]).name}</td>
            </tr>
            ))
          }
          <tr>
            <td><button disabled={this.state.prevBtnDisabled} onClick={this.decreaseOffset}>Previous Page</button></td>
            <td>Showing {this.state.offset + 1} - {(this.state.routes.length - this.state.offset >= this.state.max) ? (this.state.offset + this.state.max) : this.state.routes.length} of {this.state.routes.length} routes.</td>
            <td><button disabled={this.state.nextBtnDisabled} onClick={this.increaseOffset}>Next Page</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    );
  }
}

export default Table;
