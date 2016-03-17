import fetch from 'isomorphic-fetch'

const server = {
  hydrate(cb) {
    return fetch('http://localhost:3000/api/locals')
      .then(res => res.json())
      .then(json => cb(json))
      .catch(error => console.log(error));
  },
  renderLayout(html, initialState) {
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
  }
};



const client = {
  xhrpost(endpoint, data) {
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



export const hydrate = server.hydrate;
export const renderLayout = server.renderLayout;

export const xhrpost = client.xhrpost;
export const init = client.init;