import axios from "axios";

const API_BASE_URL = 'http://localhost:3000/api';

export const sendContactForm = async (contactData) => {
  const formData = contactData;
  try {
    const { data } = await axios.post(`${API_BASE_URL}/send_email`, formData);
    if (!data) {
      throw new Error('Failed to send emial');
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to send contact form');
  }
};
