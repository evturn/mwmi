import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isTyping, enquiryReceived, enquirySubmit } from 'actions/enquiry';
import xhr from '../../client/xhr';

class Enquiry extends Component {
  constructor(props){
    super(props);

  }
  render() {
    const { validationErrors, hasErrors, enquirySubmitted } = this.props;

    return (
      <div className="enquiry">
        {enquirySubmitted ? <div className="enquiry__success">Thanks for getting in touch.</div> : (
          <form className="enquiry__form">
            <div className="enquiry__header">Leave us a message</div>
            <div className="enquiry__form-field">
              <input name="name" type="text" placeholder="Name" onChange={this.isTyping.bind(this)} />
              <div className="enquiry__form-error">{hasErrors && validationErrors.name ? validationErrors.name : null}</div>
            </div>

            <div className="enquiry__form-field">
              <input name="email" type="email" placeholder="Email" onChange={this.isTyping.bind(this)} />
              <div className="enquiry__form-error">{hasErrors && validationErrors.email ? validationErrors.email : null}</div>
            </div>

            <div className="enquiry__form-field">
              <input name="phone" type="text" placeholder="Phone (optional)" onChange={this.isTyping.bind(this)} />
            </div>

            <div className="enquiry__form-field">
              <textarea name="message" rows="4" placeholder="Message" onChange={this.isTyping.bind(this)} />
              <div className="enquiry__form-error">{hasErrors && validationErrors.message ? validationErrors.message : null}</div>
            </div>

            <div className="enquiry__form-submit">
              <button className="button__red" onClick={this.onSubmit.bind(this)}>Send</button>
            </div>
          </form>
        )}
      </div>
    );
  }
  isTyping(e) {
    this.props.dispatch(isTyping(e.target));
  }
  onSubmit(e) {
    e.preventDefault();

    this.props.dispatch(enquirySubmit({
      name: { full: this.props.nameField },
      email: this.props.emailField,
      phone: this.props.phoneField,
      message: this.props.messageField,
      enquiryType: this.props.enquiryType
    }));
  }
}

Enquiry.PropTypes = {
  nameField: PropTypes.string,
  emailField: PropTypes.string,
  phoneField: PropTypes.string,
  messageField: PropTypes.string,
  enquiryType: PropTypes.string,
  enquirySubmitted: PropTypes.bool,
  validationErrors: {
    name: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string
  },
  error: PropTypes.string,
  hasErrors: PropTypes.bool,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    nameField: state.enquiry.nameField,
    emailField: state.enquiry.emailField,
    phoneField: state.enquiry.phoneField,
    messageField: state.enquiry.messageField,
    enquiryType: state.enquiry.enquiryType,
    enquirySubmitted: state.enquiry.enquirySubmitted,
    validationErrors: state.enquiry.validationErrors,
    hasErrors: state.enquiry.hasErrors,
    errors: state.enquiry.errors
  };
}

export default connect(mapStateToProps)(Enquiry);