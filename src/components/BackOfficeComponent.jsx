import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject, updateProject, createProject } from '../utils/api/projects';

const BackOffice = () => {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteProject(id);
    if (success) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setEditProject(project);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditProject(null);
  };

  const handleUpdate = async () => {
    try {
      const updatedProject = {
        ...editProject,
        colors: editProject.colors,
      };

      const response = await updateProject(editId, updatedProject);
      if (response) {
        setProjects(projects.map(project => (project.id === editId ? response : project)));
        setEditId(null);
        setEditProject(null);
      } else {
        console.error('Something went wrong', response);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProject(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };  

  const handleCreate = async () => {
    console.log(editProject);
    const newProject = await createProject(editProject);
    if (newProject) {
      setProjects([...projects, newProject]);
      setEditId(null);
      setEditProject(null);
    }
  };

  return (
    <div className='back-office'>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Colors</th>
            <th>Image URL</th>
            <th>Logo URL</th>
            <th>Live Preview URL</th>
            <th>GitHub URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{editId === project.id ? <input type="text" name="title" value={editProject?.title} onChange={handleChange} /> : project.title}</td>
              <td>{editId === project.id ? <input type="text" name="description" value={editProject?.description} onChange={handleChange} /> : project.description}</td>
              <td>
                {editId === project.id ? (
                  <select name="category" value={editProject?.category || 'Web app'} onChange={handleChange}>
                    <option value="Web app">Web App</option>
                    <option value="Mobile app">Mobile App</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                ) : project.category}
              </td>
              <td>
                {editId === project.id ? (
                  <>
                    <input type="text" name="colors" value={editProject?.colors || ''} onChange={handleChange} placeholder="Color" />
                  </>
                ) : `${project.colors}`}
              </td>
              <td>{editId === project.id ? <input type="text" name="image_url" value={editProject?.image_url} onChange={handleChange} /> : project.image_url}</td>
              <td>{editId === project.id ? <input type="text" name="logo_url" value={editProject?.logo_url} onChange={handleChange} /> : project.logo_url}</td>
              <td>{editId === project.id ? <input type="text" name="live_preview_url" value={editProject?.live_preview_url} onChange={handleChange} /> : project.live_preview_url}</td>
              <td>{editId === project.id ? <input type="text" name="github_url" value={editProject?.github_url} onChange={handleChange} /> : project.github_url}</td>
              <td>
                {editId === project.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(project)}>Edit</button>
                    <button onClick={() => handleDelete(project.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {editId === null && (
            <tr>
              <td><input type="text" name="title" value={editProject?.title || ''} onChange={handleChange} placeholder="Title" /></td>
              <td><input type="text" name="description" value={editProject?.description || ''} onChange={handleChange} placeholder="Description" /></td>
              <td>
                <select name="category" value={editProject?.category || 'Web app'} onChange={handleChange}>
                  <option value="Web app">Web App</option>
                  <option value="Mobile app">Mobile App</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </td>
              <td>
                <input type="text" name="colors" value={editProject?.colors || ''} onChange={handleChange} placeholder="Color" />
              </td>
              <td><input type="text" name="image_url" value={editProject?.image_url || ''} onChange={handleChange} placeholder="Image URL" /></td>
              <td><input type="text" name="logo_url" value={editProject?.logo_url || ''} onChange={handleChange} placeholder="Logo URL" /></td>
              <td><input type="text" name="live_preview_url" value={editProject?.live_preview_url || ''} onChange={handleChange} placeholder='Project URL' /></td>
              <td><input type='text' name='github_url' value={editProject?.github_url || ''} onChange={handleChange} placeholder='GitHub URL' /></td>
              <td>
                <button onClick={handleCreate}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BackOffice;