import { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Button } from "../Components/button";
import { Badge } from "../Components/badge";
import { Avatar, AvatarFallback } from "../Components/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../Components/table";
import { Alert, AlertDescription } from "../Components/alert";
import {
    Clock,
    User,
    GraduationCap,
    Calendar,
    AlertTriangle,
    CheckCircle,
    XCircle,
    RefreshCw,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Filter,
} from "lucide-react";

export function AttendanceTracking() {
    const [semesterFilter, setSemesterFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortField, setSortField] = useState("attendancePercentage");
    const [sortOrder, setSortOrder] = useState("desc");

    const studentData = {
        name: "Lubna Rahman",
        studentId: "20210001",
        program: "Bachelor of Science in Computer Science",
        currentSemester: "Spring 2025",
        section: "A",
    };

    const attendanceData = [
        {
            courseCode: "CS301",
            courseName: "Data Structures and Algorithms",
            credits: 3,
            classesHeld: 28,
            classesAttended: 26,
            attendancePercentage: 92.9,
            semester: "Spring 2025",
            status: "Ongoing",
            instructor: "Dr. Johnson",
        },
        {
            courseCode: "MATH301",
            courseName: "Linear Algebra",
            credits: 4,
            classesHeld: 32,
            classesAttended: 28,
            attendancePercentage: 87.5,
            semester: "Spring 2025",
            status: "Ongoing",
            instructor: "Prof. Williams",
        },
        {
            courseCode: "CS250",
            courseName: "Data Structures",
            credits: 3,
            classesHeld: 24,
            classesAttended: 18,
            attendancePercentage: 75.0,
            semester: "Spring 2025",
            status: "Retake",
            instructor: "Dr. Anderson",
            isRetakeAttempt: true,
            originalAttempt: "Spring 2024",
            originalAttendance: 45.2,
        },
        {
            courseCode: "ENG101",
            courseName: "Technical Writing",
            credits: 2,
            classesHeld: 20,
            classesAttended: 11,
            attendancePercentage: 55.0,
            semester: "Spring 2025",
            status: "Ongoing",
            instructor: "Ms. Davis",
        },
        {
            courseCode: "CS101",
            courseName: "Introduction to Programming",
            credits: 3,
            classesHeld: 30,
            classesAttended: 28,
            attendancePercentage: 93.3,
            semester: "Fall 2024",
            status: "Completed",
            instructor: "Dr. Smith",
        },
        {
            courseCode: "MATH201",
            courseName: "Calculus II",
            credits: 4,
            classesHeld: 36,
            classesAttended: 32,
            attendancePercentage: 88.9,
            semester: "Fall 2024",
            status: "Completed",
            instructor: "Prof. Brown",
        },
        {
            courseCode: "PHYS101",
            courseName: "General Physics",
            credits: 3,
            classesHeld: 28,
            classesAttended: 17,
            attendancePercentage: 60.7,
            semester: "Fall 2024",
            status: "Completed",
            instructor: "Dr. Wilson",
        },
        {
            courseCode: "CS250",
            courseName: "Data Structures",
            credits: 3,
            classesHeld: 30,
            classesAttended: 14,
            attendancePercentage: 46.7,
            semester: "Spring 2024",
            status: "Completed",
            instructor: "Dr. Anderson",
        },
    ];

    const requiredAttendance = 60;

    const getAttendanceStatus = (percentage) => {
        if (percentage >= requiredAttendance)
            return {
                color: "text-green-600 bg-green-50 border-green-200",
                icon: CheckCircle,
            };
        if (percentage >= requiredAttendance - 10)
            return {
                color: "text-yellow-600 bg-yellow-50 border-yellow-200",
                icon: AlertTriangle,
            };
        return {
            color: "text-red-600 bg-red-50 border-red-200",
            icon: XCircle,
        };
    };

    const getStatusBadge = (record) => {
        if (record.status === "Retake")
            return (
                <Badge className="bg-orange-500 text-white">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Retake
                </Badge>
            );
        if (record.status === "Ongoing")
            return (
                <Badge className="bg-blue-500 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    Ongoing
                </Badge>
            );
        return (
            <Badge className="bg-gray-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
            </Badge>
        );
    };

    const filteredAndSortedData = useMemo(() => {
        let filtered = attendanceData.filter(
            (record) =>
                (semesterFilter === "all" ||
                    record.semester === semesterFilter) &&
                (statusFilter === "all" || record.status === statusFilter)
        );

        return filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            if (typeof aVal === "string") {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            if (sortOrder === "asc")
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        });
    }, [semesterFilter, statusFilter, sortField, sortOrder]);

    const handleSort = (field) => {
        if (sortField === field)
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        else {
            setSortField(field);
            setSortOrder("desc");
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field)
            return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
        return sortOrder === "asc" ? (
            <ArrowUp className="h-4 w-4 text-blue-600" />
        ) : (
            <ArrowDown className="h-4 w-4 text-blue-600" />
        );
    };

    const ongoingCourses = filteredAndSortedData.filter(
        (r) => r.status === "Ongoing" || r.status === "Retake"
    );
    const lowAttendanceCourses = ongoingCourses.filter(
        (r) => r.attendancePercentage < requiredAttendance
    );
    const warningCourses = ongoingCourses.filter(
        (r) =>
            r.attendancePercentage >= requiredAttendance - 10 &&
            r.attendancePercentage < requiredAttendance
    );
    const overallAttendance = filteredAndSortedData.length
        ? filteredAndSortedData.reduce(
              (sum, r) => sum + r.attendancePercentage,
              0
          ) / filteredAndSortedData.length
        : 0;

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen">
            {/* Header Card */}
            <Card className="border-0 shadow-lg">
                <CardContent className="p-6 flex items-center space-x-6">
                    <Avatar className="h-20 w-20 border-2 border-gray-300">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                            {studentData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {studentData.name}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-600">
                                    Student ID:
                                </span>
                                <span className="font-medium text-gray-900">
                                    {studentData.studentId}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <GraduationCap className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-600">Program:</span>
                                <span className="font-medium text-gray-900">
                                    {studentData.program}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-600">
                                    Current Semester:
                                </span>
                                <span className="font-medium text-gray-900">
                                    {studentData.currentSemester}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 text-center">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">
                                {overallAttendance.toFixed(1)}%
                            </div>
                            <div className="text-sm text-blue-600">
                                Overall Attendance
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Alerts */}
            {(lowAttendanceCourses.length || warningCourses.length) && (
                <div className="space-y-3">
                    {lowAttendanceCourses.length > 0 && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                                <strong>Action Required:</strong>{" "}
                                {lowAttendanceCourses.length} course
                                {lowAttendanceCourses.length > 1 ? "s" : ""}{" "}
                                below minimum attendance ({requiredAttendance}
                                %):{" "}
                                {lowAttendanceCourses
                                    .map((c) => c.courseCode)
                                    .join(", ")}
                            </AlertDescription>
                        </Alert>
                    )}
                    {warningCourses.length > 0 && (
                        <Alert className="border-yellow-200 bg-yellow-50">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-800">
                                <strong>Warning:</strong>{" "}
                                {warningCourses.length} course
                                {warningCourses.length > 1 ? "s" : ""} close to
                                minimum attendance:{" "}
                                {warningCourses
                                    .map((c) => c.courseCode)
                                    .join(", ")}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}

            {/* Filters */}
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Filter className="h-5 w-5 mr-2 text-blue-600" />
                        Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Semester
                            </label>
                            <Select
                                value={semesterFilter}
                                onValueChange={setSemesterFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Semesters" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Semesters
                                    </SelectItem>
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
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Course Status
                            </label>
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Statuses
                                    </SelectItem>
                                    <SelectItem value="Ongoing">
                                        Ongoing
                                    </SelectItem>
                                    <SelectItem value="Retake">
                                        Retake
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-blue-600" />
                        Course-wise Attendance
                    </CardTitle>
                    <CardDescription>
                        Track your attendance across all courses. Minimum
                        required: {requiredAttendance}%
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {[
                                        "courseCode",
                                        "courseName",
                                        "credits",
                                        "classesHeld",
                                        "attendancePercentage",
                                    ].map((f) => (
                                        <TableHead key={f}>
                                            <Button
                                                variant="ghost"
                                                className="h-auto p-0 font-medium text-left justify-start"
                                                onClick={() => handleSort(f)}
                                            >
                                                {f.replace(/([A-Z])/g, " $1")}{" "}
                                                {getSortIcon(f)}
                                            </Button>
                                        </TableHead>
                                    ))}
                                    <TableHead>Classes Attended</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Semester</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAndSortedData.map((record, index) => {
                                    const statusInfo = getAttendanceStatus(
                                        record.attendancePercentage
                                    );
                                    const StatusIcon = statusInfo.icon;
                                    return (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-gray-50"
                                        >
                                            <TableCell className="font-medium">
                                                {record.courseCode}
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium text-gray-900">
                                                    {record.courseName}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {record.instructor}
                                                </p>
                                                {record.isRetakeAttempt && (
                                                    <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">
                                                        Retake Attempt
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {record.credits}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {record.classesHeld}
                                            </TableCell>
                                            <TableCell>
                                                {record.classesAttended}
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={`inline-flex items-center px-3 py-1 rounded-lg border ${statusInfo.color}`}
                                                >
                                                    <StatusIcon className="h-4 w-4 mr-2" />
                                                    <span className="font-medium">
                                                        {record.attendancePercentage.toFixed(
                                                            1
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(record)}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-gray-600">
                                                    {record.semester}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {filteredAndSortedData.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No attendance records found for the selected
                                filters.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {filteredAndSortedData.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total Courses
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {
                                filteredAndSortedData.filter(
                                    (r) =>
                                        r.attendancePercentage >=
                                        requiredAttendance
                                ).length
                            }
                        </div>
                        <div className="text-sm text-gray-600">
                            Above Minimum
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {warningCourses.length}
                        </div>
                        <div className="text-sm text-gray-600">At Risk</div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {lowAttendanceCourses.length}
                        </div>
                        <div className="text-sm text-gray-600">
                            Below Minimum
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
