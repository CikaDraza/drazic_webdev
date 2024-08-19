import axios from "axios";

const URL = process.env.NODE_ENV === 'production'
? 'https://drazic-webdev.vercel.app'
: 'http://localhost:5173';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${URL}/api/login`, email, password);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};
