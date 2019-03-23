import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {request: false, redirect: false};
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  componentDidMount () {
    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.get(API_ROOT + '/movies/' + this.props.id, {cancelToken: this.source.token})
      .then(res => {
        this.setState({
          request: true,
          title: res.data.title,
          description: res.data.description,
          director: res.data.director,
          rating: parseInt(res.data.rating)
        });
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request of editing the movie. (1)');
        } else {
          console.log('Real error! -> ', err);
        }
      })
  }

  componentWillUnmount () {
    this.source.cancel('Request canceled.');
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: parseFloat(this.state.rating)
    };

    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.put(API_ROOT + '/movies/' + this.props.id, data, {cancelToken: this.source.token})
      .then(res => {
        this.setState({redirect: true});
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Canceled the request of editing the movie. (2)');
        } else {
          console.log('Real error! -> ', err);
        }
      })
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <>
          <Helmet>
            <title>Edit</title>
          </Helmet>
          { this.state.request &&
          <>
            <h1>Edit {this.state.title}</h1>
            <form action="" onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="">Title</label><br/>
              <input onChange={this.handleChange.bind(this)} id="title" type="text" value={this.state.title}/><br/><br/>
              <label htmlFor="">Description</label><br/>
              <textarea onChange={this.handleChange.bind(this)} id="description" cols="30" rows="10" value={this.state.description}/><br/><br/>
              <label htmlFor="">Director</label><br/>
              <input onChange={this.handleChange.bind(this)} id="director" type="text" value={this.state.director}/><br/><br/>
              <label htmlFor="">Rating</label><br/>
              <input onChange={this.handleChange.bind(this)} id="rating" type="range" min="0" max="5" step="0.1" value={this.state.rating}/><br/><br/>
              <button type="submit">Edit movie</button>
            </form>
          </>
          }
        </>
      );
    }
  }
}

export default Edit;