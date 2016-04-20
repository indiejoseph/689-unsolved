import React, { Component } from 'react';
import { Container } from 'flux/utils';

import Header from '../components/Header';
import Footer from '../components/Footer';
import List from '../components/List';
import UnsolvedStore from '../stores/UnsolvedStore';

class App extends Component {

  static getStores () {
    return [UnsolvedStore];
  }

  static calculateState (prevState) {
    return {
      items: UnsolvedStore.getState(),
      areAllComplete: UnsolvedStore.areAllComplete(),
    };
  }

  render () {
    return (<div id="App">
      <div className="wrapper">
        <Header />
        <List
          areAllComplete={this.state.areAllComplete}
          items={this.state.items}
        />
        <Footer items={this.state.items}/>
      </div>
    </div>);
  }
}

const AppContainer = Container.create(App);
export default AppContainer;
