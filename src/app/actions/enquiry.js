import { Observable } from 'rx'
import { DOM } from 'rx-dom'
import { dispatch } from 'store/client'

const ENQUIRY_RECEIVED  = payload => ({ type: 'ENQUIRY_RECEIVED',  payload })
const VALIDATION_ERRORS = payload => ({ type: 'VALIDATION_ERRORS', payload })
const ENQUIRY_SUBMIT    = payload => ({ type: 'ENQUIRY_SUBMIT',    payload })
const USER_IS_TYPING    =   value => ({ type: 'USER_IS_TYPING',    value })
const ENQUIRY_ERROR     =   error => ({ type: 'ENQUIRY_ERROR',     error })

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

export const isTyping = e => dispatch(USER_IS_TYPING({ [e.name]: e.value }))

export const enquirySubmit = data => {
  DOM.ajax(createPostReq(data))
    .map(x => JSON.parse(x.response))
    .map(({ enquiry }) => ({
      errors: enquiry.errors,
      submitted: enquiry.submitted
     }))
    .subscribe(x => {
       x.submitted ?
       dispatch(ENQUIRY_RECEIVED({ submitted: x.submitted })) :
       dispatch(VALIDATION_ERRORS({ errors: getFormErrors(x.errors) }))
    })
}

const getFormErrors = ({ name, email, message }) => {
  let messages = {}

  if (name) { messages.name = name.message }
  if (email) { messages.email = email.message }
  if (message) { messages.message = message.message }

  return messages
}

