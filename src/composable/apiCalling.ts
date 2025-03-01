import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://qr-menu-backend-hxlj.onrender.com/api',
  timeout: 10000,
});

export const fetchData = async (endpoint: string) => {
  const response = await apiClient.get(endpoint);
  return response.data;
};

export const fetchFoodData = async () => {
  return await fetchData('/foods/by-category');
};
