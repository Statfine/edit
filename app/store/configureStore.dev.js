/**
 * Created by eastiming on 16/7/12.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';
import DevTools from '../Root/DevTools';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { checkToken, refreshToken, api } from '../middleware';

export default function configureStore(initialState) {
  let history = null;
  if (process.env.RUNTIME === 'web') {
    const { browserHistory } = require('react-router');
    history = browserHistory;
  } else {
    const { hashHistory } = require('react-router');
    history = hashHistory;
  }

  const routerMdw = routerMiddleware(history);
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, checkToken, refreshToken, api, routerMdw),
      applyMiddleware(createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
