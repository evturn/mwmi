import React from 'react';
import xhr from '../../client/xhr';

export default class Contact extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fetching: false,
      completed: false,
      section: null,
      enquiryType: 'message',
      validationErrors: null,
      enquirySubmitted: false,
      nameField: null,
      emailField: null,
      phoneField: null,
      messageField: null
    }
  }
  render() {
    const content = this.state.enquirySubmitted ? this.renderMessage() : this.renderForm();

    return (
      <div className="container">
        <h1>Contact Us</h1>
        {content}
      </div>
    );
  }
  renderForm() {
    return (
      <form>
        <label>Name</label>
        <input name="name" type="text" onChange={this.isTyping.bind(this)} />

        <label>Email</label>
        <input name="email" type="email" onChange={this.isTyping.bind(this)} />

        <label>Phone</label>
        <input name="phone" type="text" placeholder="optional" onChange={this.isTyping.bind(this)} />

        <label>Message</label>
        <textarea name="message" rows="4" placeholder="Leave us a message..." onChange={this.isTyping.bind(this)} />

        <button onClick={this.onSubmit.bind(this)}>Send</button>
      </form>
    );
  }
  isTyping(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({
          nameField: e.target.value
        });
        break;
      case 'email':
        this.setState({
          emailField: e.target.value
        });
        break;
      case 'phone':
        this.setState({
          phoneField: e.target.value
        });
        break;
      case 'message':
        this.setState({
          messageField: e.target.value
        });
        break;
    }
  }
  renderMessage() {
    return <h3>Thanks for getting in touch.</h3>;
  }
  onSubmit(e) {
    e.preventDefault();
    xhr.post('/api/contact', {
        name: { full: this.state.nameField },
        email: this.state.emailField,
        phone: this.state.phoneField,
        message: this.state.messageField,
        enquiryType: this.state.enquiryType
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