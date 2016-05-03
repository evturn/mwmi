import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { isTyping, enquirySubmit } from 'actions/enquiry'
import classNames from 'classnames/bind'
import css from 'less/components/enquiry.less'

const cx = classNames.bind(css)

class Enquiry extends Component {
  render() {
    const {hasErrors, validationErrors, enquirySubmitted } = this.props

    const name = (
      <div className={cx('field')}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={e => isTyping(e.target)} />
        <div className={cx('error')}>{hasErrors && validationErrors.name ? validationErrors.name : null}</div>
      </div>
    )

    const email = (
      <div className={cx('field')}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={e => isTyping(e.target)} />
        <div className={cx('error')}>{hasErrors && validationErrors.email ? validationErrors.email : null}</div>
      </div>
    )

    const phone = (
      <div className={cx('field')}>
        <input
          name="phone"
          type="text"
          placeholder="Phone (optional)"
          onChange={e => isTyping(e.target)} />
      </div>
    )

    const message = (
      <div className={cx('field')}>
        <textarea
          name="message"
          rows="4"
          placeholder="Message"
          onChange={e => isTyping(e.target)} />
        <div className={cx('error')}>{hasErrors && validationErrors.message ? validationErrors.message : null}</div>
      </div>
    )

    const submitButton = (
      <div className={cx('submit')}>
        <button className={cx('btn')} onClick={this.onSubmit.bind(this)}>Send</button>
      </div>
    )

    return (
      <div className={cx('enquiry')}>
        {enquirySubmitted ? <div className={cx('success')}>Thanks for getting in touch.</div> : (
          <form className={cx('form')}>
            <div className={cx('header')}>Leave us a message</div>
            {name}
            {email}
            {phone}
            {message}
            {submitButton}
          </form>
        )}
      </div>
    )
  }
  onSubmit(e) {
    e.preventDefault()
    const { formData } = this.props

    enquirySubmit(formData)
  }
}

Enquiry.PropTypes = {
  hasErrors: PropTypes.bool,
  enquirySubmitted: PropTypes.bool,
  validationErrors: {
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
    phone: PropTypes.string
  },
  formData: {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    message: PropTypes.string
  }
}

export default connect(
  state => ({
    hasErrors: state.enquiry.hasErrors,
    enquirySubmitted: state.enquiry.enquirySubmitted,
    validationErrors: state.enquiry.validationErrors,
    formData: {
      name: state.enquiry.formData.name,
      email: state.enquiry.formData.email,
      phone: state.enquiry.formData.phone,
      message: state.enquiry.formData.message
    }
  })
)(Enquiry)