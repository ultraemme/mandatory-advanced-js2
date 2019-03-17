import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Details from './Details';
import axios from 'axios'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {tbody: []};
  }

  componentDidMount () {
    axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies')
      .then(res => {
        let tbody = res.data.map(movie => {
          return (
            <tr key={movie.id} id={movie.id}>
              <td><Link to="/details/" onClick={this.props.getId}>{movie.title}</Link></td>
              <td>{movie.director}</td>
              <td>{movie.rating}</td>
            </tr>
          )
        })
        this.setState({tbody});
      })
  }

  render() {
    return (
      <>
        <h1>Main</h1>
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Rating</th>
          </tr>
          </thead>
          <tbody>
          {this.state.tbody}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;