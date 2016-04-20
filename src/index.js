import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App';

// App Styles
import './styles/app.sass';

const rootElement = document.getElementById('root');

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(<App />, rootElement);
