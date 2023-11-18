import axios from 'axios';

const API_KEY = 'uHdEhxaYZHJa8g0cv7LDeygPcGL3Q76GRZbi8y78MLquH8OVenNomDev';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const fetchImage = await axios.get(`search?query=${query}&page=${page}`);
  return fetchImage.data;
};
