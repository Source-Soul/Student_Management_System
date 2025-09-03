import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/card";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/textarea";
import { Progress } from "../components/progress";
import { Label } from "../components/label";
import {
    Star,
    MessageSquare,
    User,
    BookOpen,
    Calendar,
    GraduationCap,
    Shield,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

// ===== MOCK DATA =====
const enrolledCourses = [
    {
        courseCode: "CSE301",
        courseTitle: "Data Structures and Algorithms",
        instructor: "Dr. Sarah Johnson",
        semester: "Spring 2025",
        credits: 3,
        attempt: 1,
        isRetake: false,
    },
    {
        courseCode: "CSE250",
        courseTitle: "Database Management Systems",
        instructor: "Dr. Emily Anderson",
        semester: "Spring 2025",
        credits: 3,
        attempt: 1,
        isRetake: false,
    },
    {
        courseCode: "CSE102",
        courseTitle: "Object Oriented Programming",
        instructor: "Prof. Michael Williams",
        semester: "Spring 2025",
        credits: 3,
        attempt: 2,
        isRetake: true,
    },
    {
        courseCode: "MATH301",
        courseTitle: "Linear Algebra",
        instructor: "Dr. Lisa Davis",
        semester: "Spring 2025",
        credits: 3,
        attempt: 1,
        isRetake: false,
    },
];

const ratingQuestions = [
    {
        key: "contentOrganization",
        text: "The course content was well-organized and structured",
    },
    {
        key: "instructorClarity",
        text: "The instructor explained concepts clearly and effectively",
    },
    {
        key: "learningOutcomes",
        text: "The course helped me achieve the stated learning outcomes",
    },
    {
        key: "workloadBalance",
        text: "The workload was appropriate for the credit hours",
    },
    {
        key: "evaluationFairness",
        text: "The evaluation system (assignments, exams, quizzes) was fair",
    },
];

const instructorQuestions = [
    {
        key: "communication",
        text: "Instructor's communication skills were effective",
    },
    {
        key: "availability",
        text: "Instructor was available for help outside class hours",
    },
    {
        key: "encouragement",
        text: "Instructor encouraged student participation and questions",
    },
    {
        key: "professionalism",
        text: "Instructor maintained professionalism and appropriate conduct",
    },
];

const ratingLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
];

export default function CourseFeedback() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [feedbackData, setFeedbackData] = useState({
        courseId: "",
        attempt: 1,
        ratings: {
            contentOrganization: 0,
            instructorClarity: 0,
            learningOutcomes: 0,
            workloadBalance: 0,
            evaluationFairness: 0,
        },
        instructorRatings: {
            communication: 0,
            availability: 0,
            encouragement: 0,
            professionalism: 0,
        },
        openEnded: {
            liked: "",
            improvements: "",
            additional: "",
        },
    });

    const totalSteps = 3;
    const progress = (currentStep / totalSteps) * 100;

    // ===== HANDLERS =====
    const handleCourseSelect = (courseCode) => {
        const course = enrolledCourses.find((c) => c.courseCode === courseCode);
        setSelectedCourse(course || null);
        setFeedbackData((prev) => ({
            ...prev,
            courseId: courseCode,
            attempt: course?.attempt || 1,
        }));
    };

    const handleRatingChange = (category, subcategory, value) => {
        setFeedbackData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [subcategory]: value,
            },
        }));
    };

    const handleOpenEndedChange = (field, value) => {
        setFeedbackData((prev) => ({
            ...prev,
            openEnded: {
                ...prev.openEnded,
                [field]: value,
            },
        }));
    };

    const renderStarRating = (category, subcategory, currentValue) => (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() =>
                        handleRatingChange(category, subcategory, star)
                    }
                    className={`p-1 rounded-full transition-colors ${
                        star <= currentValue
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-300 hover:text-gray-400"
                    }`}
                >
                    <Star
                        className={`h-6 w-6 ${
                            star <= currentValue ? "fill-current" : ""
                        }`}
                    />
                </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {currentValue > 0
                    ? ratingLabels[currentValue - 1]
                    : "Not rated"}
            </span>
        </div>
    );

    const isStepComplete = (step) => {
        switch (step) {
            case 1:
                return Object.values(feedbackData.ratings).every((r) => r > 0);
            case 2:
                return Object.values(feedbackData.instructorRatings).every(
                    (r) => r > 0
                );
            case 3:
                return feedbackData.openEnded.liked.trim() !== "";
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps && isStepComplete(currentStep))
            setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = () => {
        toast.success("Feedback submitted successfully!");
        setSelectedCourse(null);
        setCurrentStep(1);
        setFeedbackData({
            courseId: "",
            attempt: 1,
            ratings: {
                contentOrganization: 0,
                instructorClarity: 0,
                learningOutcomes: 0,
                workloadBalance: 0,
                evaluationFairness: 0,
            },
            instructorRatings: {
                communication: 0,
                availability: 0,
                encouragement: 0,
                professionalism: 0,
            },
            openEnded: { liked: "", improvements: "", additional: "" },
        });
    };

    // ===== RENDER =====
    if (!selectedCourse) {
        return (
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                <Card className="border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 gradient-student rounded-xl flex items-center justify-center">
                                <MessageSquare className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Course Feedback
                                </h1>
                                <p className="text-gray-600">
                                    Share your learning experience
                                </p>
                            </div>
                        </div>

                        <Card className="border border-gray-200 bg-gray-50">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                                    Select Course to Evaluate
                                </CardTitle>
                                <CardDescription>
                                    Choose a course from your current semester
                                    to provide feedback
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Select onValueChange={handleCourseSelect}>
                                    <SelectTrigger className="w-full bg-white">
                                        <SelectValue placeholder="Select a course..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enrolledCourses.map((course) => (
                                            <SelectItem
                                                key={`${course.courseCode}-${course.attempt}`}
                                                value={course.courseCode}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span>
                                                        {course.courseCode} -{" "}
                                                        {course.courseTitle}
                                                    </span>
                                                    {course.isRetake && (
                                                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                                                            Retake (Attempt{" "}
                                                            {course.attempt})
                                                        </Badge>
                                                    )}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 gradient-student rounded-xl flex items-center justify-center">
                    <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Course Feedback
                    </h1>
                    <p className="text-gray-600">
                        Share your learning experience
                    </p>
                </div>
            </div>

            {/* COURSE HEADER */}
            <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            {selectedCourse.courseCode} -{" "}
                            {selectedCourse.courseTitle}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {selectedCourse.instructor} |{" "}
                            {selectedCourse.semester} | {selectedCourse.credits}{" "}
                            Credits
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCourse(null)}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Change Course
                    </Button>
                </CardContent>
            </Card>

            {/* PROGRESS */}
            <Progress value={progress} className="h-2" />

            {/* STEP CONTENT */}
            {currentStep === 1 && (
                <Card className="border-0 shadow-lg bg-white p-4 space-y-4">
                    {ratingQuestions.map((q) => (
                        <div key={q.key} className="space-y-2">
                            <Label>{q.text}</Label>
                            {renderStarRating(
                                "ratings",
                                q.key,
                                feedbackData.ratings[q.key]
                            )}
                        </div>
                    ))}
                </Card>
            )}

            {currentStep === 2 && (
                <Card className="border-0 shadow-lg bg-white p-4 space-y-4">
                    {instructorQuestions.map((q) => (
                        <div key={q.key} className="space-y-2">
                            <Label>{q.text}</Label>
                            {renderStarRating(
                                "instructorRatings",
                                q.key,
                                feedbackData.instructorRatings[q.key]
                            )}
                        </div>
                    ))}
                </Card>
            )}

            {currentStep === 3 && (
                <Card className="border-0 shadow-lg bg-white p-4 space-y-4">
                    <Label>What did you like most about the course?</Label>
                    <Textarea
                        value={feedbackData.openEnded.liked}
                        onChange={(e) =>
                            handleOpenEndedChange("liked", e.target.value)
                        }
                    />
                    <Label>Suggestions for improvement</Label>
                    <Textarea
                        value={feedbackData.openEnded.improvements}
                        onChange={(e) =>
                            handleOpenEndedChange(
                                "improvements",
                                e.target.value
                            )
                        }
                    />
                    <Label>Additional comments (optional)</Label>
                    <Textarea
                        value={feedbackData.openEnded.additional}
                        onChange={(e) =>
                            handleOpenEndedChange("additional", e.target.value)
                        }
                    />
                </Card>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                {currentStep < totalSteps ? (
                    <Button
                        onClick={handleNext}
                        disabled={!isStepComplete(currentStep)}
                    >
                        Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={!isStepComplete(currentStep)}
                    >
                        Submit Feedback
                    </Button>
                )}
            </div>
        </div>
    );
}
