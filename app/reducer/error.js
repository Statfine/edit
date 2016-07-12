/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import merge from 'lodash/object/merge';

export default function errorMessage(state = {}, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return {};
  } else if (type === ActionTypes.SET_MESSAGE) {
    return merge({}, state, action.status);
  } else if (error) {
    return action.error;
  }

  return state;
}
