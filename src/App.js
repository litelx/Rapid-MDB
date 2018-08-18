import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home.js';
import Movie from './pages/Movie.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Rapid-MDB</h1>
        </header>
        <Router>
          <div>
            <Route path="/" component={Home} />
            <Route exact path="/:imdbID" component={Movie} />
          </div>
        </Router>
      </div>
    );

  }
  
}

export default App;
