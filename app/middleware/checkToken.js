/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import * as utils from '../util/common';
import { merge } from 'lodash';

export default store => next => action => {
  const state = store.getState();
  const { application: { auth: { expiresIn } } } = state;

  if (utils.checkExpired(expiresIn)) {
    return next(merge({}, action, { goToRefreshToken: true }));
  }

  if (action.type === ActionTypes.REFRESHED_TOKEN) {
    return next(merge({}, action, { goToRefreshToken: false }));
  }

  next(action);
};
