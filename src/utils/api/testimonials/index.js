import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

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

export const getTestimonialByUser = async (email) => {  
  try {
    const { data } = await axios.get(`${API_BASE_URL}/user-testimonials/${email}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTestimonial = async (testimonial) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`${API_BASE_URL}/testimonials`, testimonial, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!data) {
      throw new Error('Failed to create testimonial');
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTestimonial = async (id, testimonial) => {  
  try {
    const token = localStorage.getItem('token');
    console.log(id, testimonial, token);
    
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