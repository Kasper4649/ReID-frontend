import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 1000 * 5,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default request;
