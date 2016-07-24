import 'whatwg-fetch'
import { Observable } from 'rxjs'

export default cb => (
  Observable.fromPromise(request(`/api/locals`))
    .map(({ episodes, user }) => ({ episodes, user }))
    .catch(e => Observable.of(catchError(e)))
    .subscribe(cb)
)

function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function catchError(e) {
  return {
    error: {
      message: 'Me think that ' + e.message
    }
  }
}
