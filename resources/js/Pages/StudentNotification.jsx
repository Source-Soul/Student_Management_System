import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Button } from "../Components/button";
import { Badge } from "../Components/badge";
import { Input } from "../Components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import {
    Bell,
    Search,
    Filter,
    BookOpen,
    CheckCircle,
    AlertCircle,
    Clock,
    User,
    Settings,
    Archive,
    Trash2,
    MoreVertical,
    Calendar,
    GraduationCap,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../Components/dropdown-menu";

export function StudentNotification() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [activeTab, setActiveTab] = useState("all");

    const allNotifications = [
        {
            id: 1,
            type: "assignment",
            title: "Assignment Due Soon",
            message:
                "CS101 Assignment 3 is due tomorrow at 11:59 PM. Don't forget to submit your work on time.",
            time: "2 hours ago",
            icon: BookOpen,
            color: "text-blue-500",
            read: false,
            priority: "high",
            category: "Academic",
        },
        {
            id: 2,
            type: "grade",
            title: "Grade Posted",
            message:
                "Your MATH201 midterm grade is now available. You scored 85/100. Great job!",
            time: "4 hours ago",
            icon: CheckCircle,
            color: "text-green-500",
            read: false,
            priority: "medium",
            category: "Academic",
        },
        {
            id: 3,
            type: "announcement",
            title: "Class Cancelled",
            message:
                "PHYS101 class on Friday has been cancelled due to instructor illness. Make-up class will be scheduled.",
            time: "1 day ago",
            icon: AlertCircle,
            color: "text-orange-500",
            read: true,
            priority: "high",
            category: "Schedule",
        },
        {
            id: 4,
            type: "system",
            title: "System Maintenance",
            message:
                "Scheduled maintenance this weekend from 2 AM to 6 AM. Some services may be unavailable.",
            time: "2 days ago",
            icon: Clock,
            color: "text-gray-500",
            read: true,
            priority: "low",
            category: "System",
        },
        {
            id: 5,
            type: "reminder",
            title: "Course Registration",
            message:
                "Summer registration opens next week. Don't forget to register for your courses early.",
            time: "3 days ago",
            icon: User,
            color: "text-purple-500",
            read: true,
            priority: "medium",
            category: "Registration",
        },
        {
            id: 6,
            type: "grade",
            title: "Quiz Results Available",
            message:
                "CS301 Quiz 2 results are now posted. Check your grade in the gradebook.",
            time: "1 week ago",
            icon: CheckCircle,
            color: "text-green-500",
            read: true,
            priority: "medium",
            category: "Academic",
        },
        {
            id: 7,
            type: "announcement",
            title: "Library Hours Extended",
            message:
                "The library will now be open 24/7 during finals week to support your studies.",
            time: "1 week ago",
            icon: BookOpen,
            color: "text-blue-500",
            read: true,
            priority: "low",
            category: "Campus",
        },
        {
            id: 8,
            type: "attendance",
            title: "Attendance Warning",
            message:
                "Your attendance in ENG101 is below the required threshold. Please attend classes regularly.",
            time: "2 weeks ago",
            icon: AlertCircle,
            color: "text-red-500",
            read: false,
            priority: "high",
            category: "Academic",
        },
    ];

    const [notifications, setNotifications] = useState(allNotifications);

    const filteredNotifications = notifications.filter((notification) => {
        const matchesSearch =
            searchQuery === "" ||
            notification.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            notification.message
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesType =
            filterType === "all" || notification.type === filterType;
        const matchesTab =
            activeTab === "all" ||
            (activeTab === "unread" && !notification.read) ||
            (activeTab === "read" && notification.read);
        return matchesSearch && matchesType && matchesTab;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "high":
                return (
                    <Badge className="bg-red-100 text-red-800 text-xs">
                        High
                    </Badge>
                );
            case "medium":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Medium
                    </Badge>
                );
            case "low":
                return (
                    <Badge className="bg-gray-100 text-gray-800 text-xs">
                        Low
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-0">
                <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Bell className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Notifications
                            </h1>
                            <p className="text-white/80">
                                Stay updated with important announcements
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={markAllAsRead}
                        >
                            Mark all as read
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Filter/Search Card */}
            <Card className="bg-white shadow-sm border rounded-md p-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search notifications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-40 bg-white hover:bg-gray-50">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md rounded-md">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="assignment">
                                Assignments
                            </SelectItem>
                            <SelectItem value="grade">Grades</SelectItem>
                            <SelectItem value="announcement">
                                Announcements
                            </SelectItem>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="reminder">Reminders</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Notification Tabs & List */}
            <Card className="bg-white shadow-lg border-0">
                <CardHeader className="px-6 pt-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                            All Notifications
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">
                            {unreadCount} unread
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <div className="px-6 pb-4">
                            <TabsList className="bg-gray-50 rounded-md p-1 flex space-x-2">
                                <TabsTrigger
                                    value="all"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-100"
                                >
                                    All ({notifications.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="unread"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-100"
                                >
                                    Unread ({unreadCount})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="read"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-100"
                                >
                                    Read ({notifications.length - unreadCount})
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value={activeTab}>
                            {filteredNotifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>No notifications found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {filteredNotifications.map(
                                        (notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 flex justify-between items-start hover:bg-gray-50 transition-colors rounded-md ${
                                                    !notification.read
                                                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                                                        : "bg-white"
                                                }`}
                                            >
                                                <div className="flex items-start space-x-3 flex-1">
                                                    <div
                                                        className={`mt-1 ${notification.color}`}
                                                    >
                                                        <notification.icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <h3
                                                                className={`font-medium ${
                                                                    !notification.read
                                                                        ? "text-gray-900"
                                                                        : "text-gray-700"
                                                                }`}
                                                            >
                                                                {
                                                                    notification.title
                                                                }
                                                            </h3>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            )}
                                                            {getPriorityBadge(
                                                                notification.priority
                                                            )}
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {
                                                                    notification.category
                                                                }
                                                            </Badge>
                                                        </div>
                                                        <p className="text-gray-600 text-sm">
                                                            {
                                                                notification.message
                                                            }
                                                        </p>
                                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                                            <div className="flex items-center space-x-1">
                                                                <Calendar className="h-3 w-3" />
                                                                <span>
                                                                    {
                                                                        notification.time
                                                                    }
                                                                </span>
                                                            </div>
                                                            {!notification.read && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                                                                    onClick={() =>
                                                                        markAsRead(
                                                                            notification.id
                                                                        )
                                                                    }
                                                                >
                                                                    Mark as read
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        {!notification.read && (
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    markAsRead(
                                                                        notification.id
                                                                    )
                                                                }
                                                            >
                                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                                Mark as read
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem>
                                                            <Archive className="h-4 w-4 mr-2" />
                                                            Archive
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                deleteNotification(
                                                                    notification.id
                                                                )
                                                            }
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Summary Statistics */}
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white border-0 shadow-sm rounded-md">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {notifications.length}
                        </div>
                        <div className="text-sm text-gray-600">Total</div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm rounded-md">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {unreadCount}
                        </div>
                        <div className="text-sm text-gray-600">Unread</div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm rounded-md">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {
                                notifications.filter(
                                    (n) => n.priority === "high"
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            High Priority
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-0 shadow-sm rounded-md">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {notifications.filter((n) => n.read).length}
                        </div>
                        <div className="text-sm text-gray-600">Read</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
