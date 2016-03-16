import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isTyping } from 'actions/enquiry';
import xhr from '../../client/xhr';

class Enquiry extends Component {
  constructor(props){
    super(props);

    this.state = {
      fetching: false,
      completed: false,
      section: null,
      validationErrors: null,
    }
  }
  render() {
    const content = this.props.enquirySubmitted ? this.renderMessage() : this.renderForm();

    return (
      <div className="contact">
        <div className="contact__header">Leave us a message</div>
        {content}
      </div>
    );
  }
  renderForm() {
    return (
      <form className="form">
        <div className="form__field">
          <input name="name" type="text" placeholder="Name" onChange={this.isTyping.bind(this)} />
        </div>

        <div className="form__field">
          <input name="email" type="email" placeholder="Email" onChange={this.isTyping.bind(this)} />
        </div>

        <div className="form__field">
          <input name="phone" type="text" placeholder="Phone (optional)" onChange={this.isTyping.bind(this)} />
        </div>

        <div className="form__field">
          <textarea name="message" rows="4" placeholder="Message" onChange={this.isTyping.bind(this)} />
        </div>

        <div className="form__field">
          <button className="button__red" onClick={this.onSubmit.bind(this)}>Send</button>
        </div>
      </form>
    );
  }
  isTyping(e) {
    this.props.dispatch(isTyping(e.target));
  }
  renderMessage() {
    return <h3>Thanks for getting in touch.</h3>;
  }
  onSubmit(e) {
    e.preventDefault();
    xhr.post('/api/contact', {
        name: { full: this.props.nameField },
        email: this.props.emailField,
        phone: this.props.phoneField,
        message: this.props.messageField,
        enquiryType: this.props.enquiryType
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
          enquirySubmitted: true,
          validationErrors: json.validationErrors
        })
      })
      .catch(err => console.log(err));
  }
}

Enquiry.PropTypes = {
  nameField: PropTypes.string,
  emailField: PropTypes.string,
  phoneField: PropTypes.string,
  messageField: PropTypes.string,
  enquiryType: PropTypes.string,
  enquirySubmitted: PropTypes.bool,
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
    validationErrors: state.enquiry.validationErrors
  };
}

export default connect(mapStateToProps)(Enquiry);