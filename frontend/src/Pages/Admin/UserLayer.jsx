import React, { useState } from 'react'
import Sidebar from '../../Components/Admin/Sidebar';
import Header from '../../Components/Admin/Header';
import UserCrudAdmin from './UserCrudAdmin';

const UserLayer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-base-100">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4">
          <UserCrudAdmin/>
        </main>
      </div>
    </div>
  );
};

export default UserLayer
