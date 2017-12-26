import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import store from './stores';

import './styles/base.sass';
import Home from './containers/Home/Home';

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route component={ Home } />
        </Switch>
      </Router>

    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Home/Home', () => {
    const NextApp = require('./containers/Home/Home').default; // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,

      document.getElementById('app')
    );
  });
}
