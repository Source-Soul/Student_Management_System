import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../../Components/ui/card"
import { Button } from "../../Components/ui/button"
import { Badge } from "../../Components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../Components/ui/select"
import {
  Calendar,
  Clock,
  Download,
  Filter,
  MapPin,
  Users,
  BookOpen
} from "lucide-react"

export function FacultySchedule() {
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [viewMode, setViewMode] = useState("week")

  // Mock schedule data
  const schedule = [
    {
      courseCode: "CSE301",
      courseName: "Data Structures and Algorithms",
      room: "Room 301",
      students: 45,
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      day: "Sunday",
      type: "lecture"
    },
    {
      courseCode: "CSE301",
      courseName: "Data Structures and Algorithms",
      room: "Lab 101",
      students: 45,
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      day: "Tuesday",
      type: "lab"
    },
    {
      courseCode: "CSE401",
      courseName: "Operating Systems",
      room: "Room 205",
      students: 38,
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      day: "Monday",
      type: "lecture"
    },
    {
      courseCode: "CSE401",
      courseName: "Operating Systems",
      room: "Lab 102",
      students: 38,
      startTime: "04:00 PM",
      endTime: "05:30 PM",
      day: "Wednesday",
      type: "lab"
    },
    {
      courseCode: "CSE250",
      courseName: "Database Management Systems",
      room: "Room 150",
      students: 42,
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      day: "Thursday",
      type: "lecture"
    },
    {
      courseCode: "CSE250",
      courseName: "Database Management Systems",
      room: "Lab 103",
      students: 42,
      startTime: "03:00 PM",
      endTime: "04:30 PM",
      day: "Sunday",
      type: "lab"
    }
  ]

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ]

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]

  const getClassesForTimeAndDay = (time, day) => {
    return schedule.filter(session => {
      if (selectedCourse !== "all" && session.courseCode !== selectedCourse) {
        return false
      }
      return session.day === day && session.startTime === time
    })
  }

  const getTypeColor = type => {
    switch (type) {
      case "lecture":
        return "bg-green-100 text-green-800 border-green-200"
      case "lab":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tutorial":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCurrentDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
    return days[new Date().getDay()]
  }

  const currentDay = getCurrentDay()

  const handleDownload = format => {
    console.log(`Downloading schedule as ${format.toUpperCase()}`)
    // Mock download functionality
  }

  const handlePrint = () => {
    window.print()
  }

  const uniqueCourses = [...new Set(schedule.map(s => s.courseCode))]

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-faculty rounded-xl flex items-center justify-center">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Class Schedule
                </h1>
                <p className="text-gray-600">
                  Manage your weekly teaching schedule
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload("pdf")}
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload("excel")}
              >
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">
                  Filters:
                </span>
              </div>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Week</SelectItem>
                  <SelectItem value="next">Next Week</SelectItem>
                  <SelectItem value="previous">Previous Week</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {uniqueCourses.map(course => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week View</SelectItem>
                  <SelectItem value="day">Day View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            Weekly Schedule - Spring 2025
          </CardTitle>
          <CardDescription>
            Sunday to Thursday, 8:00 AM - 6:00 PM
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* Mobile View */}
          <div className="block lg:hidden p-4 space-y-4">
            {weekDays.map(day => (
              <Card key={day} className="border border-gray-200 bg-gray-50">
                <CardHeader className="pb-2">
                  <CardTitle
                    className={`text-lg ${
                      currentDay === day ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {day}
                    {currentDay === day && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        Today
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {schedule
                    .filter(
                      session =>
                        session.day === day &&
                        (selectedCourse === "all" ||
                          session.courseCode === selectedCourse)
                    )
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((session, index) => (
                      <Card
                        key={index}
                        className={`bg-white border ${getTypeColor(
                          session.type
                        )}`}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-green-600">
                                {session.courseCode}
                              </span>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {session.startTime} - {session.endTime}
                              </div>
                            </div>
                            <p className="text-sm text-gray-900 font-medium">
                              {session.courseName}
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-3 w-3 mr-1" />
                                {session.room}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="h-3 w-3 mr-1" />
                                {session.students} students
                              </div>
                              <Badge
                                className={`text-xs ${getTypeColor(
                                  session.type
                                )}`}
                              >
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {schedule.filter(
                    session =>
                      session.day === day &&
                      (selectedCourse === "all" ||
                        session.courseCode === selectedCourse)
                  ).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No classes scheduled</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Grid View */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="min-w-[800px] bg-white">
              {/* Days Header Row */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-4 text-sm font-medium text-gray-600 border-r border-gray-200 bg-gray-50">
                  Time
                </div>
                {weekDays.map(day => (
                  <div
                    key={day}
                    className={`p-4 text-sm font-medium text-center border-r border-gray-200 last:border-r-0 bg-gray-50 ${
                      currentDay === day
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="font-medium">{day}</div>
                    {currentDay === day && (
                      <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                        Today
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Time Slots Grid */}
              {timeSlots.map(time => (
                <div
                  key={time}
                  className="grid grid-cols-6 border-b border-gray-200 min-h-[120px]"
                >
                  <div className="p-4 text-sm text-gray-600 border-r border-gray-200 flex items-center bg-gray-50 font-medium">
                    {time}
                  </div>
                  {weekDays.map(day => {
                    const classesInSlot = getClassesForTimeAndDay(time, day)
                    return (
                      <div
                        key={`${day}-${time}`}
                        className="border-r border-gray-200 last:border-r-0 p-2 bg-white"
                      >
                        {classesInSlot.length > 0 ? (
                          classesInSlot.map((session, sessionIndex) => (
                            <Card
                              key={sessionIndex}
                              className={`h-full ${getTypeColor(
                                session.type
                              )} border shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                            >
                              <CardContent className="p-3 h-full">
                                <div className="space-y-1">
                                  <div className="font-medium text-green-700 text-sm">
                                    {session.courseCode}
                                  </div>
                                  <div className="text-xs text-gray-700 font-medium leading-tight">
                                    {session.courseName}
                                  </div>
                                  <div className="space-y-1 mt-2">
                                    <div className="flex items-center text-xs text-gray-600">
                                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                      <span className="truncate">
                                        {session.room}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-600">
                                      <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                                      <span>{session.students}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-600">
                                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                      <span>{session.endTime}</span>
                                    </div>
                                  </div>
                                  <Badge
                                    className={`text-xs ${getTypeColor(
                                      session.type
                                    )} mt-1`}
                                  >
                                    {session.type}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="h-full bg-gray-50 rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Free</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {schedule.length}
            </div>
            <div className="text-sm text-gray-600">Total Classes/Week</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {schedule.reduce((sum, s) => sum + s.students, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {uniqueCourses.length}
            </div>
            <div className="text-sm text-gray-600">Courses Teaching</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {schedule.filter(s => s.type === "lab").length}
            </div>
            <div className="text-sm text-gray-600">Lab Sessions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
