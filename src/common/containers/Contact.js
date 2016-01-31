import React from 'react';
import FormInput from '../components/FormInput';
import FormTextArea from '../components/FormTextArea';
import xhr from '../../client/xhr';

export default class Contact extends React.Component {
  constructor(props){
    super(props);

    this.inputs = [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: null
      }, {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: null
      }, {
        label: 'Phone',
        name: 'phone',
        type: 'text',
        placeholder: 'optional'
      }
    ];

    this.state = {
      fetching: false,
      completed: false,
      section: null,
      enquiryTypes: null,
      formData: null,
      validationErrors: null,
      enquirySubmitted: null
    }
  }
  componentDidMount() {
    this.setState({
      fetching: true
    });

    xhr('/api/contact')
      .then(res => res.json())
      .then(json => {
        this.setState({
          section: json.section,
          enquiryTypes: json.enquiryTypes,
          formData: json.formData,
          validationErrors: json.validationErrors,
          enquirySubmitted: json.enquirySubmitted,
          fetching: false,
          completed: true
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let content;
    if (!this.state.fetching && this.state.completed) {
      content = this.renderForm();
    } else if (this.state.fetching && !this.state.completed) {
      content = 'Loading...';
    }

    return (
      <div className="container">
        <h1>Contact Us</h1>
        {content}
      </div>
    );
  }
  renderForm() {
    return (
      <div>
        {this.inputs.map((input, i) => {
          return (
            <div key={i}>
              <label>{input.label}</label>
              <FormInput
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}
          <label>What are you contacting us about?</label>
          <select name="enquiryType" className="form-control">
            <option value="">(select one)</option>
            {this.state.enquiryTypes.map((enquiry, i) => {
              return <option key={i} value={enquiry.value}>{enquiry.label}</option>;
            })}
          </select>
          <FormTextArea
            name="message"
            placeholder="Leave us a message..."
            rows="4"
          />
          <button onClick={this.onSubmit} className="btn btn-primary">Send</button>

      </div>
    );
  }
  renderMessage() {
    return <h3>Thanks for getting in touch.</h3>;
  }
  onSubmit() {
    console.log(this.state.formData);
    this.setState({
      enquirySubmitted: true
    });
  }
}