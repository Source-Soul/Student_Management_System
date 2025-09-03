import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

// Sample data for grade approvals
const gradeApprovalsData = [
    {
        id: "GRD001",
        studentName: "Alice Johnson",
        course: "CS401",
        grade: "A",
        status: "Pending",
        faculty: "Dr. Sarah Wilson",
    },
    {
        id: "GRD002",
        studentName: "Bob Smith",
        course: "MATH402",
        grade: "B+",
        status: "Pending",
        faculty: "Prof. Michael Johnson",
    },
];

export default function ApprovalsManagement() {
    const [gradeApprovals, setGradeApprovals] = useState(gradeApprovalsData);

    const handleApprove = (id) => {
        setGradeApprovals(
            gradeApprovals.map((item) =>
                item.id === id ? { ...item, status: "Approved" } : item
            )
        );
        toast.success("Grade approval completed successfully");
    };

    const handleReject = (id) => {
        setGradeApprovals(
            gradeApprovals.map((item) =>
                item.id === id ? { ...item, status: "Rejected" } : item
            )
        );
        toast.success("Grade approval rejected");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center">
                            <CheckCircle className="h-8 w-8 mr-3" />
                            Approvals & Validations
                        </h1>
                        <p className="text-purple-100">
                            Review and approve pending grade requests
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">
                            {
                                gradeApprovals.filter(
                                    (a) => a.status === "Pending"
                                ).length
                            }
                        </div>
                        <div className="text-purple-100">Pending Approvals</div>
                    </div>
                </div>
            </div>

            {/* Grade Approvals Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg">
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-purple-600" />
                        Grade Approvals Dashboard
                    </CardTitle>
                    <CardDescription>
                        Review and approve grade submissions from faculty
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-purple-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Student Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Course
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Grade
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Faculty
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {gradeApprovals.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-purple-50"
                                    >
                                        <td className="px-4 py-2">
                                            {item.studentName}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.course}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.grade}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.faculty}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                className="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                                                onClick={() =>
                                                    handleApprove(item.id)
                                                }
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                                                onClick={() =>
                                                    handleReject(item.id)
                                                }
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {gradeApprovals.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p>No grade approvals found</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
