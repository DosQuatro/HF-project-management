import React, { useState } from 'react';
    import './NewProjectForm.css';

    function NewProjectForm({ onSubmit }) {
      const [formData, setFormData] = useState({
        projectName: '',
        requestedBy: '',
        shortDescription: '',
        details: '',
        dueDate: '',
        startDate: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formData.projectName,
              type: 'General', // Assuming a default type for now
              requestor: formData.requestedBy,
              dueDate: formData.dueDate,
              startDate: formData.startDate,
              shortDescription: formData.shortDescription,
              details: formData.details
            })
          });
          if (response.ok) {
            const result = await response.json();
            console.log('Project created with ID:', result.id);
            onSubmit(); // Navigate to Thank You Page
          } else {
            console.error('Failed to create project');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      return (
        <form className="new-project-form" onSubmit={handleSubmit}>
          <h2>Create New Project</h2>
          <label>
            Project Name*:
            <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
          </label>
          <label>
            Requested By*:
            <input type="text" name="requestedBy" value={formData.requestedBy} onChange={handleChange} required />
          </label>
          <label>
            Short Description:
            <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
          </label>
          <label>
            Details*:
            <textarea name="details" value={formData.details} onChange={handleChange} required></textarea>
          </label>
          <label>
            Due Date:
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </label>
          <label>
            Start Date:
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      );
    }

    export default NewProjectForm;
