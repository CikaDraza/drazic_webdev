import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject, updateProject, createProject } from '../utils/api/projects';

const BackOffice = () => {
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects();
    setProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    const deletedProject = await deleteProject(projectId);
  
    if (deletedProject) {
      fetchProjects();
    } else {
      console.error('Failed to delete the project');
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
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
        color: editProject.color,
      };

      const response = await updateProject(editId, updatedProject);
      if (response) {
        fetchProjects();
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
    const newProject = await createProject(editProject);
    if (newProject) {
      fetchProjects();
      setEditId(null);
      setEditProject(null);
    }
  };

  return (
    <div className='back-office'>
      <table>
        <tbody>
          {projects.map(project => (
            <tr key={project._id} className='preview-row'>
              <td>{editId === project._id ? <input type="text" name="title" value={editProject?.title} onChange={handleChange} /> : project.title}</td>
              <td>{editId === project._id ? <input type="text" name="description" value={editProject?.description} onChange={handleChange} /> : project.description}</td>
              <td>
                {editId === project._id ? (
                  <select name="category" value={editProject?.category || ''} onChange={handleChange}>
                    <option value="">Add Category</option>
                    <option value="Web app">Web App</option>
                    <option value="Mobile app">Mobile App</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                ) : project.category}
              </td>
              <td>
                {editId === project._id ? (
                  <>
                    <input type="text" name="color" value={editProject?.color || ''} onChange={handleChange} placeholder="Color" />
                  </>
                ) : `${project.color}`}
              </td>
              <td>{editId === project._id ? <input type="text" name="image_url" value={editProject?.image_url} onChange={handleChange} /> : project.image_url}</td>
              <td>{editId === project._id ? <input type="text" name="logo_url" value={editProject?.logo_url} onChange={handleChange} /> : project.logo_url}</td>
              <td>{editId === project._id ? <input type="text" name="live_preview_url" value={editProject?.live_preview_url} onChange={handleChange} /> : project.live_preview_url}</td>
              <td>{editId === project._id ? <input type="text" name="github_url" value={editProject?.github_url} onChange={handleChange} /> : project.github_url}</td>
              <td>
                {editId === project._id ? (
                  <>
                    <button className='action-btns save-btn' onClick={handleUpdate}>Save</button>
                    <button className='action-btns cancel-btn' onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='action-btns edit-btn' onClick={() => handleEdit(project)}>Edit</button>
                    <button className='action-btns delete-btn' onClick={() => handleDelete(project._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {editId === null && (
            <tr className='create-row'>
              <td><input type="text" name="title" value={editProject?.title || ''} onChange={handleChange} placeholder="Title" /></td>
              <td><input type="text" name="description" value={editProject?.description || ''} onChange={handleChange} placeholder="Description" /></td>
              <td>
                <select name="category" value={editProject?.category || ''} onChange={handleChange}>
                  <option value="">Add Category</option>
                  <option value="Web app">Web App</option>
                  <option value="Mobile app">Mobile App</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </td>
              <td>
                <input type="text" name="color" value={editProject?.color || ''} onChange={handleChange} placeholder="Color" />
              </td>
              <td><input type="text" name="image_url" value={editProject?.image_url || ''} onChange={handleChange} placeholder="Image URL" /></td>
              <td><input type="text" name="logo_url" value={editProject?.logo_url || ''} onChange={handleChange} placeholder="Logo URL" /></td>
              <td><input type="text" name="live_preview_url" value={editProject?.live_preview_url || ''} onChange={handleChange} placeholder='Project URL' /></td>
              <td><input type='text' name='github_url' value={editProject?.github_url || ''} onChange={handleChange} placeholder='GitHub URL' /></td>
              <td>
                <button className='action-btns save-btn action-btns--create' onClick={handleCreate}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BackOffice;