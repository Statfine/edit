/**
 * Created by eastiming on 16/7/12.
 */
import merge from 'lodash/object/merge';
import * as ActionTypes from '../constant/actionType';
import { combineReducers } from 'redux';

function fetch({ types }) {
  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  const [requestType, successType, failureType, resetResponseType] = types;

  return function updateFetchStatus(state = { code: -1, isFetching: false, message: '', success: false }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, {
          code: -1,
          message: '',
          isFetching: true,
          success: false,
        });
      case successType:
        return merge({}, state, {
          isFetching: false,
          success: true,
        }, { ...action.response });
      case failureType:
        return merge({}, state, {
          success: false,
          isFetching: false,
          code: action.error.code || action.error.status_code,
          message: action.error.message,
          errors: action.error.errors,
        }, {
          code: action.error.code && isNaN(action.error.code) ? 500 : action.error.code,
        });
      case resetResponseType:
        return merge({}, {
          code: -1,
          message: '',
          success: false,
        });
      default:
        return state;
    }
  };
}

const fetchStatus = combineReducers({
  loginStatus: fetch({
    types: [
      ActionTypes.LOGIN_REQUEST,
      ActionTypes.LOGIN_SUCCESS,
      ActionTypes.LOGIN_FAILURE,
      ActionTypes.LOGIN_RESET_RESPONSE,
    ],
  }),
  registerStatus: fetch({
    types: [
      ActionTypes.REGISTER_REQUEST,
      ActionTypes.REGISTER_SUCCESS,
      ActionTypes.REGISTER_FAILURE,
      ActionTypes.REGISTER_RESET_RESPONSE,
    ],
  }),

});

export default fetchStatus;
