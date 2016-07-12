/**
 * Created by eastiming on 16/7/12.
 */
import * as ActionTypes from '../constant/actionType';
import merge from 'lodash/object/merge';
import * as storage from '../persistence/storage';
import * as utils from '../util/common';
import has from 'lodash/object/has';

const initialState = {
  auth: {
    accessToken: '',
    tokenType: '',
    expiresIn: '',
    refreshToken: '',
    oauth2Token: '',
    oauth2Party: '',
    isBind: '',
  },
  emailVerify: false,
  expired: true,
  isThirdParty: false,
  refreshingToken: false,
  locale: 'zh',
  logout: false,
  isSignOut: false,
  verifies: {
    pubVerify: {
      verifyState: 0,
    },
    subVerify: {
      verifyState: 0,
    },
  },
  UserProfileInEditor: {},
};

export function application(state = initialState, action) {
  if (has(action, 'error.statusText') && action.error.statusText === 'Unauthorized') {
    storage.clear();
    return merge({}, state, {
      expired: true,
    });
  }

  switch (action.type) {
    case ActionTypes.INIT_STORAGE_INFO:
      const auth = utils.getAuthInfoFromStorage();
      const expired = utils.checkExpired(auth.expiresIn);
      return merge({}, state, {
        auth,
        expired,
      });
    case ActionTypes.REGISTER_SUCCESS:
      return merge({}, state, {
        emailVerify: true,
      });
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REFRESHING_TOKEN:
      return merge({}, state, {
        refreshingToken: true,
      });
    case ActionTypes.REFRESHED_TOKEN:
      utils.setAuthInfoToStorage(action.payload, true);
      return merge({},
        state, {
          auth: { ...action.payload,
            expiresIn: utils.getExpiresTime(action.payload.expiresIn),
          },
          expired: false,
          refreshingToken: false,
        });
    case ActionTypes.USER_INFO_SUCCESS:
      return merge({}, state, action.response.data);
    case ActionTypes.USER_PROFILE_SUCCESS:
      const {
        avatar,
        birthday,
        city,
        country,
        email,
        name,
        nativeLanguage,
        proficientLanguages,
        sex,
        tags,
        } = action.response.data;
      return merge({}, state, action.response.data, {
        UserProfileInEditor: {
          avatar,
          birthday,
          city,
          country,
          email,
          name,
          nativeLanguage,
          proficientLanguages,
          sex,
          tags,
        },
      });
    case ActionTypes.SIGN_OUT:
      storage.clear();
      return merge({}, state, {
        isSignOut: true,
      });
    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.LOGOUT_FAILURE:
      return merge({}, state, {
        logout: true,
      });
    default:
      return state;
  }
}
