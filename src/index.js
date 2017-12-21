// Notes provided up to inclusion of Router.
// Router subsequently used to replace setVisibilityFilter in store
// via route params. Move to #9

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './components/App';
import Root from './components/Root';
import configureStore from './configureStore';

/**
 * We remove all the logic around configuring the store outside the root of the app
 * This makes for easier testing and better composition
 */
const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
);
