import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isTyping, enquiryReceived, enquirySubmit } from 'actions/enquiry';
import xhr from '../../client/xhr';

class Enquiry extends Component {
  constructor(props){
    super(props);

  }
  render() {

    return (
      <div className="contact">
          {this.props.enquirySubmitted ? <h3>Thanks for getting in touch.</h3> : (
            <form className="form">
              <div className="contact__header">Leave us a message</div>
              <div className="form__field">
                <input name="name" type="text" placeholder="Name" onChange={this.isTyping.bind(this)} />
                {this.props.hasErrors ? <div>{this.props.validationErrors.name}</div> : null}
              </div>

              <div className="form__field">
                <input name="email" type="email" placeholder="Email" onChange={this.isTyping.bind(this)} />
                {this.props.hasErrors ? <div>{this.props.validationErrors.email}</div> : null}
              </div>

              <div className="form__field">
                <input name="phone" type="text" placeholder="Phone (optional)" onChange={this.isTyping.bind(this)} />
              </div>

              <div className="form__field">
                <textarea name="message" rows="4" placeholder="Message" onChange={this.isTyping.bind(this)} />
                {this.props.hasErrors ? <div>{this.props.validationErrors.message}</div> : null}
              </div>

              <div className="form__field">
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
  validationErrors: PropTypes.object,
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
    hasErrors: state.enquiry.hasErrors
  };
}

export default connect(mapStateToProps)(Enquiry);