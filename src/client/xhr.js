import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

polyfill();

const xhr = {
  get(endpoint, data) {
    return fetch(endpoint, {
      method: 'get',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  },
  post(endpoint, data) {
    return fetch(endpoint, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
};

export default xhr;