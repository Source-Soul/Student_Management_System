import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import StudentSidebar from "../StudentUi/StudentSidebar";
import StudentNavbar from "../StudentUi/StudentNavbar";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/"); // redirect to landing page
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar on top */}
      <StudentNavbar
        onLogout={handleLogout}
        userRole="student"
        userName="Student"
      />

      <div className="flex flex-1">
        {/* Sidebar on left */}
        <StudentSidebar />

        {/* Main content area */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet /> {/* Student pages will render here */}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
