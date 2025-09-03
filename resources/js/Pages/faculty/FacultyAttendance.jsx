import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../Components/ui/select"
import { Input } from "../../Components/ui/input"
import {
  UserCheck,
  Calendar,
  Search,
  Users,
  CheckCircle,
  XCircle,
  Save,
  Download,
  AlertCircle,
  User
} from "lucide-react"
import { toast } from "sonner"

export function FacultyAttendance() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  )
  const [selectedSession, setSelectedSession] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock courses
  const courses = [
    { code: "CSE301", name: "Data Structures and Algorithms" },
    { code: "CSE401", name: "Operating Systems" },
    { code: "CSE250", name: "Database Management Systems" }
  ]

  // Mock sessions based on selected course and date
  const getSessions = (courseCode, date) => {
    if (!courseCode) return []

    return [
      {
        courseCode,
        courseName: courses.find(c => c.code === courseCode)?.name || "",
        date,
        time: "09:00 AM - 10:30 AM",
        room: "Room 301",
        sessionType: "lecture"
      },
      {
        courseCode,
        courseName: courses.find(c => c.code === courseCode)?.name || "",
        date,
        time: "02:00 PM - 03:30 PM",
        room: "Lab 101",
        sessionType: "lab"
      }
    ]
  }

  // Mock student data
  const mockStudents = [
    {
      id: "1",
      name: "Ahmed Hassan",
      rollNo: "20210001",
      email: "ahmed.hassan@student.edu",
      status: null
    },
    {
      id: "2",
      name: "Fatima Rahman",
      rollNo: "20210002",
      email: "fatima.rahman@student.edu",
      status: null
    },
    {
      id: "3",
      name: "Omar Ali",
      rollNo: "20210003",
      email: "omar.ali@student.edu",
      status: null
    },
    {
      id: "4",
      name: "Zahra Khan",
      rollNo: "20210004",
      email: "zahra.khan@student.edu",
      status: null
    },
    {
      id: "5",
      name: "Hassan Ahmed",
      rollNo: "20210005",
      email: "hassan.ahmed@student.edu",
      status: null
    },
    {
      id: "6",
      name: "Lubna Rahman",
      rollNo: "20210006",
      email: "lubna.rahman@student.edu",
      status: null
    },
    {
      id: "7",
      name: "Karim Mahmood",
      rollNo: "20210007",
      email: "karim.mahmood@student.edu",
      status: null
    },
    {
      id: "8",
      name: "Amira Hassan",
      rollNo: "20210008",
      email: "amira.hassan@student.edu",
      status: null
    },
    {
      id: "9",
      name: "Yusuf Ali",
      rollNo: "20210009",
      email: "yusuf.ali@student.edu",
      status: null
    },
    {
      id: "10",
      name: "Nour Khan",
      rollNo: "20210010",
      email: "nour.khan@student.edu",
      status: null
    },
    {
      id: "11",
      name: "Saad Rahman",
      rollNo: "20210011",
      email: "saad.rahman@student.edu",
      status: null
    },
    {
      id: "12",
      name: "Maryam Ahmed",
      rollNo: "20210012",
      email: "maryam.ahmed@student.edu",
      status: null
    }
  ]

  const handleCourseChange = courseCode => {
    setSelectedCourse(courseCode)
    setSelectedSession("")
    setStudents([])
  }

  const handleSessionChange = sessionTime => {
    setSelectedSession(sessionTime)
    // Load students for this session
    setIsLoading(true)
    setTimeout(() => {
      setStudents(mockStudents.map(student => ({ ...student, status: null })))
      setIsLoading(false)
    }, 1000)
  }

  const handleStudentStatusChange = (studentId, status) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    )
  }

  const handleBulkAction = action => {
    setStudents(prev => prev.map(student => ({ ...student, status: action })))
  }

  const handleSubmitAttendance = () => {
    const totalStudents = students.length
    const presentCount = students.filter(s => s.status === "present").length
    const absentCount = students.filter(s => s.status === "absent").length
    const excusedCount = students.filter(s => s.status === "excused").length
    const notMarked = totalStudents - presentCount - absentCount - excusedCount

    if (notMarked > 0) {
      toast.error(
        `Please mark attendance for all ${totalStudents} students. ${notMarked} students not marked.`
      )
      return
    }

    // Mock submission
    toast.success(
      `Attendance submitted successfully! ${presentCount} present, ${absentCount} absent, ${excusedCount} excused.`
    )
  }

  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm)
  )

  const presentCount = students.filter(s => s.status === "present").length
  const absentCount = students.filter(s => s.status === "absent").length
  const excusedCount = students.filter(s => s.status === "excused").length
  const totalCount = students.length

  const sessions = selectedCourse
    ? getSessions(selectedCourse, selectedDate)
    : []

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 gradient-faculty rounded-xl flex items-center justify-center">
              <UserCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Attendance Management
              </h1>
              <p className="text-gray-600">
                Record student attendance for your classes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course and Session Selection */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Select Class Session
          </CardTitle>
          <CardDescription>
            Choose course, date, and session to take attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course
              </label>
              <Select value={selectedCourse} onValueChange={handleCourseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Session
              </label>
              <Select
                value={selectedSession}
                onValueChange={handleSessionChange}
                disabled={!selectedCourse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session..." />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session, index) => (
                    <SelectItem key={index} value={session.time}>
                      {session.time} - {session.room} ({session.sessionType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Interface */}
      {students.length > 0 && (
        <>
          {/* Statistics and Controls */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Total: {totalCount}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-600">
                      Present: {presentCount}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="text-sm text-red-600">
                      Absent: {absentCount}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm text-yellow-600">
                      Excused: {excusedCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("present")}
                    className="hover:bg-green-50 hover:border-green-200"
                  >
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction("absent")}
                    className="hover:bg-red-50 hover:border-red-200"
                  >
                    Mark All Absent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student List */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Student Attendance
                </CardTitle>
                <div className="relative w-64">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <CardDescription>
                Mark attendance for {selectedCourse} - {selectedSession}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg animate-pulse"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="w-32 h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredStudents.map(student => (
                    <Card
                      key={student.id}
                      className="border border-gray-200 hover:border-green-200 transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {student.name}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Roll: {student.rollNo}</span>
                                <span>{student.email}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant={
                                student.status === "present"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleStudentStatusChange(student.id, "present")
                              }
                              className={
                                student.status === "present"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "hover:bg-green-50 hover:border-green-200"
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Present
                            </Button>
                            <Button
                              variant={
                                student.status === "absent"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleStudentStatusChange(student.id, "absent")
                              }
                              className={
                                student.status === "absent"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "hover:bg-red-50 hover:border-red-200"
                              }
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Absent
                            </Button>
                            <Button
                              variant={
                                student.status === "excused"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleStudentStatusChange(student.id, "excused")
                              }
                              className={
                                student.status === "excused"
                                  ? "bg-yellow-600 hover:bg-yellow-700"
                                  : "hover:bg-yellow-50 hover:border-yellow-200"
                              }
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Excused
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Attendance for {selectedCourse} -{" "}
                  {new Date(selectedDate).toLocaleDateString()} -{" "}
                  {selectedSession}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button
                    onClick={handleSubmitAttendance}
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Submit Attendance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!selectedCourse && (
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <UserCheck className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a Class Session
            </h3>
            <p className="text-gray-600">
              Choose a course, date, and session to begin taking attendance
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
