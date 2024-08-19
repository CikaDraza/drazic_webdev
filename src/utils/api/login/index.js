import axios from "axios";

const origin = process.env.NODE_ENV === 'production'
const API_BASE_URL = origin ? 'https://drazic-webdev.vercel.app' : 'http://localhost:3000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, email, password);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};
