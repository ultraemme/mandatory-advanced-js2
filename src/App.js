import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//https://reacttraining.com/react-router/web/guides/quick-start
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
      .then(res => {
        this.setState({res: res.data});
      })
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/main/">Main</Link></li>
              <li><Link to="/add/">Add movie</Link></li>
              <li><Link to="/edit/">Edit movie</Link></li>
              <li><Link to="/details/">Details</Link></li>
            </ul>
          </nav>
          <Route path="/main/" component={() => <Main data={this.state.res}/>}/>
          <Route path="/add/" component={Add}/>
          <Route path="/edit/" component={Edit}/>
          <Route path="/details/" component={Details}/>
        </div>
      </Router>
    );
  }
}

export default App;
