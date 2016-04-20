'use strict';

import actions from '../actions/UnsolvedActions';
import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Item from './Item';
import AppDispatcher from '../dispatcher/AppDispatcher';
import db from './689.json';

// Pure helper function to create a new Todo and add it to the state.
function createUnsolved (state, text) {
  if (!text) {
    return state;
  }
  var newItem = new Item(text);
  return state.set(newItem.id, newItem);
}

export default class UnsolvedStore extends ReduceStore {
  getInitialState () {
    let initalState = Immutable.OrderedMap();

    db.forEach(record => {
      initalState = createUnsolved(initalState, record);
    });

    return initalState;
  }

  reduce (state, action) {
    switch (action.type) {
    case actions.UNSOLVED_COMPLETE:
      return state.setIn([action.id, 'complete'], true);

    case actions.UNSOLVED_CREATE:
      return createUnsolved(state, action.text);

    case actions.UNSOLVED_DESTROY:
      return state.delete(action.id);

    case actions.UNSOLVED_DESTROY_COMPLETED:
      return state.filter(unsolved => !unsolved.complete);

    case actions.UNSOLVED_TOGGLE_COMPLETE_ALL:
      const setCompleted = !this.areAllComplete();
      return state.map(unsolved => unsolved.set('complete', setCompleted));

    case actions.UNSOLVED_UNDO_COMPLETE:
      return state.setIn([action.id, 'complete'], false);

    case actions.UNSOLVED_UPDATE_TEXT:
      return state.setIn([action.id, 'text'], action.text.trim());

    default:
      return state;
    }
  }

  areAllComplete () {
    return this.getState().every(unsolved => unsolved.complete);
  }
}

// Export a singleton instance of the store, could do this some other way if
// you want to avoid singletons.
export default new UnsolvedStore(AppDispatcher);
