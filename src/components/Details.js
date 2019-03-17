import React, {Component} from 'react';
import axios from 'axios'

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
 //https://hashnode.com/post/reactjs-how-to-render-components-only-after-successful-asynchronous-call-ciwvnkjr400sq7t533lvrpdtw
  render() {
    return (
      <>
        <h1>Details</h1>
        { this.state.res &&
          <>
            <p>ID: {this.props.id}</p>
            <p>Title: {this.state.res.title}</p>
            <p>Description: {this.state.res.description}</p>
          </>
        }

      </>
    );
  }
}

export default Details;