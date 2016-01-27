import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.title = 'MWMI';
    this.subtitle = 'Inspiring stories from successful industry experts, artists, and songwriters';
  }
  render() {
    return (
      <div className="container landing">
        <div className="wrapper">

          <div className="group-desktop">
            <div className="image-container">
              <img className="img-scale" src='http://madeinmusic.co/img/mi-logo-800.png' />
              <div className="inner-text">
                <p className="subhead">{this.title}</p>
              </div>
            </div>

            <div className="description-container">
              <p className="meta">{this.subtitle}</p>
            </div>

            <div className="btn-container desktop">
              <button href="/blog" target="_blank" className="btn-red">Stream Now</button>
            </div>
          </div>

          <div className="btn-container mobile">
            <button href="/blog" target="_blank" className="btn-red">Stream Now</button>
          </div>

        </div>
      </div>
    );
  }
}