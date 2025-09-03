import React from "react";
import { LogOut, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const FacultyNavbar = ({ onLogout, userRole, userName }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">Faculty Portal</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map(n => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default FacultyNavbar;
