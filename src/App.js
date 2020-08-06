import React, { Component } from 'react';
import data from './data.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
        </section>
        <section>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              { 
                data.routes.map((route, idx) => (
                <tr key={idx}>
                  <td>{data.getAirlineById(route.airline).name}</td>
                  <td>{data.getAirportByCode(route.src).name}</td>
                  <td>{data.getAirportByCode(route.dest).name}</td>
                </tr>
                ))
              } 
            </tbody>
          </table>

        </section>
      </div>
    );
  }
}

export default App;
