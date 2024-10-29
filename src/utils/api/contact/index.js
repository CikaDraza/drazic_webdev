import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

export const sendContactForm = async (contactData) => {  
  try {
    const response = await fetch(`${API_BASE_URL}/send_email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: contactData,
    });
    if (!response.data) {
      throw new Error('Failed to send emial');
    }
    return response.data;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw new Error('Failed to send contact form');
  }
};
