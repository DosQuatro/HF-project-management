import React, { useState, useEffect } from 'react';
    import './ManageProjects.css';

    function ManageProjects() {
      const [projects, setProjects] = useState([]);
      const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });

      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/projects');
            if (response.ok) {
              const data = await response.json();
              setProjects(data);
            } else {
              console.error('Failed to fetch projects');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };

        fetchProjects();
      }, []);

      const sortedProjects = [...projects].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });

      const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      return (
        <div className="manage-projects">
          <h2>Manage Projects</h2>
          <table>
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>Name</th>
                <th onClick={() => requestSort('short_description')}>Short Description</th>
                <th onClick={() => requestSort('requestor')}>Requested By</th>
                <th onClick={() => requestSort('due_date')}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.short_description}</td>
                  <td>{project.requestor}</td>
                  <td>{project.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default ManageProjects;
