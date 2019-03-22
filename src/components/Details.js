import React, {Component} from 'react';
import axios from 'axios'
import { Helmet } from 'react-helmet'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.id}`)
      .then(res => {
        this.setState({res: res.data});
      })
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Details</title>
        </Helmet>
        <h1>Details</h1>
        { this.state.res &&
          <>
            <p>ID: {this.props.id}</p>
            <p>Title: {this.state.res.title}</p>
            <p>Director: {this.state.res.director}</p>
            <p>Description: {this.state.res.description}</p>
            <p>Rating: {this.state.res.rating}</p>
          </>
        }
      </>
    );
  }
}

export default Details;