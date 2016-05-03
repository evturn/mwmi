import { Observable } from 'rx'
import { DOM } from 'rx-dom'
import { dispatch } from 'store/client'

const ENQUIRY_RECEIVED  = payload => dispatch({ type: 'ENQUIRY_RECEIVED',  payload })
const VALIDATION_ERRORS = payload => dispatch({ type: 'VALIDATION_ERRORS', payload })
const USER_IS_TYPING    =   value => dispatch({ type: 'USER_IS_TYPING',    value })

const createPostReq = ({ name, email, phone, message }) => {
  const i = name === undefined ? -1 : name.indexOf(' ')
  const fullname = i !== -1 ? {
    first: name.substring(0, i),
    last: name.substring(i, name.length)
  } : {
    first: name,
    last: ''
  }

  return {
    url: '/api/contact',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fullname,
      email,
      phone,
      message
    })
  }
}

const showSuccess = ({ enquirySubmitted }) => {
  ENQUIRY_RECEIVED({ enquirySubmitted })
}

const showErrors = ({ name, email, message }) => {
  const validationErrors = [name, email, message].reduce((acc, x) => {
    x !== undefined ? acc[x.path] = x.message : ''
    return acc
  }, {})
  VALIDATION_ERRORS({ validationErrors, hasErrors: true })
}

export const isTyping = e => USER_IS_TYPING({ [e.name]: e.value })

export const enquirySubmit = data => {
  DOM.ajax(createPostReq(data))
    .map(x => JSON.parse(x.response))
    .map(({ enquiry }) => ({
      validationErrors: enquiry.validationErrors,
      enquirySubmitted: enquiry.enquirySubmitted
     }))
    .subscribe(x => {
       x.enquirySubmitted ?
       showSuccess(x.enquirySubmitted) :
       showErrors(x.validationErrors)
    })
}

