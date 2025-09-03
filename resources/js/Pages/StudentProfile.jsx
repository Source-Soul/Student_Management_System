import React, { useState, useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../Components/card";
import { Badge } from "../Components/badge";
import { Avatar, AvatarFallback } from "../Components/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Components/tabs";
import {
    User,
    Phone,
    GraduationCap,
    BarChart3,
    Upload,
    Camera,
} from "lucide-react";
import { toast } from "sonner";

const StudentProfile = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    // Student data
    const studentData = {
        firstName: "Lubna",
        lastName: "Rahman",
        fullName: "Lubna Rahman",
        studentId: "20210001",
        section: "A",
        program: "Bachelor of Science",
        completedCredits: 85,
        totalCredits: 120,
        department: "Computer Science",
        currentSemester: "Spring 2025",
        advisor: "Dr. Anderson",
        status: "Active",
        birthDate: "March 15, 2003",
        gender: "Female",
        bloodGroup: "A+",
        fatherName: "Robert Rahman",
        motherName: "Mary Rahman",
        religion: "Islam",
        contactNo: "+1 (555) 123-4567",
        email: "lubna.rahman@university.edu",
    };

    const contactInfo = {
        email: studentData.email,
        phone: studentData.contactNo,
        address:
            "123 University Avenue, Student Housing Block B, Room 205, University City, State 12345",
        emergencyContact: "+1 (555) 987-6543",
        emergencyContactName: "Robert Rahman (Father)",
    };

    const academicInfo = {
        enrollmentDate: "August 30, 2021",
        expectedGraduation: "May 2025",
        advisorEmail: "anderson@university.edu",
        recentGrades: [
            { semester: "Fall 2024", gpa: 3.8, courses: 5 },
            { semester: "Spring 2024", gpa: 3.6, courses: 4 },
            { semester: "Fall 2023", gpa: 3.5, courses: 5 },
        ],
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
                toast.success("Profile picture updated successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerImageUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Profile Header */}
            <Card className="border border-gray-300 shadow-sm">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                    <div className="relative group">
                        <div
                            className="relative cursor-pointer"
                            onClick={triggerImageUpload}
                        >
                            <Avatar className="h-32 w-32 border-2 border-gray-300 group-hover:border-gray-400 transition-all">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <AvatarFallback className="bg-gray-100 text-gray-700 text-2xl">
                                        {studentData.firstName[0]}
                                        {studentData.lastName[0]}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                                <Camera className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 rounded-full p-2 shadow-lg transition-colors">
                                <Upload className="h-4 w-4 text-white" />
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {studentData.fullName}
                        </h1>
                        <Badge className="bg-green-500 text-white mb-4">
                            {studentData.status}
                        </Badge>
                    </div>

                    <div className="w-full max-w-2xl space-y-1">
                        {[
                            ["Student ID", studentData.studentId],
                            ["Section", studentData.section],
                            ["Degree Program", studentData.program],
                            [
                                "Completed Credits",
                                `${studentData.completedCredits} / ${studentData.totalCredits}`,
                            ],
                            ["Department", studentData.department],
                            ["Current Semester", studentData.currentSemester],
                            ["Academic Advisor", studentData.advisor],
                        ].map(([label, value], idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between items-center py-1 ${
                                    idx < 6 ? "border-b border-gray-200" : ""
                                }`}
                            >
                                <span className="text-gray-600">{label}</span>
                                <span className="font-medium text-gray-900">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList className="bg-white shadow-sm border border-gray-300">
                    <TabsTrigger
                        value="personal"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Personal Information
                    </TabsTrigger>
                    <TabsTrigger
                        value="contact"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Contact Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="academic"
                        className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Academic Information
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                    <Card className="border border-gray-300 shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900 flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-600" />{" "}
                                Personal Information
                            </CardTitle>
                            <CardDescription>
                                Basic personal details and family information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-1">
                            {[
                                ["Full Name", studentData.fullName],
                                ["First Name", studentData.firstName],
                                ["Last Name", studentData.lastName],
                                ["Birth Date", studentData.birthDate],
                                ["Gender", studentData.gender],
                                ["Blood Group", studentData.bloodGroup],
                                ["Father's Name", studentData.fatherName],
                                ["Mother's Name", studentData.motherName],
                                ["Religion", studentData.religion],
                                ["Contact Number", studentData.contactNo],
                                ["Email", studentData.email],
                            ].map(([label, value], idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center py-1"
                                >
                                    <div className="w-1/3 text-sm font-medium text-gray-600">
                                        {label}
                                    </div>
                                    <div className="w-8 text-center text-gray-400">
                                        :
                                    </div>
                                    <div className="w-2/3 font-medium text-gray-900">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                    <Card className="border border-gray-300 shadow-sm">
                        <CardHeader className="border-b border-gray-200">
                            <CardTitle className="text-xl text-gray-900 flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-green-600" />{" "}
                                Contact Information
                            </CardTitle>
                            <CardDescription>
                                Communication details and address information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-1">
                            {[
                                ["Email Address", contactInfo.email],
                                ["Phone Number", contactInfo.phone],
                                [
                                    "Emergency Contact",
                                    `${contactInfo.emergencyContactName} (${contactInfo.emergencyContact})`,
                                ],
                                ["Address", contactInfo.address],
                            ].map(([label, value], idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start py-1"
                                >
                                    <div className="w-1/3 text-sm font-medium text-gray-600">
                                        {label}
                                    </div>
                                    <div className="w-8 text-center text-gray-400">
                                        :
                                    </div>
                                    <div className="w-2/3 text-base font-medium text-gray-900">
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border border-gray-300 shadow-sm">
                            <CardHeader className="border-b border-gray-200">
                                <CardTitle className="text-xl text-gray-900 flex items-center">
                                    <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />{" "}
                                    Academic Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Enrollment Date
                                    </label>
                                    <p className="text-base font-medium text-gray-900">
                                        {academicInfo.enrollmentDate}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Expected Graduation
                                    </label>
                                    <p className="text-base font-medium text-gray-900">
                                        {academicInfo.expectedGraduation}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Academic Advisor
                                    </label>
                                    <p className="text-base font-medium text-gray-900">
                                        {studentData.advisor}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {academicInfo.advisorEmail}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-300 shadow-sm">
                            <CardHeader className="border-b border-gray-200">
                                <CardTitle className="text-xl text-gray-900 flex items-center">
                                    <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />{" "}
                                    Recent Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-3">
                                {academicInfo.recentGrades.map(
                                    (semester, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 border border-gray-200"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {semester.semester}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {semester.courses} courses
                                                </p>
                                            </div>
                                            <Badge className="bg-blue-500 text-white">
                                                GPA: {semester.gpa}
                                            </Badge>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default StudentProfile;
