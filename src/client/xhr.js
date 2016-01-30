import fetch from 'isomorphic-fetch';

const xhr = (endpoint, data) => {
  return fetch(endpoint, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export default xhr;