import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const loginUserWithVK = async (vkData) => {
  const { userId, jwtToken } = vkData;
  try {
    const response = await axios.post(`${API_BASE_URL}/login_user_with_vk/${userId}`, userId, jwtToken);
    return response.data;
  } catch (error) {
    console.error('Social login error:', error);
    throw new Error('Login failed', error.message);
  }
};
