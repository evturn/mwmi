import React, { Component } from 'react';
import Episodes from './Episodes';
import Logo from './Logo';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      episodes: [],
    }
  }

  componentDidMount() {
    fetch('/api/episodes')
      .then(x => x.json())
      .then(episodes => 
        this.setState({ episodes }));
  }

  render() {
    return (
      <div>
        <Logo />
        <Episodes episodes={this.state.episodes} />
      </div>
    );
  }
}

export default Home;
