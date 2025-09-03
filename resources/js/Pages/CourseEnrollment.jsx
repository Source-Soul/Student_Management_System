import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/ui/card";
import { Button } from "../Components/button";
import { Badge } from "../Components/badge";
import { Input } from "../Components/input";
import { Label } from "../Components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../Components/ui/dialog";
import { Alert, AlertDescription } from "../Components/alert";
import {
    BookOpen,
    Search,
    Filter,
    ShoppingCart,
    Check,
    X,
    AlertTriangle,
    Trash2,
    GraduationCap,
    RefreshCw,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function CourseEnrollment() {
    const [selectedSemester, setSelectedSemester] = useState("all");
    const [selectedCreditRange, setSelectedCreditRange] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [enrollmentLocked, setEnrollmentLocked] = useState(false);

    const maxCredits = 18;

    const allCourses = [
        {
            code: "CS401",
            name: "Advanced Database Systems",
            credits: 3,
            prerequisites: ["CS301", "CS250"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Fall", "Spring"],
            instructor: "Dr. Johnson",
            description:
                "Advanced concepts in database design, optimization, and distributed systems.",
        },
        {
            code: "CS402",
            name: "Machine Learning",
            credits: 4,
            prerequisites: ["MATH301", "CS301"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Fall"],
            instructor: "Dr. Smith",
            description:
                "Introduction to machine learning algorithms and their applications.",
        },
        {
            code: "CS403",
            name: "Software Engineering",
            credits: 3,
            prerequisites: ["CS250"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Spring"],
            instructor: "Prof. Williams",
            description:
                "Software development methodologies and project management.",
        },
        {
            code: "CS250",
            name: "Data Structures",
            credits: 3,
            prerequisites: ["CS101"],
            prerequisitesSatisfied: true,
            status: "Retake Eligible",
            semester: ["Fall", "Spring"],
            instructor: "Dr. Anderson",
            description: "Fundamental data structures and algorithms.",
            grade: "F",
        },
        {
            code: "MATH302",
            name: "Statistics",
            credits: 3,
            prerequisites: ["MATH201"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Fall", "Spring"],
            instructor: "Prof. Davis",
            description: "Statistical methods and probability theory.",
        },
        {
            code: "CS101",
            name: "Introduction to Programming",
            credits: 3,
            prerequisites: [],
            prerequisitesSatisfied: true,
            status: "Completed",
            semester: ["Fall", "Spring"],
            instructor: "Dr. Smith",
            description: "Basic programming concepts and problem solving.",
            grade: "A-",
        },
        {
            code: "CS404",
            name: "Computer Networks",
            credits: 3,
            prerequisites: ["CS301", "CS250"],
            prerequisitesSatisfied: false,
            status: "Available",
            semester: ["Fall"],
            instructor: "Dr. Wilson",
            description: "Network protocols, architecture, and security.",
        },
        {
            code: "CS405",
            name: "Artificial Intelligence",
            credits: 4,
            prerequisites: ["CS301", "MATH301"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Spring"],
            instructor: "Dr. Brown",
            description:
                "AI concepts, search algorithms, and knowledge representation.",
        },
        {
            code: "ENG201",
            name: "Advanced Technical Writing",
            credits: 2,
            prerequisites: ["ENG101"],
            prerequisitesSatisfied: true,
            status: "Available",
            semester: ["Fall", "Spring"],
            instructor: "Ms. Taylor",
            description: "Advanced writing skills for technical documentation.",
        },
    ];

    const getFilteredCourses = () => {
        return allCourses.filter((course) => {
            const matchesSearch =
                searchQuery === "" ||
                course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesSemester =
                selectedSemester === "all" ||
                course.semester.includes(selectedSemester);
            const matchesCredits =
                selectedCreditRange === "all" ||
                (selectedCreditRange === "1-2" &&
                    course.credits >= 1 &&
                    course.credits <= 2) ||
                (selectedCreditRange === "3" && course.credits === 3) ||
                (selectedCreditRange === "4+" && course.credits >= 4);
            const matchesStatus =
                selectedStatus === "all" || course.status === selectedStatus;
            return (
                matchesSearch &&
                matchesSemester &&
                matchesCredits &&
                matchesStatus
            );
        });
    };

    const getTotalSelectedCredits = () =>
        selectedCourses.reduce((total, course) => total + course.credits, 0);

    const getStatusBadge = (course) => {
        switch (course.status) {
            case "Available":
                return (
                    <Badge className="bg-green-500 text-white flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Available
                    </Badge>
                );
            case "Completed":
                return (
                    <Badge className="bg-blue-500 text-white flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                    </Badge>
                );
            case "Failed":
                return (
                    <Badge className="bg-red-500 text-white flex items-center">
                        <XCircle className="h-3 w-3 mr-1" />
                        Failed
                    </Badge>
                );
            case "Retake Eligible":
                return (
                    <Badge className="bg-orange-500 text-white flex items-center">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retake Eligible
                    </Badge>
                );
            default:
                return <Badge>{course.status}</Badge>;
        }
    };

    const getPrerequisiteIcon = (satisfied) =>
        satisfied ? (
            <Check className="h-4 w-4 text-green-500" />
        ) : (
            <X className="h-4 w-4 text-red-500" />
        );

    const canEnrollInCourse = (course) => {
        if (enrollmentLocked) return false;
        if (course.status === "Completed") return false;
        if (selectedCourses.some((selected) => selected.code === course.code))
            return false;
        return true;
    };

    const getEnrollButtonText = (course) => {
        if (enrollmentLocked) return "Enrollment Locked";
        if (course.status === "Completed") return "Already Completed";
        if (selectedCourses.some((selected) => selected.code === course.code))
            return "Already Selected";
        if (course.status === "Retake Eligible") return "Retake Course";
        return "Enroll";
    };

    const handleEnrollClick = (course) => {
        if (!canEnrollInCourse(course)) return;
        if (!course.prerequisitesSatisfied) {
            toast.error(`Prerequisites not satisfied for ${course.code}`);
            return;
        }
        if (getTotalSelectedCredits() + course.credits > maxCredits) {
            toast.error(
                `Adding this course would exceed the ${maxCredits} credit limit`
            );
            return;
        }
        setSelectedCourses([...selectedCourses, course]);
        toast.success(`${course.code} added to cart`);
    };

    const handleRemoveFromCart = (courseCode) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.code !== courseCode)
        );
        toast.success("Course removed from cart");
    };

    const handleConfirmEnrollment = () => setShowConfirmationModal(true);

    const handleFinalEnrollment = () => {
        setEnrollmentLocked(true);
        setShowConfirmationModal(false);
        setSelectedCourses([]);
        toast.success(
            "Successfully enrolled in courses! Enrollment is now locked for this semester."
        );
    };

    const filteredCourses = getFilteredCourses();
    const totalSelectedCredits = getTotalSelectedCredits();
    const isOverCreditLimit = totalSelectedCredits > maxCredits;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Course Enrollment
                    </h1>
                    <p className="text-gray-600">
                        Select courses for Spring 2025 semester
                    </p>
                    {enrollmentLocked && (
                        <Alert className="mt-4 border-blue-200 bg-blue-50 flex items-center">
                            <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
                            <AlertDescription>
                                Enrollment is locked for this semester. No
                                changes can be made.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Filters */}
                        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Filter className="h-5 w-5 mr-2 text-blue-600" />{" "}
                                    Filters & Search
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <Label htmlFor="search">
                                            Search Courses
                                        </Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="search"
                                                placeholder="Course code or name..."
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Semester Offering</Label>
                                        <Select
                                            value={selectedSemester}
                                            onValueChange={setSelectedSemester}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Semesters" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    All Semesters
                                                </SelectItem>
                                                <SelectItem value="Fall">
                                                    Fall
                                                </SelectItem>
                                                <SelectItem value="Spring">
                                                    Spring
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Credit Range</Label>
                                        <Select
                                            value={selectedCreditRange}
                                            onValueChange={
                                                setSelectedCreditRange
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Credits" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    All Credits
                                                </SelectItem>
                                                <SelectItem value="1-2">
                                                    1-2 Credits
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3 Credits
                                                </SelectItem>
                                                <SelectItem value="4+">
                                                    4+ Credits
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Course Status</Label>
                                        <Select
                                            value={selectedStatus}
                                            onValueChange={setSelectedStatus}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All Statuses" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    All Statuses
                                                </SelectItem>
                                                <SelectItem value="Available">
                                                    Available
                                                </SelectItem>
                                                <SelectItem value="Completed">
                                                    Already Completed
                                                </SelectItem>
                                                <SelectItem value="Failed">
                                                    Failed
                                                </SelectItem>
                                                <SelectItem value="Retake Eligible">
                                                    Retake Eligible
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Catalog */}
                        <Card className="bg-white border border-gray-200 shadow-lg rounded-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />{" "}
                                    Course Catalog ({filteredCourses.length}{" "}
                                    courses)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {filteredCourses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="font-semibold text-lg text-gray-900">
                                                            {course.code} -{" "}
                                                            {course.name}
                                                        </h3>
                                                        <Badge variant="outline">
                                                            {course.credits}{" "}
                                                            credits
                                                        </Badge>
                                                        {getStatusBadge(course)}
                                                        {course.grade && (
                                                            <Badge className="bg-gray-500 text-white">
                                                                Grade:{" "}
                                                                {course.grade}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-3">
                                                        {course.description}
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <span className="font-medium text-gray-700">
                                                                Instructor:
                                                            </span>
                                                            <p className="text-gray-600">
                                                                {
                                                                    course.instructor
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-gray-700">
                                                                Offered:
                                                            </span>
                                                            <p className="text-gray-600">
                                                                {course.semester.join(
                                                                    ", "
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-gray-700">
                                                                Prerequisites:
                                                            </span>
                                                            <div className="flex items-center space-x-2">
                                                                {getPrerequisiteIcon(
                                                                    course.prerequisitesSatisfied
                                                                )}
                                                                <span className="text-gray-600">
                                                                    {course
                                                                        .prerequisites
                                                                        .length >
                                                                    0
                                                                        ? course.prerequisites.join(
                                                                              ", "
                                                                          )
                                                                        : "None"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <Button
                                                        onClick={() =>
                                                            handleEnrollClick(
                                                                course
                                                            )
                                                        }
                                                        disabled={
                                                            !canEnrollInCourse(
                                                                course
                                                            )
                                                        }
                                                        className={`${
                                                            course.status ===
                                                            "Retake Eligible"
                                                                ? "bg-orange-500 hover:bg-orange-600"
                                                                : "bg-blue-500 hover:bg-blue-600"
                                                        } ${
                                                            !canEnrollInCourse(
                                                                course
                                                            )
                                                                ? "opacity-50 cursor-not-allowed"
                                                                : ""
                                                        }`}
                                                    >
                                                        {getEnrollButtonText(
                                                            course
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Selected Courses Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />{" "}
                                        Selected Courses
                                    </CardTitle>
                                    <CardDescription>
                                        {selectedCourses.length} course
                                        {selectedCourses.length !== 1
                                            ? "s"
                                            : ""}{" "}
                                        selected
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {selectedCourses.length === 0 ? (
                                        <p className="text-gray-500 text-center py-8">
                                            No courses selected
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedCourses.map(
                                                (course, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                                    >
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">
                                                                {course.code}
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                {course.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {course.credits}{" "}
                                                                credits
                                                            </p>
                                                            {course.status ===
                                                                "Retake Eligible" && (
                                                                <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">
                                                                    Retake
                                                                    Attempt
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    course.code
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {selectedCourses.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-medium">
                                                    Total Credits:
                                                </span>
                                                <span
                                                    className={`font-bold ${
                                                        isOverCreditLimit
                                                            ? "text-red-600"
                                                            : "text-green-600"
                                                    }`}
                                                >
                                                    {totalSelectedCredits} /{" "}
                                                    {maxCredits}
                                                </span>
                                            </div>

                                            {isOverCreditLimit && (
                                                <Alert className="mb-4 border-red-200 bg-red-50 flex items-center">
                                                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                                                    <AlertDescription className="text-red-800">
                                                        Credit limit exceeded!
                                                        Remove some courses to
                                                        continue.
                                                    </AlertDescription>
                                                </Alert>
                                            )}

                                            <Button
                                                onClick={
                                                    handleConfirmEnrollment
                                                }
                                                disabled={
                                                    selectedCourses.length ===
                                                        0 ||
                                                    isOverCreditLimit ||
                                                    enrollmentLocked
                                                }
                                                className="w-full bg-green-500 hover:bg-green-600"
                                            >
                                                Confirm Enrollment
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                <Dialog
                    open={showConfirmationModal}
                    onOpenChange={setShowConfirmationModal}
                >
                    <DialogContent className="w-full sm:max-w-2xl mx-4 sm:mx-auto bg-white border border-gray-200 shadow-lg rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="flex items-center">
                                <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />{" "}
                                Confirm Course Enrollment
                            </DialogTitle>
                            <DialogDescription>
                                Please review your course selection for Spring
                                2025 semester.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium mb-3">
                                    Selected Courses:
                                </h4>
                                <div className="space-y-2">
                                    {selectedCourses.map((course, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <span className="font-medium">
                                                    {course.code}
                                                </span>{" "}
                                                - {course.name}
                                                {course.status ===
                                                    "Retake Eligible" && (
                                                    <Badge className="bg-orange-100 text-orange-800 text-xs ml-2">
                                                        Retake Attempt
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {course.credits} credits
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center font-medium">
                                <span>Total Credits:</span>
                                <span className="text-blue-600">
                                    {totalSelectedCredits} credits
                                </span>
                            </div>
                            <Alert className="border-yellow-200 bg-yellow-50 flex items-center">
                                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                                <AlertDescription>
                                    Once confirmed, you cannot modify your
                                    enrollment for this semester.
                                </AlertDescription>
                            </Alert>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleFinalEnrollment}
                                className="bg-green-500 hover:bg-green-600"
                            >
                                Enroll Now
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
