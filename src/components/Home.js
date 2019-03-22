import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Delete from './Delete';
import { Helmet } from 'react-helmet'

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
              <td><Link to="/details" onClick={this.props.getId}>{movie.title}</Link></td>
              <td>{movie.director}</td>
              <td>{movie.rating}</td>
              <td><Link to="/edit" onClick={this.props.getId}>Edit movie</Link></td>
              <td><Delete id={movie.id}/></td>
            </tr>
          )
        })
        this.setState({tbody});
      })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
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