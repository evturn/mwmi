import { xhrpost } from 'actions/api'

const ENQUIRY_RECEIVED  = payload => ({ type: 'ENQUIRY_RECEIVED',  payload })
const VALIDATION_ERRORS = payload => ({ type: 'VALIDATION_ERRORS', payload })
const ENQUIRY_SUBMIT    = payload => ({ type: 'ENQUIRY_SUBMIT',    payload })
const USER_IS_TYPING    =   value => ({ type: 'USER_IS_TYPING',    value })
const ENQUIRY_ERROR     =   error => ({ type: 'ENQUIRY_ERROR',     error })

export const isTyping = e => dispatch => dispatch(USER_IS_TYPING({ [e.name]: e.value }))

export const enquiryReceived = payload => dispatch => dispatch(ENQUIRY_RECEIVED(payload))

export const enquirySubmit = formData => dispatch => {
  xhrpost('/api/contact', parseFormData(formData))
    .then(res => res.json())
    .then(res => {
      const { validationErrors, enquirySubmitted } = res.enquiry

      if (enquirySubmitted) {
        dispatch(ENQUIRY_RECEIVED({ enquirySubmitted }))
      } else {
        dispatch(VALIDATION_ERRORS({
          enquirySubmitted,
          hasErrors: true,
          validationErrors: getFormErrors(validationErrors)
        }))
      }
    })
    .catch(err => dispatch(ENQUIRY_ERROR(err)))
}

function getFormErrors(validationErrors) {
  const { name, email, message } = validationErrors

  let messages = {}

  if (name) { messages.name = name.message }
  if (email) { messages.email = email.message }
  if (message) { messages.message = message.message }

  return messages
}

function parseFormData(formData) {
  const { name, email, phone, message } = formData
  const i = name === undefined ? -1 : name.indexOf(' ')
  const fullname = i !== -1 ? {
    first: name.substring(0, i),
    last: name.substring(i, name.length)
  } : {
    first: name,
    last: ''
  }

  return {
    name: fullname,
    email,
    phone,
    message
  }
}