/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import * as utils from '../util/common';
import * as storage from '../persistence/storage';

export default store => next => action => {
  const {
    application: {
      refreshingToken, auth: { refreshToken }, expired,
      },
    } = store.getState();

  const isThirdPartyLogin = storage.get('third_party_login');
  if (refreshToken.length <= 0 && action.goToRefreshToken && !expired
    && isThirdPartyLogin !== '1') {
    return next({ type: ActionTypes.EXPIRE, payload: true });
  }

  if (!refreshingToken &&
    refreshToken.length > 0 &&
    action.goToRefreshToken) {
    next({ type: ActionTypes.REFRESHING_TOKEN });
    const endpoint = 'auth/refresh_token';
    const method = 'POST';
    const params = { refresh_token: refreshToken };
    utils.callApi(endpoint, method, params).then(
      response => {
        next({
          type: ActionTypes.REFRESHED_TOKEN,
          payload: {
            ...response.data,
          },
        });
        next(action);
      },

      error => {
        next({ type: ActionTypes.EXPIRE, payload: true });
      }
    );
  } else {
    next(action);
  }
};
