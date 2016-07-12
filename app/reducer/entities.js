/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import merge from 'lodash/object/merge';
import isEmpty from 'lodash/lang/isEmpty';
import arrayMove from 'lodash/array/remove';

const initialState = {
  videos: {},
};

function entities(state = initialState, action) {
  if (action.response && action.response.entities) {
    const cloneState = changeEntities(state, action);
    return merge({}, cloneState, action.response.entities);
  }

  return merge({}, state);
}

export default entities;