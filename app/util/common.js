/**
 * Created by eastiming on 16/7/12.
 */
import config from '../config';
import axios from 'axios';
import { camelizeKeys } from 'humps';
import merge from 'lodash/object/merge';
import * as storage from '../persistence/storage';
import normalize from './normalize';

const API_ROOT = config.apiRoot;

const axiosObj = axios.create({
  baseURL: API_ROOT,
});

// TODO: params format
export function callApi(endpoint, method, params, token, schema, mark, headersDefault = {}) {
  const headers = merge({
    'Content-Type': 'application/json',
    Accept: 'application/vnd.easub.v1+json',
  }, headersDefault);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axiosObj.request({
    method,
    url: endpoint,
    params: method === 'GET' ? params : {},
    data: method !== 'GET' ? params : {},
    headers,
  }).then(
    (response) => {
      if (response.data.code > 400) {
        throw response.data;
      }

      if (schema === undefined) {
        return camelizeKeys(response.data);
      }

      const data = normalize(response, schema, mark);
      return merge({}, data);
    }
  ).catch(
    (error) => {
      console.log(error);
      throw { ...error.data, statusText: error.statusText };
    }
  );
}

export function getExpiresTime(expiresIn = 7200) {
  return expiresIn + Math.round(+new Date() / 1000);
}

export function checkExpired(expiresIn) {
  return Math.round(+new Date() / 1000) > expiresIn;
}

export function setAuthInfoToStorage(info, rememberLogin = true) {
  storage.put('access_token', info.accessToken);
  storage.put('expires_in', getExpiresTime(info.expiresIn));
  if (rememberLogin) {
    storage.put('refresh_token', info.refreshToken);
  }
}

export function getAuthInfoFromStorage() {
  return {
    accessToken: storage.get('access_token') ? storage.get('access_token') : '',
    expiresIn: storage.get('expires_in') ? storage.get('expires_in') : 0,
    refreshToken: storage.get('refresh_token') ? storage.get('refresh_token') : '',
    thirdPartyLogin: storage.get('third_party_login'),
  };
}
