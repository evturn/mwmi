import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import classNames from 'classnames/bind'

import css from './styles.css'

const cx = classNames.bind(css)

class Enquiry extends Component {

  componentDidMount() {
    this.props.observeRefs({
      name: this.name,
      email: this.email,
      message: this.message,
      button: this.button
    })
  }

  errorHandler = propName => {
    if (this.props.hasErrors) {
      return this.props.validationErrors[propName]
    }

    return null
  }

  render() {
    const nameField = (
      <div className={cx('field')}>
        <input
          className={css.input}
          name="name"
          type="text"
          placeholder="Name"
          ref={i => this.name = i}
        />
        <div className={cx('error')}>{this.errorHandler('name')}</div>
      </div>)
    const emailField = (
      <div className={cx('field')}>
        <input className={css.input} name="email" type="email" placeholder="Email" ref={i => this.email = i} />
        <div className={cx('error')}>{this.errorHandler('email')}</div>
      </div>)
    const messageField = (
      <div className={cx('field')}>
        <textarea className={css.textarea} name="message" rows="4" placeholder="Message" ref={i => this.message = i} />
        <div className={cx('error')}>{this.errorHandler('message')}</div>
      </div>)
    const submitButton = (
      <div className={cx('submit')}>
        <button className={cx('btn')} ref={i => this.button = i}>Send</button>
      </div>)

    return (
      <div className={cx('enquiry')}>
        {this.props.enquirySubmitted ? (
          <div className={cx('success')}>Thanks for getting in touch.</div>
        ) : (
          <div className={cx('form')}>
            <div className={cx('header')}>Leave us a message</div>
            {nameField}
            {emailField}
            {messageField}
            {submitButton}
          </div>
        )}
      </div>
    )
  }

}

Enquiry.propTypes = {
  hasErrors: PropTypes.bool,
  enquirySubmitted: PropTypes.bool,
  formData: PropTypes.object,
  validationErrors: PropTypes.object,
}

Enquiry.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => ({
    hasErrors: state.app.enquiry.hasErrors,
    enquirySubmitted: state.app.enquiry.enquirySubmitted,
    validationErrors: state.app.enquiry.validationErrors,
    formData: state.app.enquiry.formData
  }),
  dispatch => {
    observeRefs: props => dispatch(actions.observeRefs(props))
  }
)(Enquiry)
