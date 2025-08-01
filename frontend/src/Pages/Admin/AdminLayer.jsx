import React, { useState } from "react";
import Header from "../../Components/Admin/Header";
import Sidebar from "../../Components/Admin/Sidebar";
import AddProduct from "../../Components/Admin/AddProduct";


const AdminLayer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-base-100">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4">
          <AddProduct/>
        </main>
      </div>
    </div>
  );
};

export default AdminLayer;
