import axios from 'axios';
import { toast } from 'react-toastify';
import router from '../router';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.access_token;
    // Inject token to any request except /auth/login if token exists
    if (!config.url.includes('/auth/login') && accessToken) {
      config.headers.set({
        Authorization: `Bearer ${accessToken}`,
      });
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    toast('Your token was invalid, please login again!', { type: 'error' });
    localStorage.clear();
    router.navigate('/login');
    return Promise.reject(error);
  },
);

export default http;
