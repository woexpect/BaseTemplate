import AsyncStorage from '@react-native-async-storage/async-storage';
import service from './service';

// Common utils
const defaultHeadersNoAuth = {
  'Content-Type': 'application/json',
};

const defaultHeaders = async () => {
  const token = await AsyncStorage.getItem('accessToken');

  return {
    ...defaultHeadersNoAuth,
    Authorization: `Bearer ${token || ''}`,
  };
};

// Auth
export const auth = async (body) => {
  const response = await service({
    path: 'login',
    body,
    headers: defaultHeadersNoAuth,
    method: 'POST',
  });

  return response;
};

// User
export const getUserProfile = async () => {
  const response = await service({
    path: 'profile',
    headers: await defaultHeaders(),
  });

  return response;
};