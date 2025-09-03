import { Card, CardContent, CardHeader, CardTitle } from "../Components/card";

import { Users, BookOpen, GraduationCap, Building } from "lucide-react";

export function AdminDashboard() {
    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome, Administrator! ⚡
                        </h1>
                        <p className="text-purple-100">
                            System overview and management dashboard
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">1,400+</div>
                        <div className="text-purple-100">Total Students</div>
                    </div>
                </div>
            </div>

            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total Students */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-100">
                            Total Students
                        </CardTitle>
                        <Users className="h-5 w-5 text-purple-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">1,400</div>
                        <p className="text-xs text-purple-100">
                            +5.2% from last semester
                        </p>
                    </CardContent>
                </Card>

                {/* Total Faculty */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-100">
                            Total Faculty
                        </CardTitle>
                        <GraduationCap className="h-5 w-5 text-indigo-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">78</div>
                        <p className="text-xs text-indigo-100">
                            +2.6% from last semester
                        </p>
                    </CardContent>
                </Card>

                {/* Active Courses */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-violet-100">
                            Active Courses
                        </CardTitle>
                        <BookOpen className="h-5 w-5 text-violet-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">140</div>
                        <p className="text-xs text-violet-100">
                            +8.1% from last semester
                        </p>
                    </CardContent>
                </Card>

                {/* Departments */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-pink-100">
                            Departments
                        </CardTitle>
                        <Building className="h-5 w-5 text-pink-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">4</div>
                        <p className="text-xs text-pink-100">
                            Active departments
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AdminDashboard;
