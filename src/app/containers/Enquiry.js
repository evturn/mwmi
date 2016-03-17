import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isTyping, enquiryReceived, enquirySubmit } from 'actions/enquiry';

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

    this.props.dispatch(enquirySubmit(this.props.formData));
  }
}

Enquiry.PropTypes = {
  error: PropTypes.string,
  hasErrors: PropTypes.bool,
  section: PropTypes.string,
  enquiryTypes: PropTypes.string,
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
  },
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    errors: state.enquiry.errors,
    hasErrors: state.enquiry.hasErrors,
    section: state.enquiry.section,
    enquiryTypes: state.enquiry.enquiryTypes,
    enquirySubmitted: state.enquiry.enquirySubmitted,
    validationErrors: {
      name: state.enquiry.validationErrors.name,
      email: state.enquiry.validationErrors.email,
      message: state.enquiry.validationErrors.message,
      phone: state.enquiry.validationErrors.phone
    },
    formData: {
      name: state.enquiry.formData.name,
      email: state.enquiry.formData.email,
      phone: state.enquiry.formData.phone,
      message: state.enquiry.formData.message
    }
  };
}

export default connect(mapStateToProps)(Enquiry);