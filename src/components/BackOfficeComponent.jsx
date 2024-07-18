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

  const handleSave = async () => {
    const updatedProject = await updateProject(editId, editProject);
    if (updatedProject) {
      setProjects(projects.map(project => (project.id === editId ? updatedProject : project)));
      setEditId(null);
      setEditProject(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('colors.')) {
      const colorKey = name.split('.')[1];
      setEditProject({ ...editProject, colors: { ...editProject.colors, [colorKey]: value } });
    } else {
      setEditProject({ ...editProject, [name]: value });
    }
  };

  const handleCreate = async () => {
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
              <td>{editId === project.id ? <input type="text" name="title" value={editProject.title} onChange={handleChange} /> : project.title}</td>
              <td>{editId === project.id ? <input type="text" name="description" value={editProject.description} onChange={handleChange} /> : project.description}</td>
              <td>
                {editId === project.id ? (
                  <select name="category" value={editProject.category} onChange={handleChange}>
                    <option value="all">All Projects</option>
                    <option value="web">Web App</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                ) : project.category}
              </td>
              <td>
                {editId === project.id ? (
                  <>
                    <input type="text" name="colors.firstColor" value={editProject.colors?.firstColor || ''} onChange={handleChange} placeholder="First Color" />
                    <input type="text" name="colors.secondColor" value={editProject.colors?.secondColor || ''} onChange={handleChange} placeholder="Second Color" />
                  </>
                ) : `${project.colors?.firstColor}, ${project.colors?.secondColor}`}
              </td>
              <td>{editId === project.id ? <input type="text" name="image_url" value={editProject.image_url} onChange={handleChange} /> : project.image_url}</td>
              <td>{editId === project.id ? <input type="text" name="logo_url" value={editProject.logo_url} onChange={handleChange} /> : project.logo_url}</td>
              <td>{editId === project.id ? <input type="text" name="live_preview_url" value={editProject.live_preview_url} onChange={handleChange} /> : project.live_preview_url}</td>
              <td>{editId === project.id ? <input type="text" name="github_url" value={editProject.github_url} onChange={handleChange} /> : project.github_url}</td>
              <td>
                {editId === project.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
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
                <select name="category" value={editProject?.category || 'all'} onChange={handleChange}>
                  <option value="all">All Projects</option>
                  <option value="web">Web App</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </td>
              <td>
                <input type="text" name="colors.firstColor" value={editProject?.colors?.firstColor || ''} onChange={handleChange} placeholder="First Color" />
                <input type="text" name="colors.secondColor" value={editProject?.colors?.secondColor || ''} onChange={handleChange} placeholder="Second Color" />
              </td>
              <td><input type="text" name="image_url" value={editProject?.image_url || ''} onChange={handleChange} placeholder="Image URL" /></td>
              <td><input type="text" name="logo_url" value={editProject?.logo_url || ''} onChange={handleChange} placeholder="Logo URL" /></td>
              <td><input type="text" name="live_preview_url" value={editProject?.live_preview_url || ''} onChange={handleChange} placeholder='Project URL' /></td>
              <td><input type='text' name='github_url' value={editProject?.github_url || ''} onChange={handleChange} placeholder='GitHub URL' /></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BackOffice;