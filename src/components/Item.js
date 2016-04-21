import Item from '../stores/Item';
import actions from '../actions/UnsolvedActions';
import { dispatch } from '../dispatcher/AppDispatcher';
import React, { Component } from 'react';
import TextInput from './TextInput';

import classnames from 'classnames';

export default class UnsolvedItem extends Component {
  constructor (props) {
    super(props);

    this.state = { isEditing: false };
  }

  static propTypes = {
    item: (props, propName, componentName) => {
      if (props[propName]) {
        let value = props[propName];
        if (!value instanceof Item) {
          return new Error(propName + ' in ' + componentName + ' is not a [Item]');
        }
      }

      return null;
    },
  };

  render () {
    const { item } = this.props;
    let input;

    if (this.state.isEditing) {
      input = (<TextInput
        className="edit"
        onSave={this._onSave.bind(this)}
        value={item.text}
      />);
    }

    let [text, ...subHeader] = item.text.split(' ');
    subHeader = subHeader.join(' ');

    return (
      <li
        className={classnames({
          completed: item.complete,
          editing: this.state.isEditing,
        })}
        key={item.id}>
        <div className="view">
          <div className="view-input">
            <input
              checked={item.complete}
              className="toggle"
              id={'checkbox-' + item.id}
              onChange={this._onToggleComplete.bind(this)}
              type="checkbox"
            />
          </div>
          <div className="view-text">
            <label htmlFor={'checkbox-' + item.id} onDoubleClick={this._onDoubleClick.bind(this)}>
              {text}<br/>
              <small>{subHeader}</small>
            </label>
            {input}
          </div>
          <div className="view-action">
            <button className="destroy fa fa-times" onClick={this._onDestroyClick.bind(this)} />
          </div>
        </div>
      </li>
    );
  }

  _onToggleComplete () {
    const { item } = this.props;
    if (item.complete) {
      dispatch({
        type: actions.UNSOLVED_UNDO_COMPLETE,
        id: item.id,
      });
    } else {
      dispatch({
        type: actions.UNSOLVED_COMPLETE,
        id: item.id,
      });
    }
  }

  _onDoubleClick () {
    this.setState({ isEditing: true });
  }

  _onSave (text) {
    const { item } = this.props;

    dispatch({
      type: actions.UNSOLVED_UPDATE_TEXT,
      id: item.id,
      text,
    });
    this.setState({ isEditing: false });
  }

  _onDestroyClick () {
    const { item } = this.props;
    dispatch({
      type: actions.UNSOLVED_DESTROY,
      id: item.id,
    });
  }
}
