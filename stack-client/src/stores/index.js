import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Axios from 'axios'
import logger from 'redux-logger';
import reducers from '../reducers';

const middleware = applyMiddleware(thunk, logger);
window.store = createStore(reducers, middleware);

if (module.hot) { module.hot.accept('../reducers', () => { store.replaceReducer(require('../reducers')); }); }


Axios.get('/users/me', { withCredentials: true }).then(function (response) {
  if (response.data.authenticated) {
    store.dispatch({ type: 'USER_LOGGED_IN' });
  }
})

export default store;
