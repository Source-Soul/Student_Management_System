import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Badge } from "../Components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import {
    BookOpen,
    Calendar,
    Clock,
    User,
    CheckCircle,
    XCircle,
    RefreshCw,
    Award,
} from "lucide-react";

export function MyCourses() {
    const currentCourses = [
        {
            code: "CS301",
            name: "Data Structures and Algorithms",
            credits: 3,
            semester: "Spring 2025",
            instructor: "Dr. Johnson",
            status: "Ongoing",
            grade: null,
        },
        {
            code: "MATH301",
            name: "Linear Algebra",
            credits: 4,
            semester: "Spring 2025",
            instructor: "Prof. Williams",
            status: "Ongoing",
            grade: null,
        },
        {
            code: "CS250",
            name: "Data Structures",
            credits: 3,
            semester: "Spring 2025",
            instructor: "Dr. Anderson",
            status: "Ongoing (Retake)",
            grade: null,
            isRetake: true,
            originalAttempt: "Spring 2024",
        },
        {
            code: "ENG101",
            name: "Technical Writing",
            credits: 2,
            semester: "Spring 2025",
            instructor: "Ms. Davis",
            status: "Ongoing",
            grade: null,
        },
    ];

    const previousCourses = [
        {
            code: "CS101",
            name: "Introduction to Programming",
            credits: 3,
            semester: "Fall 2024",
            instructor: "Dr. Smith",
            status: "Completed",
            grade: "A-",
            finalGrade: "A-",
        },
        {
            code: "MATH201",
            name: "Calculus II",
            credits: 4,
            semester: "Fall 2024",
            instructor: "Prof. Brown",
            status: "Completed",
            grade: "A",
            finalGrade: "A",
        },
        {
            code: "PHYS101",
            name: "General Physics",
            credits: 3,
            semester: "Fall 2024",
            instructor: "Dr. Wilson",
            status: "Completed",
            grade: "B+",
            finalGrade: "B+",
        },
        {
            code: "ENG100",
            name: "English Composition",
            credits: 3,
            semester: "Fall 2024",
            instructor: "Ms. Taylor",
            status: "Completed",
            grade: "A",
            finalGrade: "A",
        },
        {
            code: "CS250",
            name: "Data Structures",
            credits: 3,
            semester: "Spring 2024",
            instructor: "Dr. Anderson",
            status: "Failed",
            grade: "F",
            finalGrade: "F",
            isOriginalAttempt: true,
        },
        {
            code: "MATH150",
            name: "Discrete Mathematics",
            credits: 3,
            semester: "Spring 2024",
            instructor: "Prof. Lee",
            status: "Completed (Retake)",
            grade: "B+",
            finalGrade: "B+",
            isRetake: true,
            originalAttempt: "Fall 2023",
            originalGrade: "D",
        },
    ];

    const getStatusBadge = (status, isRetake) => {
        switch (status) {
            case "Ongoing":
                return (
                    <Badge className="bg-blue-500 text-white border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {isRetake ? "Ongoing (Retake)" : "Ongoing"}
                    </Badge>
                );
            case "Ongoing (Retake)":
                return (
                    <Badge className="bg-orange-500 text-white border-0">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Ongoing (Retake)
                    </Badge>
                );
            case "Completed":
                return (
                    <Badge className="bg-green-500 text-white border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                    </Badge>
                );
            case "Completed (Retake)":
                return (
                    <Badge className="bg-green-600 text-white border-0">
                        <Award className="h-3 w-3 mr-1" />
                        Completed (Retake)
                    </Badge>
                );
            case "Failed":
                return (
                    <Badge className="bg-red-500 text-white border-0">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getGradeBadge = (grade) => {
        if (!grade) return null;

        const gradeColors = {
            A: "bg-green-600",
            "A-": "bg-green-500",
            "B+": "bg-blue-500",
            B: "bg-blue-400",
            "B-": "bg-blue-300",
            "C+": "bg-yellow-500",
            C: "bg-yellow-400",
            D: "bg-orange-500",
            F: "bg-red-500",
        };

        const colorClass = gradeColors[grade] || "bg-gray-500";

        return (
            <Badge className={`${colorClass} text-white border-0 ml-2`}>
                {grade}
            </Badge>
        );
    };

    return (
        <div className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Courses
                </h1>
                <p className="text-gray-600">
                    Track your current and completed courses
                </p>
            </div>

            <Tabs defaultValue="current" className="space-y-4">
                <TabsList className="bg-white shadow-md rounded-lg">
                    <TabsTrigger
                        value="current"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Current Courses ({currentCourses.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Course History ({previousCourses.length})
                    </TabsTrigger>
                </TabsList>

                {/* Current Courses */}
                <TabsContent value="current" className="space-y-3">
                    <Card className="border-0 shadow-lg bg-white">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg p-4">
                            <CardTitle className="text-xl text-gray-900 flex items-center">
                                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                                Current Enrollment - Spring 2025
                            </CardTitle>
                            <CardDescription>
                                Courses you are currently enrolled in
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            {currentCourses.map((course, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2 hover:bg-blue-50 rounded-lg px-3 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-semibold text-gray-900">
                                                    {course.code}
                                                </span>
                                                <span className="text-gray-700">
                                                    {course.name}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {course.credits} credits
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getStatusBadge(
                                                    course.status,
                                                    course.isRetake
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                                            <span className="flex items-center">
                                                <User className="h-3 w-3 mr-1" />
                                                {course.instructor}
                                            </span>
                                            {course.isRetake && (
                                                <span className="text-orange-600 text-xs">
                                                    (Original attempt:{" "}
                                                    {course.originalAttempt})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Previous Courses */}
                <TabsContent value="completed" className="space-y-3">
                    <Card className="border-0 shadow-lg bg-white">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg p-4">
                            <CardTitle className="text-xl text-gray-900 flex items-center">
                                <Award className="h-5 w-5 mr-2 text-green-600" />
                                Course History
                            </CardTitle>
                            <CardDescription>
                                Previously completed and attempted courses
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 space-y-2">
                            {previousCourses.map((course, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2 hover:bg-green-50 rounded-lg px-3 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-semibold text-gray-900">
                                                    {course.code}
                                                </span>
                                                <span className="text-gray-700">
                                                    {course.name}
                                                </span>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {course.credits} credits
                                                </Badge>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {getStatusBadge(course.status)}
                                                {getGradeBadge(course.grade)}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                                            <span className="flex items-center">
                                                <User className="h-3 w-3 mr-1" />
                                                {course.instructor}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {course.semester}
                                            </span>
                                            {course.isRetake && (
                                                <span className="text-green-600 text-xs">
                                                    (Retake - Original:{" "}
                                                    {course.originalGrade} in{" "}
                                                    {course.originalAttempt})
                                                </span>
                                            )}
                                            {course.isOriginalAttempt && (
                                                <span className="text-red-600 text-xs">
                                                    (Currently retaking in
                                                    Spring 2025)
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
