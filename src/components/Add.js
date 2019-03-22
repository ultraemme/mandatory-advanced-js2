import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: parseInt(this.state.rating)
    };

    const API_ROOT = 'http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000';
    axios.post(API_ROOT + '/movies', data)
      .then((res) => {
        this.setState({redirect: true});
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
            <title>Add</title>
          </Helmet>
          <form action="" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="">Title</label><br/>
            <input onChange={this.handleChange.bind(this)} id="title" type="text"/><br/><br/>
            <label htmlFor="">Description</label><br/>
            <textarea onChange={this.handleChange.bind(this)} id="description" cols="30" rows="10"/><br/><br/>
            <label htmlFor="">Director</label><br/>
            <input onChange={this.handleChange.bind(this)} id="director" type="text"/><br/><br/>
            <label htmlFor="">Rating</label><br/>
            <input onChange={this.handleChange.bind(this)} id="rating" type="range" min="0" max="5" step="0.1"/><br/><br/>
            <button type="submit">Add movie</button>
          </form>
        </>
      );
    }
  }
}

export default Add;