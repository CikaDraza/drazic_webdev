import React, { useState, useEffect } from 'react';
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from '../utils/api/testimonials';

const BackOfficeClient = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTestimonials, setEditTestimonials] = useState(null);

  const fetchTestimonials = async () => {
    const fetchedTestimonials = await getTestimonials();
    setTestimonials(fetchedTestimonials);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTestimonial(id);
    console.log(success);

    if (success) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    }
  };

  const handleEdit = (testimonial) => {
    setEditId(testimonial.id);
    setEditTestimonials(testimonial);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditTestimonials(null);
  };

  const handleUpdate = async () => {
    try {
      const updatedTestimonials = {
        ...editTestimonials
      };

      const response = await updateTestimonial(editId, updatedTestimonials);
      if (response) {
        fetchTestimonials();
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
    setEditTestimonials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };  

  const handleCreate = async () => {
    const newTestimonials = await createTestimonial(editTestimonials);
    console.log(newTestimonials);
    
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
            <th>Client Name</th>
            <th>Text</th>
            <th>Image URL</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(testimonial => (
            <tr key={testimonial.id}>
              <td>{editId === testimonial.id ? <input type="text" name="client_title" value={editTestimonials?.client_title} onChange={handleChange} /> : testimonial.client_title}</td>
              <td>{editId === testimonial.id ? <input type="text" name="client_name" value={editTestimonials?.client_name} onChange={handleChange} /> : testimonial.client_name}</td>
              <td>{editId === testimonial.id ? <input type="textarea" name="text" value={editTestimonials?.text} onChange={handleChange} /> : testimonial?.text}</td>
              <td>{editId === testimonial.id ? <input type="text" name="image_url" value={editTestimonials?.image_url} onChange={handleChange} /> : testimonial.image_url}</td>
              <td>
                {editId === testimonial.id ? (
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
                {editId === testimonial.id ? (
                  <>
                    <button className='action-btns save-btn' onClick={handleUpdate}>Save</button>
                    <button className='action-btns cancel-btn' onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='action-btns edit-btn' onClick={() => handleEdit(testimonial)}>Edit</button>
                    <button className='action-btns delete-btn' onClick={() => handleDelete(testimonial.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {
            editId === null && (
            <tr>
              <td><input type="text" name="client_title" value={editTestimonials?.client_title || ''} onChange={handleChange} placeholder="Client Title" /></td>
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
  )
}

export default BackOfficeClient;