import axios from "axios";

const API_BASE_URL = 'https://drazic-webdev-server.vercel.app/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const getProjects = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/projects`);
    if (data.length === 0) {
      throw new Error('Failed to fetch projects');
    }
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProjectById = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/projects/${id}`);
    if (!data) {
      throw new Error('Failed to fetch project');
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProject = async (project) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/projects/create`, project, {
      headers: getAuthHeaders(),
    });
    
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};


export const updateProject = async (id, project) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, project, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.data) {
      throw new Error('Failed to update project');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};