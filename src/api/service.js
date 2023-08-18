import ReactNativeBlobUtil from 'react-native-blob-util';
import { DeviceEventEmitter } from 'react-native';
import { BASE_URL } from '@env';
import { appStateEvents } from '../common/types';

const service = async ({
  path = '',
  params = {},
  headers = {},
  body = {},
  fullUrl,
  method = 'GET',
  baseUrl = BASE_URL,
  type,
}) => {
  const paramsStr = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  const url = `${fullUrl || `${baseUrl}/${path}`}?${paramsStr}`;

  const fetchConfig = {
    method,
    headers,
  };

  if (method === 'POST' && headers['Content-Type'] === 'multipart/form-data') {
    fetchConfig.body = body;
  } else if (method !== 'GET') {
    fetchConfig.body = JSON.stringify(body);
  }

  let logOutListener;
  try {
    const task = ReactNativeBlobUtil.fetch(
      fetchConfig.method,
      url,
      fetchConfig.headers,
      fetchConfig.body,
    );
    logOutListener = DeviceEventEmitter.addListener(
      appStateEvents.LOG_OUT,
      () => task.cancel(),
    );
    const response = await task;

    let responseJson = {};

    // No Content is not returned
    if (response.respInfo.status !== 204 && response.respInfo.status !== 202) {
      const text = await response.text();
      responseJson = getJson(text);
    }

    if (response.respInfo.status >= 400) {
      throw new Error(response.respInfo.status);
    }

    if (type === 'blob') {
      return { ...responseJson, data: response.data };
    }
    return responseJson;
  } catch (err) {
    logOutListener.remove();
    throw err;
  }
};

export const getJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

export default service;
