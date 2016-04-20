import React, { Component, PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

export default class TextInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onSave: PropTypes.func
  }

  constructor (props) {
    super(props);

    // Default state
    this.state = { value: props.value || '' };
  }

  render () {
    return (
      <input
        autoFocus
        className={this.props.className}
        id={this.props.id}
        onBlur={this._save.bind(this)}
        onChange={this._onChange.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
        placeholder={this.props.placeholder}
        value={this.state.value}
      />
    );
  }

  _save () {
    this.props.onSave(this.state.value);
    this.setState({ value: '' });
  }

  _onChange (event) {
    this.setState({ value: event.target.value });
  }

  _onKeyDown (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
}
