import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (endpoint: string, params: object) => {
  try {
    const response = await apiClient.post(endpoint, params);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchFoodData = async (params: object) => {
  return await fetchData('/foods/by-webid', params);
};

export const fetchAllUsers = async () => {
  return await fetchData('auth/users', {});
};
