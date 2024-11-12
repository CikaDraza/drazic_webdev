import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const loginUserWithVK = async (vkData) => {
  const { userId, token } = vkData;  // Extracting userId and token from vkData
  try {
    const response = await axios.get(`${API_BASE_URL}/login_user_with_vk/${userId}/${token}`);
    return response.data;
  } catch (error) {
    console.error('Social login error:', error);
    throw new Error('Login failed', error.message);
  }
};
