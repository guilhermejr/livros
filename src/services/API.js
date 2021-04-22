import axios from 'axios';


const baseApi = () => {

  const { REACT_APP_API_URL } = process.env;
    
  const api = axios.create({ 
    baseURL: REACT_APP_API_URL,
  });
  
  return api;
}

export default baseApi;