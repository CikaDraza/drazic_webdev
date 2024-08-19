import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in localStorage');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const getTestimonials = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/testimonials`);
    if (data.length === 0) {
      throw new Error('Failed to fetch testimonials');
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTestimonialByUser = async () => {
  try {
    const headers = getAuthHeaders();
    console.log('Headers being sent:', headers); // Log the headers to be sent

    // Pass the headers as the second argument to axios.get
    const { data } = await axios.get(`${API_BASE_URL}/testimonials/user`, {
      headers: headers,
    });
    if (!data) {
      throw new Error('Failed to fetch testimonials');
    }
    return data;
  } catch (error) {
    console.error('Error in getTestimonialByUser:', error);
    return null;
  }
};

export const createTestimonial = async (testimonial) => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) {
      throw new Error('Failed to create testimonial');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTestimonial = async (id, testimonial) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/testimonials/${id}`, testimonial, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.data) {
      throw new Error('Failed to update testimonial');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete testimonial');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};