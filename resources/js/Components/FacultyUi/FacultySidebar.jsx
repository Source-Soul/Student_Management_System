import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  GraduationCap,
  MessageSquare,
  User,
  Users,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { to: "/faculty/dashboard", icon: LayoutDashboard, text: "Dashboard" },
  { to: "/faculty/schedule", icon: Calendar, text: "Schedule" },
  { to: "/faculty/attendance", icon: UserCheck, text: "Attendance" },
  { to: "/faculty/grades", icon: GraduationCap, text: "Grades" },
  { to: "/faculty/feedback", icon: MessageSquare, text: "Feedback" },
  { to: "/faculty/profile", icon: User, text: "Profile" },
  {
    to: "/faculty/teaching-assistants",
    icon: Users,
    text: "Teaching Assistants",
  },
];

const FacultySidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseLinkClasses =
    "flex items-center p-3 rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-gray-600 hover:bg-gray-200";
  const activeLinkClasses = "bg-green-600 text-white shadow-md";

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-4 fixed bottom-4 right-4 bg-green-600 text-white rounded-full shadow-lg z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg lg:shadow-none lg:translate-x-0 lg:static lg:inset-y-0 transform ${
          isMobileMenuOpen
            ? "translate-x-0 fixed inset-0 z-40"
            : "-translate-x-full fixed"
        } w-64 min-h-screen p-4 space-y-2 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center p-4 border-b">
          <h2 className="text-2xl font-bold text-green-700">EduSMS</h2>
        </div>
        <nav className="mt-4">
          <ul>
            {navLinks.map(({ to, icon: Icon, text }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                  onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span>{text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default FacultySidebar;
