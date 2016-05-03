import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { observeRefs } from 'actions/enquiry'
import classNames from 'classnames/bind'
import css from 'less/components/enquiry.less'

const cx = classNames.bind(css)

class Enquiry extends Component {

  componentDidMount() {
    observeRefs({
      name: this.name,
      email: this.email,
      message: this.message,
      button: this.button
    })(this.context.store)
  }

  errorHandler = propName => {
    if (this.props.hasErrors) {
      return this.props.validationErrors[propName]
    }

    return null
  };

  render() {
    const nameField = (
      <div className={cx('field')}>
        <input name="name" type="text" placeholder="Name" ref={i => this.name = i} />
        <div className={cx('error')}>{this.errorHandler('name')}</div>
      </div>)
    const emailField = (
      <div className={cx('field')}>
        <input name="email" type="email" placeholder="Email" ref={i => this.email = i} />
        <div className={cx('error')}>{this.errorHandler('email')}</div>
      </div>)
    const messageField = (
      <div className={cx('field')}>
        <textarea name="message" rows="4" placeholder="Message" ref={i => this.message = i} />
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
  dispatch: PropTypes.func,
  getState: PropTypes.func
}

Enquiry.contextTypes = {
  store: PropTypes.object
}

export default connect(
  state => ({
    hasErrors: state.enquiry.hasErrors,
    enquirySubmitted: state.enquiry.enquirySubmitted,
    validationErrors: state.enquiry.validationErrors,
    formData: state.enquiry.formData
  })
)(Enquiry)