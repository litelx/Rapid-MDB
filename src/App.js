import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home.js';
import Movie from './pages/Movie.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/pagination" component={Home} />
            <Route path="/:imdbID" component={Movie} />
          </Switch>
        </Router>
      </div>
    );

  }

}

export default App;
