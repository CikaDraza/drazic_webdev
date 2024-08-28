import React, { useState, useEffect } from 'react';
import { createTestimonial, deleteTestimonial, getTestimonialByUser, getTestimonials, updateTestimonial } from '../utils/api/testimonials';
import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

const BackOfficeClient = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTestimonials, setEditTestimonials] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {      
      const email = localStorage.getItem('user-email');      
      // Fetch user data
      const { data } = await axios.get(`https://drazic-webdev-server.vercel.app/api/users/${email}`, {
        method: 'GET',
        headers: getAuthHeaders(),
        body: JSON.stringify(email),
      });
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  
  useEffect(() => {
      fetchUser();
  }, []);

  const fetchTestimonials = async (userEmail) => {    
    try {
      const fetchedTestimonials = await getTestimonialByUser(userEmail);
      setTestimonials(fetchedTestimonials || []);
    } catch (error) {
      console.error('Error fetching user testimonials:', error);
    }
  };
  
  useEffect(() => {
    const userEmail = user?.email;
    if (userEmail) {
      fetchTestimonials(userEmail);
    }
  }, [user]);

  const handleDelete = async (id) => {
    const success = await deleteTestimonial(id);
    if (success) {
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
    }
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial._id);
    setEditTestimonials(testimonial);    
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTestimonials(null);
  };

  const handleUpdate = async () => {
    try {
      const updatedTestimonials = { ...editTestimonials };
      const response = await updateTestimonial(editId, updatedTestimonials);
      if (response) {
        fetchTestimonials(user?.email);
        setEditId(null);
        setEditTestimonials(null);
      } else {
        console.error('Something went wrong', response);
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTestimonials(prevState => ({ ...prevState, [name]: value }));    
  };

  const handleCreate = async () => {
    const newTestimonials = await createTestimonial(editTestimonials);    
    if (newTestimonials) {
      fetchTestimonials();
      setEditId(null);
      setEditTestimonials(null);
    }
  };

  return (
    <div className='back-office'>
      <table>
        <thead>
          <tr>
            <th>Client Title</th>
            <th>Client Email</th>
            <th>Client Name</th>
            <th>Text</th>
            <th>Image URL</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(testimonial => (
            <tr key={testimonial._id}>
              <td>{editId === testimonial._id ? <input type="text" name="client_title" value={editTestimonials?.client_title} onChange={handleChange} /> : testimonial.client_title}</td>
              <td>{editId === testimonial._id ? <input type="text" name="client_email" value={editTestimonials?.client_email} onChange={handleChange} /> : testimonial.client_email}</td>
              <td>{editId === testimonial._id ? <input type="text" name="client_name" value={editTestimonials?.client_name} onChange={handleChange} /> : testimonial.client_name}</td>
              <td>{editId === testimonial._id ? <textarea name="text" value={editTestimonials?.text} onChange={handleChange} /> : testimonial.text}</td>
              <td>{editId === testimonial._id ? <input type="text" name="image_url" value={editTestimonials?.image_url} onChange={handleChange} /> : testimonial.image_url}</td>
              <td>
                {editId === testimonial._id ? (
                  <select name="rating" value={editTestimonials?.rating || ''} onChange={handleChange}>
                    <option value="">Add Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                ) : testimonial.rating}
              </td>
              <td>
                {editId === testimonial._id ? (
                  <>
                    <button className='action-btns save-btn' onClick={handleUpdate}>Save</button>
                    <button className='action-btns cancel-btn' onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='action-btns edit-btn' onClick={() => handleEdit(testimonial)}>Edit</button>
                    <button className='action-btns delete-btn' onClick={() => handleDelete(testimonial._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {
            editId === null && (
            <tr>
              <td><input type="text" name="client_title" value={editTestimonials?.client_title || ''} onChange={handleChange} placeholder="Client Title" /></td>
              <td><input type="text" name="client_email" value={editTestimonials?.client_email || ''} onChange={handleChange} placeholder="Client Email" /></td>
              <td><input type="text" name="client_name" value={editTestimonials?.client_name || ''} onChange={handleChange} placeholder="Client Name" /></td>
              <td className='text-area'>
                <textarea name="text" value={editTestimonials?.text || ''} onChange={handleChange} placeholder="Text" />
              </td>
              <td><input type="text" name="image_url" value={editTestimonials?.image_url || ''} onChange={handleChange} placeholder="Image URL" /></td>
              <td>
                <select name="rating" value={editTestimonials?.rating || ''} onChange={handleChange}>
                  <option value="">Add Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </td>
              <td>
                <button className='action-btns save-btn action-btns--create' onClick={handleCreate}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BackOfficeClient;