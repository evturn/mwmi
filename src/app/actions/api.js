import fetch from 'isomorphic-fetch';

export const fetchLocals = cb => {
  return fetch(`http://localhost:${__PORT__}/api/locals`)
    .then(res => res.json())
    .then(res => cb(res))
    .catch(err => console.log(err));
}

export const createPage = (html, initialState) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Mama We Made It</title>
      <link rel="icon" type="image/png" href="dist/favicon.png">
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