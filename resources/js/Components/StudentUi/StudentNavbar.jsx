import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ChangePasswordModal from "../ui/ChangePasswordModal";
import {
  Bell,
  LogOut,
  Key,
  GraduationCap,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const StudentNavbar = ({
  userRole = "student",
  userName = "Student",
  notifications = 3,
  onLogout,
  onNavigate,
}) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const getRoleGradient = () => {
    switch (userRole) {
      case "student":
        return "bg-gradient-to-r from-blue-500 to-blue-700";
      case "faculty":
        return "bg-gradient-to-r from-green-500 to-green-700";
      case "admin":
        return "bg-gradient-to-r from-purple-500 to-purple-700";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-700";
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case "student":
        return "text-blue-600";
      case "faculty":
        return "text-green-600";
      case "admin":
        return "text-purple-600";
      default:
        return "text-blue-600";
    }
  };

  const getUserInitials = () =>
    userName
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const mockNotifications = [
    {
      id: 1,
      type: "assignment",
      title: "Assignment Due Soon",
      message: "CS101 Assignment 3 is due tomorrow",
      time: "2 hours ago",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "grade",
      title: "Grade Posted",
      message: "Your MATH201 midterm grade is now available",
      time: "4 hours ago",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "announcement",
      title: "Class Cancelled",
      message: "PHYS101 class on Friday has been cancelled",
      time: "1 day ago",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  const handleViewAllNotifications = () => {
    if (onNavigate) onNavigate("notifications");
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className={`h-1 ${getRoleGradient()}`}></div>
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Left side - Logo and Panel */}
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 ${getRoleGradient()} rounded-xl flex items-center justify-center`}
            >
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EduSMS</h1>
              <p className={`text-sm ${getRoleColor()} capitalize`}>
                {userRole} Portal
              </p>
            </div>
          </div>

          {/* Right Side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications > 0 && (
                    <Badge
                      className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs ${getRoleGradient()} border-0`}
                    >
                      {notifications > 99 ? "99+" : notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
                {/* Header */}
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">
                    {notifications} unread notifications
                  </p>
                </div>

                {/* Notifications List */}
                <div className="max-h-64 overflow-y-auto">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer"
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`mt-1 ${n.color}`}>
                          <n.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {n.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm h-8"
                    onClick={handleViewAllNotifications}
                  >
                    View All Notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback
                      className={`${getRoleGradient()} text-white`}
                    >
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{userName}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground capitalize">
                      {userRole} Account
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowChangePasswordModal(true)}
                  className="cursor-pointer"
                >
                  <Key className="mr-2 h-4 w-4" /> Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default StudentNavbar;
