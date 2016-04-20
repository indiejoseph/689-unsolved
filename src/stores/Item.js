import Immutable from 'immutable';

const ItemRecord = Immutable.Record({
  id: undefined,
  complete: undefined,
  text: undefined,
});

export default class Item extends ItemRecord {
  id;
  complete;
  text;

  constructor (text) {
    super({
      id: Date.now() + Math.round(Math.random() * 1000),
      complete: false,
      text,
    });
  }
}
