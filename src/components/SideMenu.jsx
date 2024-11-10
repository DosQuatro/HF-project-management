import React, { useState } from 'react';
    import './SideMenu.css';
    import '@fortawesome/fontawesome-free/css/all.min.css';

    function SideMenu({ onNewProjectClick, onViewProjectsClick, onManageProjectsClick, onHomeClick }) {
      const [isCollapsed, setIsCollapsed] = useState(false);

      const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
      };

      return (
        <div className={`side-menu ${isCollapsed ? 'collapsed' : ''}`}>
          <button onClick={toggleMenu} className="toggle-button">
            <i className="fas fa-bars"></i>
          </button>
          <ul>
            <li>
              <a href="#home" onClick={onHomeClick}>
                <i className="fas fa-home"></i>
                {!isCollapsed && <span>Home</span>}
              </a>
            </li>
            <li>
              <a href="#new-project" onClick={onNewProjectClick}>
                <i className="fas fa-plus"></i>
                {!isCollapsed && <span>New Project</span>}
              </a>
            </li>
            <li>
              <a href="#view-projects" onClick={onViewProjectsClick}>
                <i className="fas fa-eye"></i>
                {!isCollapsed && <span>View Projects</span>}
              </a>
            </li>
            <li>
              <a href="#manage-projects" onClick={onManageProjectsClick}>
                <i className="fas fa-tasks"></i>
                {!isCollapsed && <span>Manage Projects</span>}
              </a>
            </li>
          </ul>
        </div>
      );
    }

    export default SideMenu;
