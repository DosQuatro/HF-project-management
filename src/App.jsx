import React, { useState } from 'react';
    import SideMenu from './components/SideMenu';
    import NewProjectForm from './components/NewProjectForm';
    import ViewProjects from './components/ViewProjects';
    import ManageProjects from './components/ManageProjects';
    import ThankYouPage from './components/ThankYouPage';

    function App() {
      const [activeView, setActiveView] = useState('home');

      const handleNewProjectClick = () => {
        setActiveView('newProject');
      };

      const handleViewProjectsClick = () => {
        setActiveView('viewProjects');
      };

      const handleManageProjectsClick = () => {
        setActiveView('manageProjects');
      };

      const handleHomeClick = () => {
        setActiveView('home');
      };

      const handleFormSubmit = () => {
        setActiveView('thankYou');
      };

      return (
        <div style={{ display: 'flex' }}>
          <SideMenu 
            onNewProjectClick={handleNewProjectClick} 
            onViewProjectsClick={handleViewProjectsClick} 
            onManageProjectsClick={handleManageProjectsClick}
            onHomeClick={handleHomeClick}
          />
          <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
            <h1>Project Management App</h1>
            {activeView === 'home' && <p>Welcome to the Project Management App. Use the side menu to navigate.</p>}
            {activeView === 'newProject' && <NewProjectForm onSubmit={handleFormSubmit} />}
            {activeView === 'viewProjects' && <ViewProjects />}
            {activeView === 'manageProjects' && <ManageProjects />}
            {activeView === 'thankYou' && <ThankYouPage />}
          </div>
        </div>
      );
    }

    export default App;
