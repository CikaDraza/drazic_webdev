import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const sendContactForm = async (contactData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send-email`, contactData);
    return response.data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to send contact form');
  }
};
