import React from 'react';

export default class FormTextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      name: props.name,
      placeholder: props.placeholder,
      rows: props.rows,
      value: ''
    }
  }
  render() {
    return (
      <div {...this.props}>
        <textarea
          name={this.state.name}
          rows={this.state.rows}
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