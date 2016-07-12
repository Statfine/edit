/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import * as utils from '../util/common';
import { has, merge } from 'lodash';
import { CALL_API } from '../constant';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (callAPI === undefined) {
    return next(action);
  }

  const { endpoint, method, params, schema, mark, headers } = callAPI;
  let { types } = callAPI;

  if (!types) {
    types = [
      ActionTypes.API_REQUEST,
      ActionTypes.API_SUCCESS,
      ActionTypes.API_FAILURE,
    ];
  }

  const [requestType, successType, failureType] = types;

  function actionWith(data) {
    const finalAction = merge({}, action, data);

    delete finalAction[CALL_API];

    if (finalAction.type === requestType) {
      delete finalAction.updateEntities;
      delete finalAction.deleteEntities;
    }

    return finalAction;
  }

  next(actionWith({ type: requestType, params: params }));

  const state = store.getState();
  let accessToken = null;
  if (has(state, 'application.auth.accessToken')) {
    accessToken = state.application.auth.accessToken;
  }

  return utils.callApi(endpoint, method, params, accessToken, schema, mark, headers).then(
    response => {
      next(actionWith({ response, type: successType }));
    },

    error => next(actionWith(
      {
        type: failureType,
        error: error || {
          data: 'Something bad happened',
          code: 520,
        },
      })
    )
  );
};
