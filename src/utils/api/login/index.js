import axios from "axios";

const origin = request.headers.get('Origin');
const allowedOrigins = ['http://localhost:5173', 'https://drazic-webdev.vercel.app'];
const URL = allowedOrigins.includes(origin) ? origin : 'null'

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${URL}/login`, email, password);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
};
