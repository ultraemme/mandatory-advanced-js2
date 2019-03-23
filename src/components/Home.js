import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {movies: []};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount () {
    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.get(API_ROOT + '/movies', {cancelToken: this.source.token})
      .then(res => {
        this.setState({movies: res.data});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request of getting all the movies.');
        } else {
          console.log('Real error! -> ', err);
        }
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  handleDelete(e) {
    const targetId = e.nativeEvent.path[2].id;
    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.delete(API_ROOT + '/movies/' + targetId, {cancelToken: this.source.token})
      .then(res => {
        const movies = this.state.movies.filter(movie => {
          return movie.id !== targetId;
        });
        this.setState({movies});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request of deleting the movie.');
        } else {
          console.log('Real error! -> ', err);
        }
      })
  }

  render() {
    const movies = this.state.movies.map(movie => {
      return (
        <tr key={movie.id} id={movie.id}>
          <td><Link to="/details" onClick={this.props.getId}>{movie.title}</Link></td>
          <td>{movie.director}</td>
          <td>{movie.rating}</td>
          <td><Link to="/edit" onClick={this.props.getId}>Edit movie</Link></td>
          <td><button onClick={this.handleDelete.bind(this)}>Delete movie</button></td>
        </tr>
      )
    })

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
            <th> </th>
            <th> </th>
          </tr>
          </thead>
          <tbody>
            {movies}
          </tbody>
        </table>
      </>
    );
  }
}

export default Home;