import { Observable } from 'rx'
import { DOM } from 'rx-dom'

const ENQUIRY_SUCCESS  = payload => ({ type: 'ENQUIRY_SUCCESS',  payload })
const ENQUIRY_ERROR    = payload => ({ type: 'ENQUIRY_ERROR',    payload })
const ENQUIRY_SNAPSHOT = payload => ({ type: 'ENQUIRY_SNAPSHOT', payload })

export const observeRefs = ({ name, email, message, button }) =>
  ({ dispatch, getState }) => {

    const name$ = Observable.fromEvent(name, 'change')
    const email$ = Observable.fromEvent(email, 'change')
    const message$ = Observable.fromEvent(message, 'change')

    const submit$ = Observable.fromEvent(button, 'click')
      .map(createRequestObject)
      .flatMap(DOM.ajax)
      .map(x => JSON.parse(x.response))
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
        url: '/api/contact',
        method: 'POST',
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...getState().app.enquiry.formData })
      }
    }

}