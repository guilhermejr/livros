import axios from 'axios';
import { getToken } from './auth';

const baseApi = () => {

  const { REACT_APP_API_URL } = process.env;
    
  const api = axios.create({ 
    baseURL: REACT_APP_API_URL,
  });

  api.interceptors.request.use(async (config) => {

    const token = getToken();

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  });
  
  return api;
}

export default baseApi;