import fetch from 'isomorphic-fetch';

const fetchJSON = (url, cb) => {
  return fetch(url)
    .then(res => res.json())
    .then(res => cb(res))
    .catch(error => console.log(error));
};

export const fetchLocals = cb => fetchJSON('http://localhost:3000/api/locals', cb);

export const createPage = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>MWMI</title>
      <link rel="stylesheet" type="text/css" href="/dist/css/app.css" />
    </head>
    <body>

      <div id="root">${html}</div>

      <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
      <script src="/dist/js/app.js"></script>
    </body>
    </html>
  `;
};

export const scrollWindowTop = () => window.scrollTo(0, 0);

export const xhrpost = (endpoint, data) => {
  return fetch(endpoint, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const thunkmasterFlex = ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
};