// src/Components/Admin/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, FileCheck } from "lucide-react";

const AdminSidebar = () => {
  const links = [
    {
      path: "/admin/dashboard",
      label: "System Overview",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/faculty-management",
      label: "Faculty Management",
      icon: GraduationCap,
    },
    { path: "/admin/student-records", label: "Student Records", icon: Users },
    { path: "/admin/approvals", label: "Approvals", icon: FileCheck },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-lg min-h-screen flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-purple-50"
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
