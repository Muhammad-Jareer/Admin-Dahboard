import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import BranchesTable from './components/BranchesTable.jsx';
import UserTable from './components/UserTable.jsx';
import ReportsTable from './components/ReportsTable.jsx';
import SettingsPage from './components/SettingsPage.jsx';

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState(1);

  const renderContent = () => {
    switch (selectedMenu) {
      case 1:
        return <UserTable />;
      case 2:
        return <BranchesTable />;
      case 3:
        return <ReportsTable />;
      case 4:
        return <SettingsPage />;
      // Add more cases as needed for other sections
      default:
        return <UserTable />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedMenu={setSelectedMenu} />
      <div className="w-3/4 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
