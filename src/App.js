import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//https://reacttraining.com/react-router/web/guides/quick-start
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getId(e) {
    this.setState({id: e.target.parentNode.parentNode.id});
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/home/">Main</Link></li>
              <li><Link to="/add/">Add movie</Link></li>
              <li><Link to="/edit/">Edit movie</Link></li>
            </ul>
          </nav>
          <Route path="/home/" component={() => <Home getId={this.getId.bind(this)}/>}/>
          <Route path="/add/" component={Add}/>
          <Route path="/edit/" component={Edit}/>
          <Route path="/details/" component={() => <Details id={this.state.id}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
