import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import FacultySidebar from "./FacultySidebar";
import FacultyNavbar from "./FacultyNavbar";

const FacultyLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear tokens, etc.
    localStorage.removeItem("userRole");
    navigate("/"); // redirect to landing page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar on left */}
      <FacultySidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar on top */}
        <FacultyNavbar
          onLogout={handleLogout}
          userRole="faculty"
          userName="Dr. Wilson" // This would come from auth context in a real app
        />

        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet /> {/* Faculty pages will render here */}
        </main>
      </div>
    </div>
  );
};

export default FacultyLayout;
