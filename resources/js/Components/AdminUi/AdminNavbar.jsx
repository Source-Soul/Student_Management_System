import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { LogOut, Key, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChangePasswordModal from "../ui/ChangePasswordModal";

const AdminNavbar = ({ userName = "Admin" }) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate(); // ✅ hook for redirection

  // ✅ define logout handler
  const handleLogout = () => {
    console.log("Logout clicked ✅"); // debug
    localStorage.clear(); // optional cleanup
    navigate("/"); // send to LandingPage
  };

  const getUserInitials = () =>
    userName
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <>
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-purple-600" />
          Admin Portal
        </h1>

        <div className="flex items-center gap-4">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple-600 text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem
                onClick={() => setShowChangePasswordModal(true)}
              >
                <Key className="mr-2 h-4 w-4" /> Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* ✅ logout button */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default AdminNavbar;
