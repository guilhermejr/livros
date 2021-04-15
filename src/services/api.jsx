import axios from 'axios';

const baseApi = () => {
    
  const api = axios.create({ 
    baseURL: 'http://localhost:8080/',
  });
  
  return api;
}

export default baseApi;