import React from 'react';
import Header from './Header';
import UserTable from './UserTable';

const Dashboard = () => {
  return (
    <div className="w-3/4 p-4">
      <Header />
      <UserTable />
    </div>
  );
}

export default Dashboard;
