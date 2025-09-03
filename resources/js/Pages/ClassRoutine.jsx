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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../Components/dropdown-menu";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Bell,
    BookOpen,
    GraduationCap,
} from "lucide-react";

export function ClassRoutine() {
    const [selectedSemester, setSelectedSemester] = useState("Spring 2025");

    const timeSlots = [
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
    ];

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

    const courseSchedule = [
        {
            courseCode: "CSE301",
            courseName: "Data Structures and Algorithms",
            instructor: "Dr. Sarah Johnson",
            room: "Room 301",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
            day: "Sunday",
        },
        {
            courseCode: "CSE301",
            courseName: "Data Structures and Algorithms",
            instructor: "Dr. Sarah Johnson",
            room: "Room 301",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
            day: "Tuesday",
        },
        {
            courseCode: "MATH301",
            courseName: "Linear Algebra",
            instructor: "Prof. Michael Williams",
            room: "Room 205",
            startTime: "11:00 AM",
            endTime: "12:30 PM",
            day: "Monday",
        },
        {
            courseCode: "MATH301",
            courseName: "Linear Algebra",
            instructor: "Prof. Michael Williams",
            room: "Room 205",
            startTime: "11:00 AM",
            endTime: "12:30 PM",
            day: "Wednesday",
        },
        {
            courseCode: "CSE250",
            courseName: "Database Management Systems",
            instructor: "Dr. Emily Anderson",
            room: "Lab 101",
            startTime: "02:00 PM",
            endTime: "03:30 PM",
            day: "Sunday",
        },
        {
            courseCode: "CSE250",
            courseName: "Database Management Systems",
            instructor: "Dr. Emily Anderson",
            room: "Lab 101",
            startTime: "02:00 PM",
            endTime: "03:30 PM",
            day: "Thursday",
        },
        {
            courseCode: "ENG101",
            courseName: "Technical Writing",
            instructor: "Ms. Lisa Davis",
            room: "Room 150",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            day: "Tuesday",
        },
        {
            courseCode: "ENG101",
            courseName: "Technical Writing",
            instructor: "Ms. Lisa Davis",
            room: "Room 150",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            day: "Thursday",
        },
    ];

    const getCoursesForTimeAndDay = (time, day) => {
        return courseSchedule.filter((course) => {
            return (
                course.day === day &&
                time >= course.startTime &&
                time < course.endTime
            );
        });
    };

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(" ");
        let [hours] = time.split(":");
        if (hours === "12") hours = "00";
        if (modifier === "PM" && hours !== "12")
            hours = (parseInt(hours, 10) + 12).toString();
        return hours;
    };

    const getCurrentDay = () => {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return days[new Date().getDay()];
    };

    const currentDay = getCurrentDay();

    // JSX starts
    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 gradient-student rounded-xl flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Class Routine
                                    </h1>
                                    <p className="text-gray-600">
                                        Weekly class schedule
                                    </p>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="relative"
                                    >
                                        <Bell className="h-5 w-5 text-gray-600" />
                                        <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-blue-500 border-0">
                                            2
                                        </Badge>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-60"
                                    align="end"
                                >
                                    <div className="p-2">
                                        <p className="text-sm">
                                            Test notification dropdown
                                        </p>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-600">
                                    Semester:
                                </span>
                                <Select
                                    value={selectedSemester}
                                    onValueChange={setSelectedSemester}
                                >
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Spring 2025">
                                            Spring 2025
                                        </SelectItem>
                                        <SelectItem value="Fall 2024">
                                            Fall 2024
                                        </SelectItem>
                                        <SelectItem value="Spring 2024">
                                            Spring 2024
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Schedule Grid */}
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        Weekly Timetable
                    </CardTitle>
                    <CardDescription>
                        {selectedSemester} • Sunday to Thursday, 8:00 AM - 6:00
                        PM
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {/* Mobile View */}
                    <div className="block lg:hidden p-4 space-y-4">
                        {weekDays.map((day) => (
                            <Card
                                key={day}
                                className="border border-gray-200 bg-gray-50"
                            >
                                <CardHeader className="pb-2">
                                    <CardTitle
                                        className={`text-lg ${
                                            currentDay === day
                                                ? "text-blue-600"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {day}{" "}
                                        {currentDay === day && (
                                            <Badge className="ml-2 bg-blue-100 text-blue-800">
                                                Today
                                            </Badge>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    {courseSchedule
                                        .filter((course) => course.day === day)
                                        .sort((a, b) =>
                                            convertTo24Hour(
                                                a.startTime
                                            ).localeCompare(
                                                convertTo24Hour(b.startTime)
                                            )
                                        )
                                        .map((course, index) => (
                                            <Card
                                                key={index}
                                                className="bg-white border border-gray-200 shadow-sm"
                                            >
                                                <CardContent className="p-3">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-blue-600">
                                                                {
                                                                    course.courseCode
                                                                }
                                                            </span>
                                                            <div className="flex items-center text-xs text-gray-500">
                                                                <Clock className="h-3 w-3 mr-1" />{" "}
                                                                {
                                                                    course.startTime
                                                                }{" "}
                                                                -{" "}
                                                                {course.endTime}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-gray-900 font-medium">
                                                            {course.courseName}
                                                        </p>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center text-xs text-gray-600">
                                                                <MapPin className="h-3 w-3 mr-1" />{" "}
                                                                {course.room}
                                                            </div>
                                                            <div className="flex items-center text-xs text-gray-600">
                                                                <User className="h-3 w-3 mr-1" />{" "}
                                                                {
                                                                    course.instructor
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    {courseSchedule.filter(
                                        (course) => course.day === day
                                    ).length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                            <p>No classes scheduled</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden lg:block overflow-x-auto">
                        <div className="min-w-[800px] bg-white">
                            {/* Days Header Row */}
                            <div className="grid grid-cols-6 border-b border-gray-200">
                                <div className="p-4 text-sm font-medium text-gray-600 border-r border-gray-200 bg-gray-50">
                                    Time
                                </div>
                                {weekDays.map((day) => (
                                    <div
                                        key={day}
                                        className={`p-4 text-sm font-medium text-center border-r border-gray-200 last:border-r-0 bg-gray-50 ${
                                            currentDay === day
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        <div className="font-medium">{day}</div>
                                        {currentDay === day && (
                                            <Badge className="mt-1 bg-blue-100 text-blue-800 text-xs">
                                                Today
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Time Slots */}
                            {timeSlots.map((time) => (
                                <div
                                    key={time}
                                    className="grid grid-cols-6 border-b border-gray-200 min-h-[100px]"
                                >
                                    <div className="p-4 text-sm text-gray-600 border-r border-gray-200 flex items-center bg-gray-50 font-medium">
                                        {time}
                                    </div>
                                    {weekDays.map((day) => {
                                        const coursesInSlot =
                                            getCoursesForTimeAndDay(time, day);
                                        return (
                                            <div
                                                key={`${day}-${time}`}
                                                className="border-r border-gray-200 last:border-r-0 p-2 bg-white"
                                            >
                                                {coursesInSlot.length > 0 ? (
                                                    coursesInSlot.map(
                                                        (course, index) => (
                                                            <Card
                                                                key={index}
                                                                className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                            >
                                                                <CardContent className="p-3 h-full">
                                                                    <div className="space-y-1">
                                                                        <div className="font-medium text-blue-700 text-sm">
                                                                            {
                                                                                course.courseCode
                                                                            }
                                                                        </div>
                                                                        <div className="text-xs text-gray-700 font-medium leading-tight">
                                                                            {
                                                                                course.courseName
                                                                            }
                                                                        </div>
                                                                        <div className="space-y-1 mt-2">
                                                                            <div className="flex items-center text-xs text-gray-600">
                                                                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                                                                <span className="truncate">
                                                                                    {
                                                                                        course.room
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex items-center text-xs text-gray-600">
                                                                                <User className="h-3 w-3 mr-1 flex-shrink-0" />
                                                                                <span className="truncate">
                                                                                    {
                                                                                        course.instructor
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="h-full bg-gray-50 rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                                                        <span className="text-xs text-gray-400">
                                                            Free
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {
                                courseSchedule.reduce((acc, course) => {
                                    if (
                                        !acc.find(
                                            (c) =>
                                                c.courseCode ===
                                                course.courseCode
                                        )
                                    )
                                        acc.push(course);
                                    return acc;
                                }, []).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Courses
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {courseSchedule.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Classes/Week
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {weekDays.length}
                        </div>
                        <div className="text-sm text-gray-600">Active Days</div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {timeSlots.length}h
                        </div>
                        <div className="text-sm text-gray-600">Daily Hours</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
