/**
 * Created by eastiming on 16/7/12.
 */
import { CALL_API } from '../constant';
import * as ActionTypes from '../constant/actionType';
import * as storage from '../persistence/storage';
import merge from 'lodash/object/merge';
import { Schemas } from '../persistence/schema';
import sha1 from 'sha1';

export function initStorageInfo() {
  return { type: ActionTypes.INIT_STORAGE_INFO };
}

export function checkTokenExpire() {
  return { type: ActionTypes.CHECK_TOKEN };
}

export function login({ email, password }, remember) {
  return {
    [CALL_API]: {
      types: [
        ActionTypes.LOGIN_REQUEST,
        ActionTypes.LOGIN_SUCCESS,
        ActionTypes.LOGIN_FAILURE,
        ActionTypes.LOGIN_RESET_RESPONSE,
      ],
      endpoint: 'auth/login',
      method: 'POST',
      params: merge({}, { email, password: sha1(password) }),
    },
    remember,
  };
}

export function logout() {
  return {
    [CALL_API]: {
      types: [
        ActionTypes.LOGOUT_REQUEST,
        ActionTypes.LOGOUT_SUCCESS,
        ActionTypes.LOGOUT_FAILURE,
      ],
      endpoint: 'auth/logout',
      method: 'GET',
    },
  };
}

export function fetchUserInfo() {
  return {
    [CALL_API]: {
      types: [
        ActionTypes.USER_INFO_REQUEST,
        ActionTypes.USER_INFO_SUCCESS,
        ActionTypes.USER_INFO_FAILURE,
      ],
      endpoint: 'account',
      method: 'GET',
    },
  };
}

export function signOut() {
  return {
    type: ActionTypes.SIGN_OUT,
  };
}

export function resetApiResponse(type = ActionTypes.API_RESET_RESPONSE) {
  return { type };
}

export function initExpires() {
  const expiresIn = storage.get('expires_in');
  const accessToken = storage.get('access_token');
  return {
    type: ActionTypes.INIT_EXPIRES,
    payload: merge({}, { accessToken, expiresIn }),
  };
}

export function clearErrorMsg() {
  return {
    type: ActionTypes.RESET_ERROR_MESSAGE,
  };
}

/*
 *  params:
 *   msg  显示内容
 *   code 0成功状态  非0 失败状态
 * */
export function setMsg(msg, code) {
  return {
    type: ActionTypes.SET_MESSAGE,
    status: {
      message: msg,
      code: code,
    },
  };
}
