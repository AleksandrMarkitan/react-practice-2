import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = '6f3a72a470b06bab99f8d69f54b4e2d3';

export const fetchApi = page => {
  return axios('trending/movie/day', { params: { page, api_key: API_KEY } });
};
