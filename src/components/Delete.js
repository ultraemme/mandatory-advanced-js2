import React, {Component} from 'react';
import axios from 'axios';

class Delete extends Component {
  handleDelete(e) {
    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.delete(API_ROOT + '/movies/' + this.props.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <button onClick={this.handleDelete.bind(this)}>
        Delete movie
      </button>
    );
  }
}

export default Delete;