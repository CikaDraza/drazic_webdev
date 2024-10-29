import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const sendContactForm = async (contactData) => {  
  try {
    const { data } = await axios.post(`${API_BASE_URL}/send_email`, {
      headers: {
        'Content-Type': 'application/json',
      },
      contactData,
    });
    if (!data) {
      throw new Error('Failed to send emial');
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to send contact form');
  }
};
