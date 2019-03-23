import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';
import Home from './components/Home';

const formatWindowLocation = function(str) {
  return str.toUpperCase().charAt(1) + str.slice(2);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getId(e) {
    this.setState({id: e.nativeEvent.path[2].id});
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
          <Route exact path="/" component={() => <Home id={this.state.id} getId={this.getId.bind(this)}/>}/>
          <Route path="/add" component={() => <Add/>}/>
          <Route path="/edit" component={() => <Edit id={this.state.id}/>}/>
          <Route path="/details" component={() => <Details id={this.state.id}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
