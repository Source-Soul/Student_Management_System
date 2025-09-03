import React from "react";
import { NavLink } from "react-router-dom";
import {
  UserCheck,
  BookOpen,
  Users,
  Calendar,
  Bell,
  GraduationCap,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const StudentSidebar = () => {
  const links = [
    { path: "profile", label: "Profile", icon: UserCheck },
    { path: "enrollment", label: "Course Enrollment", icon: BookOpen },
    { path: "my-courses", label: "My Courses", icon: Users },
    { path: "attendance", label: "Attendance", icon: Calendar },
    { path: "schedule", label: "Class Routine", icon: Calendar },
    { path: "notifications", label: "Notifications", icon: Bell },
    { path: "grades", label: "Results", icon: BarChart3 },
    { path: "feedback", label: "Course Feedback", icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-lg min-h-screen flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Student Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path} // relative to /student/
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50"
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

export default StudentSidebar;
