import { dispatch } from '../dispatcher/AppDispatcher';
import actions from '../actions/UnsolvedActions';
import React, { Component } from 'react';
import TextInput from './TextInput';

export default class Header extends Component {
  render () {
    return (
      <header id="Header">
        <h1>梁振英未解決</h1>
        <div className="Header-input">
          <TextInput
            id="new-todo"
            onSave={this._onSave}
            placeholder="仲有咩未解決?"
          />
        </div>
      </header>
    );
  }

  _onSave (text) {
    if (text.trim()) {
      dispatch({
        type: actions.UNSOLVED_CREATE,
        text,
      });
    }
  }
}
