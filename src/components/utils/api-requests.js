import axios from 'axios';

export const baseUrl = 'https://dummyjson.com/users';

export const get = () => {
  return axios.get(baseUrl);
};

export const post = (url, body) => {
  return axios.post(baseUrl + url, body);
};

export const put = (url, body) => {
  return axios.put(baseUrl + url, body);
};

export const deleteReq = (url, body) => {
  return axios.delete(baseUrl + url, body);
};
