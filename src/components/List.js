import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';

import actions from '../actions/UnsolvedActions';
import { dispatch } from '../dispatcher/AppDispatcher';
import Item from './Item';

export default class List extends Component {
  static propTypes = {
    items: ImmutablePropTypes.map,
    areAllComplete: PropTypes.bool
  };

  render () {
    const { items, areAllComplete } = this.props;
    const unsolvedItems = [];

    if (items.size === 0) {
      return null;
    }

    for (let [id, item] of items) {
      unsolvedItems.unshift(<Item item={item} key={id} />);
    }

    return (
      <section id="List">
        <div className="List-actions">
          <input
            checked={areAllComplete ? 'checked' : ''}
            id="toggle-all"
            onChange={this._onToggleCompleteAll.bind(this)}
            type="checkbox"
          />
        <label htmlFor="toggle-all">一次過解決</label>
        </div>
        <ul className="List-items">{unsolvedItems}</ul>
      </section>
    );
  }

  _onToggleCompleteAll () {
    dispatch({ type: actions.UNSOLVED_TOGGLE_COMPLETE_ALL });
  }
}
