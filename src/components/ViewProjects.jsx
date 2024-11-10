import React, { useState, useEffect } from 'react';
    import Calendar from 'react-calendar';
    import './ViewProjects.css';

    function ViewProjects() {
      const [projects, setProjects] = useState([]);

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

      const tileContent = ({ date, view }) => {
        if (view === 'month') {
          return projects.map((project) => {
            const start = new Date(project.start_date);
            const due = new Date(project.due_date);
            const current = date;
            if (current >= start && current <= due) {
              return (
                <div key={project.id} className="project-marker">
                  {(current.toDateString() === start.toDateString() || current.toDateString() === due.toDateString()) && (
                    <span>{project.name}</span>
                  )}
                  {current > start && current < due && <div className="project-line"></div>}
                </div>
              );
            }
            return null;
          });
        }
      };

      return (
        <div className="view-projects">
          <h2>Project Calendar</h2>
          <Calendar
            tileContent={tileContent}
            className="project-calendar"
            calendarType="US" // Start week on Sunday
          />
        </div>
      );
    }

    export default ViewProjects;
