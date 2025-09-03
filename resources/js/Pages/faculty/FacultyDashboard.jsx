import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import { Badge } from "../../Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  Users,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  User,
  MapPin
} from "lucide-react"

export function FacultyDashboard() {
  // Mock faculty data
  const facultyInfo = {
    name: "Dr. Sarah Wilson",
    id: "FAC001",
    department: "Computer Science and Engineering",
    designation: "Associate Professor",
    email: "sarah.wilson@university.edu",
    photo: "", // Would be actual photo URL
    officeRoom: "Room 205, Academic Building"
  }

  // Mock today's classes
  const todaysClasses = [
    {
      courseCode: "CSE301",
      courseName: "Data Structures and Algorithms",
      time: "09:00 AM - 10:30 AM",
      room: "Room 301",
      students: 45,
      isNext: true
    },
    {
      courseCode: "CSE401",
      courseName: "Operating Systems",
      time: "02:00 PM - 03:30 PM",
      room: "Lab 102",
      students: 38,
      isNext: false
    },
    {
      courseCode: "CSE250",
      courseName: "Database Management",
      time: "04:00 PM - 05:30 PM",
      room: "Room 205",
      students: 42,
      isNext: false
    }
  ]

  // Mock pending items
  const pendingItems = {
    feedbacks: 12,
    gradeSubmissions: 3,
    attendanceReports: 2,
    taRequests: 1
  }


  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Welcome Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-green-200">
                <AvatarImage src={facultyInfo.photo} alt={facultyInfo.name} />
                <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                  {facultyInfo.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {facultyInfo.name}
                  </h1>
                  <Badge className="bg-green-100 text-green-800">
                    {facultyInfo.designation}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {facultyInfo.id}
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {facultyInfo.department}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {facultyInfo.officeRoom}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {getCurrentTime()}
              </div>
              <div className="text-sm text-gray-600">{getCurrentDate()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today's Classes</p>
                <p className="text-2xl font-bold text-green-600">
                  {todaysClasses.length}
                </p>
                <p className="text-xs text-gray-500">
                  {todaysClasses.reduce((sum, cls) => sum + cls.students, 0)}{" "}
                  total students
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Feedbacks</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pendingItems.feedbacks}
                </p>
                <p className="text-xs text-gray-500">Student responses</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Grade Submissions</p>
                <p className="text-2xl font-bold text-purple-600">
                  {pendingItems.gradeSubmissions}
                </p>
                <p className="text-xs text-gray-500">Courses pending</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">TA Requests</p>
                <p className="text-2xl font-bold text-orange-600">
                  {pendingItems.taRequests}
                </p>
                <p className="text-xs text-gray-500">Awaiting approval</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
