import { Observable } from 'rx'
import { DOM } from 'rx-dom'
import { dispatch, getState } from 'store/client'

const ENQUIRY_RECEIVED  = payload => dispatch({ type: 'ENQUIRY_RECEIVED',  payload })
const VALIDATION_ERRORS = payload => dispatch({ type: 'VALIDATION_ERRORS', payload })
const UPDATE_FORM_DATA  = payload => dispatch({ type: 'UPDATE_FORM_DATA',  payload })
const VALIDATE_FIELD    = payload => dispatch({ type: 'VALIDATE_FIELD',    payload })

const showErrors = ({ name, email, message }) => {
  const validationErrors = [name, email, message].reduce((acc, x) => {
    x !== undefined ? acc[x.path] = x.message : ''
    return acc
  }, {})
  VALIDATION_ERRORS({ validationErrors, hasErrors: true })
}

const updateFormData = e => {
  return {
    formData: {
      ...getState().enquiry.formData,
      [e.target.name]: e.target.value
    }
  }
}

const createRequestObject = _ => {
  return {
    url: '/api/contact',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...getState().enquiry.formData
    })
  }
}

const createFullname = e => {
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
      ...getState().enquiry.formData,
      name: fullname
    }
  }
}

export const observeRefs = ({ name, email, message, button }) => {
  const name$ = Observable.fromEvent(name, 'change')
  const email$ = Observable.fromEvent(email, 'change')
  const message$ = Observable.fromEvent(message, 'change')

  Observable.merge(name$, email$, message$)
    .map(updateFormData)
    .subscribe(x => UPDATE_FORM_DATA(x))

  Observable.fromEvent(name, 'blur')
    .map(createFullname)
    .subscribe(x => UPDATE_FORM_DATA(x))

  Observable.fromEvent(button, 'click')
    .map(createRequestObject)
    .flatMap(DOM.ajax)
    .map(x => JSON.parse(x.response))
    .map(({ enquiry }) => ({
      validationErrors: enquiry.validationErrors,
      enquirySubmitted: enquiry.enquirySubmitted
     }))
    .subscribe(x => {
      x.enquirySubmitted ?
      ENQUIRY_RECEIVED({ enquirySubmitted: x.enquirySubmitted }) :
      showErrors(x.validationErrors)
    })
}