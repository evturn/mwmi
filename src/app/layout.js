export default (html, initialState) => {
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