import axios from "axios";

const API_BASE_URL = 'https://pmkzbb1zs8.execute-api.eu-central-1.amazonaws.com/prod';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, email, password);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};
