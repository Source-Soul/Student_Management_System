import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/card";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../Components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import {
    GraduationCap,
    Download,
    FileText,
    TrendingUp,
    BookOpen,
    Award,
    AlertCircle,
    CheckCircle,
    Calendar,
    User,
    School,
} from "lucide-react";

export default function StudentResult() {
    const [selectedSemester, setSelectedSemester] = useState("All Semesters");
    const [selectedTab, setSelectedTab] = useState("transcript");

    // Mock student data
    const studentInfo = {
        name: "Lubna Rahman",
        studentId: "20210001",
        department: "Computer Science and Engineering",
        currentSemester: "7th Semester",
        program: "Bachelor of Science",
        session: "2021-2025",
    };

    // Mock course data with retake scenarios
    const allCourses = [
        {
            courseCode: "CSE101",
            courseTitle: "Introduction to Programming",
            credits: 3,
            grade: "A",
            gradePoint: 4.0,
            semester: "Spring 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "MATH101",
            courseTitle: "Calculus I",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Spring 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "ENG101",
            courseTitle: "English Composition",
            credits: 3,
            grade: "A-",
            gradePoint: 3.7,
            semester: "Spring 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "PHY101",
            courseTitle: "Physics I",
            credits: 3,
            grade: "B",
            gradePoint: 3.0,
            semester: "Spring 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE102",
            courseTitle: "Object Oriented Programming",
            credits: 3,
            grade: "F",
            gradePoint: 0.0,
            semester: "Fall 2021",
            status: "Failed (1st Attempt)",
            remarks: "Retaken in Spring 2022",
            attempt: 1,
            isLatestAttempt: false,
        },
        {
            courseCode: "MATH102",
            courseTitle: "Calculus II",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Fall 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "PHY102",
            courseTitle: "Physics II",
            credits: 3,
            grade: "B-",
            gradePoint: 2.7,
            semester: "Fall 2021",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE102",
            courseTitle: "Object Oriented Programming",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Spring 2022",
            status: "Completed (Retake)",
            remarks: "Previous attempt excluded from CGPA",
            attempt: 2,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE201",
            courseTitle: "Data Structures",
            credits: 3,
            grade: "A-",
            gradePoint: 3.7,
            semester: "Spring 2022",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "MATH201",
            courseTitle: "Linear Algebra",
            credits: 3,
            grade: "A",
            gradePoint: 4.0,
            semester: "Spring 2022",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE202",
            courseTitle: "Algorithms",
            credits: 3,
            grade: "A",
            gradePoint: 4.0,
            semester: "Fall 2022",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE203",
            courseTitle: "Database Systems",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Fall 2022",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE301",
            courseTitle: "Software Engineering",
            credits: 3,
            grade: "A-",
            gradePoint: 3.7,
            semester: "Spring 2023",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE302",
            courseTitle: "Computer Networks",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Spring 2023",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE401",
            courseTitle: "Operating Systems",
            credits: 3,
            grade: "A",
            gradePoint: 4.0,
            semester: "Fall 2023",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
        {
            courseCode: "CSE402",
            courseTitle: "Compiler Design",
            credits: 3,
            grade: "B+",
            gradePoint: 3.5,
            semester: "Fall 2023",
            status: "Completed",
            remarks: "",
            attempt: 1,
            isLatestAttempt: true,
        },
    ];

    // Semester summaries
    const semesters = [
        "Spring 2021",
        "Fall 2021",
        "Spring 2022",
        "Fall 2022",
        "Spring 2023",
        "Fall 2023",
    ];
    const semesterSummaries = semesters.map((semester) => {
        const semesterCourses = allCourses.filter(
            (c) => c.semester === semester
        );
        const totalCredits = semesterCourses.reduce((s, c) => s + c.credits, 0);
        const completedCredits = semesterCourses
            .filter((c) => c.status.includes("Completed"))
            .reduce((s, c) => s + c.credits, 0);
        const totalGradePoints = semesterCourses
            .filter((c) => c.grade !== "F")
            .reduce((s, c) => s + c.gradePoint * c.credits, 0);
        const totalCreditsForGPA = semesterCourses
            .filter((c) => c.grade !== "F")
            .reduce((s, c) => s + c.credits, 0);
        const semesterGPA =
            totalCreditsForGPA > 0 ? totalGradePoints / totalCreditsForGPA : 0;
        return {
            semester,
            totalCredits,
            completedCredits,
            semesterGPA: semesterGPA.toFixed(2),
            courses: semesterCourses,
        };
    });

    // Overall stats
    const latestAttemptCourses = allCourses.filter((c) => c.isLatestAttempt);
    const totalCreditsCompleted = latestAttemptCourses
        .filter((c) => c.status.includes("Completed"))
        .reduce((s, c) => s + c.credits, 0);
    const totalGradePoints = latestAttemptCourses
        .filter((c) => c.grade !== "F")
        .reduce((s, c) => s + c.gradePoint * c.credits, 0);
    const totalCreditsForCGPA = latestAttemptCourses
        .filter((c) => c.grade !== "F")
        .reduce((s, c) => s + c.credits, 0);
    const cgpa =
        totalCreditsForCGPA > 0 ? totalGradePoints / totalCreditsForCGPA : 0;
    const totalCreditsRequired = 160;
    const creditsRemaining = totalCreditsRequired - totalCreditsCompleted;

    // Filtered courses
    const filteredCourses =
        selectedSemester === "All Semesters"
            ? allCourses
            : allCourses.filter((c) => c.semester === selectedSemester);

    const getGradeColor = (grade) => {
        switch (grade) {
            case "A":
            case "A-":
                return "text-green-600 bg-green-50";
            case "B+":
            case "B":
                return "text-blue-600 bg-blue-50";
            case "B-":
                return "text-yellow-600 bg-yellow-50";
            case "C+":
            case "C":
                return "text-orange-600 bg-orange-50";
            case "F":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Completed":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                    </Badge>
                );
            case "Completed (Retake)":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Retake
                    </Badge>
                );
            case "Failed":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Failed
                    </Badge>
                );
            case "Failed (1st Attempt)":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Failed (1st)
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-800">
                        {status}
                    </Badge>
                );
        }
    };

    const handleExport = (format) => {
        console.log(`Exporting transcript as ${format.toUpperCase()}`);
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Student Info */}
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 gradient-student rounded-xl flex items-center justify-center">
                                <GraduationCap className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {studentInfo.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        ID: {studentInfo.studentId}
                                    </div>
                                    <div className="flex items-center">
                                        <School className="h-4 w-4 mr-1" />
                                        {studentInfo.department}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {studentInfo.currentSemester}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {studentInfo.program} • Session:{" "}
                                    {studentInfo.session}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleExport("pdf")}
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Export PDF
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleExport("excel")}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export Excel
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Academic Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <Award className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">
                                CGPA
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">
                            {cgpa.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            out of 4.00
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">
                                Completed
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {totalCreditsCompleted}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            credits
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <BookOpen className="h-5 w-5 text-orange-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">
                                Remaining
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            {creditsRemaining}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            credits
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-gray-600">
                                Progress
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                            {Math.round(
                                (totalCreditsCompleted / totalCreditsRequired) *
                                    100
                            )}
                            %
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            completed
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transcript */}
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            Academic Transcript
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                                Filter by:
                            </span>
                            <Select
                                value={selectedSemester}
                                onValueChange={setSelectedSemester}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="All Semesters">
                                        All Semesters
                                    </SelectItem>
                                    <SelectItem value="Spring 2021">
                                        Spring 2021
                                    </SelectItem>
                                    <SelectItem value="Fall 2021">
                                        Fall 2021
                                    </SelectItem>
                                    <SelectItem value="Spring 2022">
                                        Spring 2022
                                    </SelectItem>
                                    <SelectItem value="Fall 2022">
                                        Fall 2022
                                    </SelectItem>
                                    <SelectItem value="Spring 2023">
                                        Spring 2023
                                    </SelectItem>
                                    <SelectItem value="Fall 2023">
                                        Fall 2023
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <div className="px-6 pb-4">
                            <TabsList className="flex space-x-2 border-b border-gray-200">
                                <TabsTrigger
                                    value="transcript"
                                    className="px-4 py-2 rounded-t-lg data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm"
                                >
                                    Transcript
                                </TabsTrigger>
                                <TabsTrigger
                                    value="semester-summary"
                                    className="px-4 py-2 rounded-t-lg data-[state=active]:bg-gray-200 data-[state=active]:shadow-sm"
                                >
                                    Semester Summary
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="transcript" className="mt-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead className="font-medium">
                                                Course Code
                                            </TableHead>
                                            <TableHead className="font-medium">
                                                Course Title
                                            </TableHead>
                                            <TableHead className="font-medium text-center">
                                                Credits
                                            </TableHead>
                                            <TableHead className="font-medium text-center">
                                                Grade
                                            </TableHead>
                                            <TableHead className="font-medium text-center">
                                                Grade Point
                                            </TableHead>
                                            <TableHead className="font-medium text-center">
                                                Semester
                                            </TableHead>
                                            <TableHead className="font-medium text-center">
                                                Status
                                            </TableHead>
                                            <TableHead className="font-medium">
                                                Remarks
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredCourses.map(
                                            (course, index) => (
                                                <TableRow
                                                    key={index}
                                                    className={
                                                        course.grade === "F"
                                                            ? "bg-red-50"
                                                            : ""
                                                    }
                                                >
                                                    <TableCell className="font-medium text-blue-600">
                                                        {course.courseCode}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {course.courseTitle}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {course.credits}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge
                                                            className={`${getGradeColor(
                                                                course.grade
                                                            )} border-0`}
                                                        >
                                                            {course.grade}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center font-medium">
                                                        {course.gradePoint.toFixed(
                                                            1
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-center text-sm text-gray-600">
                                                        {course.semester}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {getStatusBadge(
                                                            course.status
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-gray-600">
                                                        {course.remarks || "-"}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="semester-summary" className="mt-0">
                            <div className="p-6 space-y-4">
                                {semesterSummaries
                                    .filter(
                                        (summary) =>
                                            selectedSemester ===
                                                "All Semesters" ||
                                            summary.semester ===
                                                selectedSemester
                                    )
                                    .map((summary) => (
                                        <Card
                                            key={summary.semester}
                                            className="border border-gray-200"
                                        >
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg">
                                                        {summary.semester}
                                                    </CardTitle>
                                                    <div className="flex items-center space-x-4 text-sm">
                                                        <span className="text-gray-600">
                                                            Credits:{" "}
                                                            <span className="font-medium">
                                                                {
                                                                    summary.completedCredits
                                                                }
                                                                /
                                                                {
                                                                    summary.totalCredits
                                                                }
                                                            </span>
                                                        </span>
                                                        <span className="text-gray-600">
                                                            GPA:{" "}
                                                            <span className="font-medium text-blue-600">
                                                                {
                                                                    summary.semesterGPA
                                                                }
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                    {summary.courses.map(
                                                        (course, index) => (
                                                            <Card
                                                                key={index}
                                                                className="border border-gray-100 bg-gray-50"
                                                            >
                                                                <CardContent className="p-3">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <span className="font-medium text-blue-600 text-sm">
                                                                            {
                                                                                course.courseCode
                                                                            }
                                                                        </span>
                                                                        <Badge
                                                                            className={`${getGradeColor(
                                                                                course.grade
                                                                            )} border-0 text-xs`}
                                                                        >
                                                                            {
                                                                                course.grade
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="text-xs text-gray-700 font-medium mb-1">
                                                                        {
                                                                            course.courseTitle
                                                                        }
                                                                    </p>
                                                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                                                        <span>
                                                                            {
                                                                                course.credits
                                                                            }{" "}
                                                                            credits
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                course.gradePoint
                                                                            }{" "}
                                                                            GP
                                                                        </span>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
            {/* Footer / Policy Notes */}
            <Card className="border-0 shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Academic Policies & Notes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                GPA Calculation
                            </h4>
                            <ul className="space-y-1 text-xs">
                                <li>
                                    • CGPA is calculated based on the latest
                                    attempt of each course
                                </li>
                                <li>
                                    • Failed courses (F grade) are excluded from
                                    GPA calculation
                                </li>
                                <li>
                                    • Retaken courses replace the previous
                                    attempt in CGPA
                                </li>
                                <li>
                                    • All attempts remain visible in the
                                    transcript
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">
                                Retake Policy
                            </h4>
                            <ul className="space-y-1 text-xs">
                                <li>
                                    • Students can retake failed courses in
                                    subsequent semesters
                                </li>
                                <li>
                                    • Only the latest attempt counts toward
                                    graduation requirements
                                </li>
                                <li>
                                    • Previous attempts are marked as excluded
                                    from CGPA
                                </li>
                                <li>
                                    • Minimum CGPA of 2.00 required for
                                    graduation
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                            This transcript is generated electronically and is
                            valid without signature. For official transcripts,
                            please contact the academic office.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
