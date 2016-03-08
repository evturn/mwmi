import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.subtitle = 'Inspiring stories from successful industry experts, artists, and songwriters';
  }
  render() {
    return (
      <div className="home">
        <div className="home__logo">
          <img className="home__logo-image" src={require('images/logo-720x800.png')} />
          <div className="home__logo-title">MWMI</div>
        </div>
        <div className="home__details">
          <div className="home__details-description">{this.subtitle}</div>
          <Link to={{ pathname: '/blog' }}><button className="home__details-button button__red">Stream Now</button></Link>
        </div>
      </div>
    );
  }
}