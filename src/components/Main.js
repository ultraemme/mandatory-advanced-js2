import React, {Component} from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {tbody: []};
  }

  componentDidMount () {
    if (this.props.data) {
      let tbody = this.props.data.map(movie => {
        return (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.rating}</td>
          </tr>
        )
      })
      this.setState({tbody});
    }
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

export default Main;