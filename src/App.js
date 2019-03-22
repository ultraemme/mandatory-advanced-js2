import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//https://reacttraining.com/react-router/web/guides/quick-start
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';
import Home from './components/Home';

function formatWindowLocation (string) {
  return string.replace("/", "").charAt(0).toUpperCase() + string.slice(2);
}

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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add movie</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={() => <Home getId={this.getId.bind(this)}/>}/>
          <Route path="/add" component={() => <Add/>}/>
          <Route path="/edit" component={() => <Edit id={this.state.id} getId={this.getId.bind(this)}/>}/>
          <Route path="/details" component={() => <Details id={this.state.id}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
