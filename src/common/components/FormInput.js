import React from 'react';

export default class FormInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: props.name,
      type: props.type,
      placeholder: props.placeholder,
      value: ''
    }
  }
  render() {
    return (
      <div {...this.props}>
        <input
          type={this.state.type}
          name={this.state.name}
          value={this.state.value}
          placeholder={this.state.placeholder}
          onBlur={this.onBlur.bind(this)}
          onChange={this.isTyping.bind(this)}
        />
      </div>
    );
  }
  onBlur(e) {
    this.setState({
      editing: false,
      value: e.target.value
    });
  }
  isTyping(e) {
    this.setState({
      editing: true,
      value: e.target.value
    })
  }
}