import axios from "axios";

const URL = process.env.NODE_ENV === 'production'
? 'https://drazic-webdev.vercel.app'
: 'http://localhost:5173';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'null',
  };
};

export const getProjects = async () => {
  try {
    const { data } = await axios.get(`${URL}/api/projects`);
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
    const { data } = await axios.get(`${URL}/api/projects/${id}`);
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
    const response = await axios.post(`${URL}/api/create_project`, project, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};


export const updateProject = async (id, project) => {
  try {
    const response = await axios.put(`${URL}/api/projects/${id}`, project, {
      headers: getAuthHeaders(),
      method: 'PUT',
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

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${URL}/api/projects/${projectId}`, {
      headers: getAuthHeaders(),
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete project');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    return null;
  }
};