import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount () {
    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.get(API_ROOT + '/movies/' + this.props.id, {cancelToken: this.source.token})
      .then(res => {
        this.setState({res: res.data});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request of getting details of the movie.');
        } else {
          console.log('Real error! -> ', err);
        }
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Details</title>
        </Helmet>
        { this.state.res &&
          <>
            <h1>{this.state.res.title}</h1>
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