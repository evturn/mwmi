import 'whatwg-fetch'
import { Observable } from 'rxjs'

const ENQUIRY_SUCCESS  = payload => ({ type: 'ENQUIRY_SUCCESS',  payload })
const ENQUIRY_ERROR    = payload => ({ type: 'ENQUIRY_ERROR',    payload })
const ENQUIRY_SNAPSHOT = payload => ({ type: 'ENQUIRY_SNAPSHOT', payload })
const FETCH_SUCCESS    = payload => ({ type: 'FETCH_SUCCESS', payload })
const FETCH_ERROR      = message => ({ type: 'FETCH_ERROR',   message })

const fetchInitialState = _ => (
  (action, store ) => {
    store.dispatch(_ => Observable.of({ type: 'FETCH_INITIAL_STATE' }))

    return Observable.fromPromise(fetch(`/api/locals`).then(x => x.json()))
      .map(payload => ({
        type: 'FETCH_SUCCESS',
        payload
      }))
  }
)

const observeRefs = ({ name, email, message, button }) =>
  ({ dispatch, getState }) => {

    const name$ = Observable.fromEvent(name, 'change')
    const email$ = Observable.fromEvent(email, 'change')
    const message$ = Observable.fromEvent(message, 'change')

    const submit$ = Observable.fromEvent(button, 'click')
      .map(createRequestObject)
      .flatMap(request => {
        return Observable.fromPromise(fetch(`/api/contact`, request).then(x => x.json()))
      })
      .map(({ enquiry }) => ({
        validationErrors: enquiry.validationErrors,
        enquirySubmitted: enquiry.enquirySubmitted
       }))

    const success$ = submit$
      .filter(x => x.enquirySubmitted)
      .subscribe(({ enquirySubmitted }) => dispatch(ENQUIRY_SUCCESS({ enquirySubmitted })))

    const error$ = submit$
      .filter(x => !x.enquirySubmitted)
      .map(({ validationErrors }) => showErrors(validationErrors))
      .subscribe(validationErrors => dispatch(ENQUIRY_ERROR({ validationErrors, hasErrors: true })))

    Observable.merge(name$, email$, message$)
      .map(updateFormData)
      .subscribe(x => dispatch(ENQUIRY_SNAPSHOT(x)))

    Observable.fromEvent(name, 'blur')
      .map(createFullname)
      .subscribe(x => dispatch(ENQUIRY_SNAPSHOT(x)))

    function createFullname(e) {
      const name = e.target.value
      const i = name === undefined ? -1 : name.indexOf(' ')
      const fullname = i !== -1 ? {
        first: name.substring(0, i),
        last: name.substring(i, name.length)
      } : {
        first: name,
        last: ''
      }
      return {
        formData: {
          ...getState().app.enquiry.formData,
          name: fullname
        }
      }
    }

    function showErrors({ name, email, message }) {
      return [name, email, message].reduce((acc, x) => {
        x !== undefined ? acc[x.path] = x.message : ''
        return acc
      }, {})
    }

    function updateFormData(e) {
      return {
        formData: {
          ...getState().app.enquiry.formData,
          [e.target.name]: e.target.value
        }
      }
    }

    function createRequestObject() {
      return {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...getState().app.enquiry.formData })
      }
    }
}

export {
  observeRefs,
  fetchInitialState,
}
