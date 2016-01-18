import React from 'react';
import fetch from 'isomorphic-fetch';
import {polyfill} from 'es6-promise';

polyfill();

export default class Blog extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    fetch('/blogPosts')
      .then(res => res.json())
      .then(json => console.log(json));
  }
  render() {
    return (
      <div>
        Sup with dem cookies?
      </div>
    );
  }
}