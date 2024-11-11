import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const loginUserWithVK = async (vkData) => {
  try {
    const { token, email } = vkData; // Assuming these are the fields provided by VK
    const response = await axios.post(`${API_BASE_URL}/login_user_whit_vk`, {
      email, // Optional, based on your backend needs
      token,
      provider: 'vk' // Indicate the authentication provider
    });
    return response.data;
  } catch (error) {
    console.error('Social login error:', error);
    throw new Error('Login failed');
  }
};