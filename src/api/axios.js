import axios from 'axios';
import { Loading } from 'element-ui';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 1000 * 5,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.3)'
  })
}

function endLoading() {
  loading.close();
}

request.interceptors.request.use(config => {
  startLoading();
  return config;
}, error => {
  return Promise.reject(error);
})

request.interceptors.response.use(response => {
  endLoading();
  return response;
}, error => {
  endLoading();
  return Promise.reject(error);
})

export default request;
