/**
 * Created by eastiming on 16/7/12.
 */
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { application } from './application';
import entities from './entities';
import fetchStatus from './fetch';
import errorMessage from './error';

const rootReducer = combineReducers({
  application,
  entities,
  fetchStatus,
  errorMessage,
  routing,
});

export default rootReducer;