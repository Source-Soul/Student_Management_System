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
import { Progress } from "../../Components/ui/progress"
import {
  MessageSquare,
  Users,
  Star,
  Filter,
  Download,
  BarChart3,
  Eye,
  Award
} from "lucide-react"

export function FacultyFeedback() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("current")
  const [viewMode, setViewMode] = useState("overview")

  // Mock courses
  const courses = [
    { code: "CSE301", name: "Data Structures and Algorithms" },
    { code: "CSE401", name: "Operating Systems" },
    { code: "CSE250", name: "Database Management Systems" }
  ]

  // Mock feedback data
  const feedbackData = [
    {
      courseCode: "CSE301",
      courseName: "Data Structures and Algorithms",
      semester: "Fall 2024",
      totalResponses: 38,
      averageRating: 4.5,
      categories: {
        teaching: 4.6,
        content: 4.4,
        assignments: 4.3,
        communication: 4.7,
        support: 4.5
      },
      comments: [
        {
          id: "1",
          rating: 5,
          comment:
            "Excellent explanation of complex algorithms. The visual demonstrations really helped.",
          category: "teaching",
          date: "2024-12-15",
          anonymous: true
        },
        {
          id: "2",
          rating: 4,
          comment:
            "Good course content but assignments could be more challenging.",
          category: "assignments",
          date: "2024-12-14",
          anonymous: false
        },
        {
          id: "3",
          rating: 5,
          comment:
            "Professor is very responsive to questions and provides great support.",
          category: "support",
          date: "2024-12-13",
          anonymous: true
        }
      ]
    },
    {
      courseCode: "CSE401",
      courseName: "Operating Systems",
      semester: "Fall 2024",
      totalResponses: 32,
      averageRating: 4.2,
      categories: {
        teaching: 4.3,
        content: 4.1,
        assignments: 4.0,
        communication: 4.4,
        support: 4.2
      },
      comments: [
        {
          id: "4",
          rating: 4,
          comment: "Practical examples make OS concepts easier to understand.",
          category: "teaching",
          date: "2024-12-12",
          anonymous: true
        },
        {
          id: "5",
          rating: 3,
          comment: "Course is good but could use more hands-on labs.",
          category: "content",
          date: "2024-12-11",
          anonymous: false
        }
      ]
    }
  ]

  const filteredData =
    selectedCourse === "all"
      ? feedbackData
      : feedbackData.filter(data => data.courseCode === selectedCourse)

  const overallStats = {
    totalResponses: feedbackData.reduce(
      (sum, data) => sum + data.totalResponses,
      0
    ),
    averageRating:
      feedbackData.reduce((sum, data) => sum + data.averageRating, 0) /
      feedbackData.length,
    totalCourses: feedbackData.length
  }

  const getRatingColor = rating => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBg = rating => {
    if (rating >= 4.5) return "bg-green-100"
    if (rating >= 4.0) return "bg-blue-100"
    if (rating >= 3.5) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-faculty rounded-xl flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Student Feedback Analytics
                </h1>
                <p className="text-gray-600">
                  View and analyze student feedback for your courses
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
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
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map(course => (
                    <SelectItem key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Fall 2024</SelectItem>
                  <SelectItem value="spring2024">Spring 2024</SelectItem>
                  <SelectItem value="fall2023">Fall 2023</SelectItem>
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
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {overallStats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Overall Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(overallStats.averageRating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {overallStats.totalResponses}
            </div>
            <div className="text-sm text-gray-600">Total Responses</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {overallStats.totalCourses}
            </div>
            <div className="text-sm text-gray-600">Courses Evaluated</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Feedback Cards */}
      <div className="space-y-6">
        {filteredData.map(data => (
          <Card key={data.courseCode} className="border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    {data.courseCode} - {data.courseName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span>{data.semester}</span>
                    <span>•</span>
                    <span>{data.totalResponses} responses</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span
                        className={`font-medium ${getRatingColor(
                          data.averageRating
                        )}`}
                      >
                        {data.averageRating.toFixed(1)}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${getRatingBg(
                    data.averageRating
                  )}`}
                >
                  <div
                    className={`text-2xl font-bold ${getRatingColor(
                      data.averageRating
                    )}`}
                  >
                    {data.averageRating.toFixed(1)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Ratings */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">
                  Rating Breakdown
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(data.categories).map(([category, rating]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {category}
                        </span>
                        <span
                          className={`text-sm font-semibold ${getRatingColor(
                            rating
                          )}`}
                        >
                          {rating.toFixed(1)}
                        </span>
                      </div>
                      <Progress value={(rating / 5) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Comments */}
              {data.comments.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Recent Comments
                  </h4>
                  <div className="space-y-3">
                    {data.comments.slice(0, 3).map(comment => (
                      <Card
                        key={comment.id}
                        className="border border-gray-200 bg-gray-50"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < comment.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Badge
                                variant="outline"
                                className="text-xs border-green-200 text-green-700"
                              >
                                {comment.category}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(comment.date).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {comment.comment}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Eye className="h-3 w-3 mr-1" />
                            {comment.anonymous ? "Anonymous" : "Named"} feedback
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {data.comments.length > 3 && (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      View All Comments ({data.comments.length})
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Feedback Available
            </h3>
            <p className="text-gray-600">
              No student feedback found for the selected filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
