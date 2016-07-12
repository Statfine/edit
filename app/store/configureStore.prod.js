/**
 * Created by eastiming on 16/7/12.
 */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer';
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
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, checkToken, refreshToken, api, routerMdw)
  );
}
