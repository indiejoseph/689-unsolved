import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component } from 'react';

import actions from '../actions/UnsolvedActions';
import { dispatch } from '../dispatcher/AppDispatcher';

export default class Footer extends Component {
  static propTypes = {
    items: ImmutablePropTypes.map
  };

  render () {
    const { items } = this.props;

    if (items.size === 0) {
      return null;
    }

    const completed = items.reduce((x, todo) => todo.complete ? x + 1 : x, 0);
    const itemsLeft = items.size - completed;

    let clearCompletedButton;
    if (completed > 0) {
      clearCompletedButton = (
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick.bind(this)}>
          清走已解決 ({completed})
        </button>
      );
    }

    return (
      <footer id="Footer">
        <span className="Footer-count">
          <strong>{itemsLeft}</strong> 件事未解決
        </span>
        {clearCompletedButton}
      </footer>
    );
  }

  _onClearCompletedClick () {
    dispatch({ type: actions.UNSOLVED_DESTROY_COMPLETED });
  }
}
