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
import { Input } from "../../Components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../Components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../Components/ui/table"
import {
  GraduationCap,
  Save,
  Search,
  Calculator,
  FileText,
  Users,
  AlertCircle,
  CheckCircle,
  Edit3
} from "lucide-react"
import { toast } from "sonner"

export function FacultyGrades() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("Spring 2025")
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([])
  const [gradeDistribution] = useState({
    assignment: 30,
    midterm: 30,
    final: 40
  })

  // Mock courses
  const courses = [
    { code: "CSE301", name: "Data Structures and Algorithms" },
    { code: "CSE401", name: "Operating Systems" },
    { code: "CSE250", name: "Database Management Systems" }
  ]

  // Mock student data
  const mockStudents = [
    {
      id: "1",
      name: "Ahmed Hassan",
      rollNo: "20210001",
      assignments: 85,
      midterm: 78,
      final: 82,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    },
    {
      id: "2",
      name: "Fatima Rahman",
      rollNo: "20210002",
      assignments: 92,
      midterm: 88,
      final: 90,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    },
    {
      id: "3",
      name: "Omar Ali",
      rollNo: "20210003",
      assignments: 76,
      midterm: 72,
      final: 75,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    },
    {
      id: "4",
      name: "Zahra Khan",
      rollNo: "20210004",
      assignments: 88,
      midterm: 85,
      final: 87,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    },
    {
      id: "5",
      name: "Hassan Ahmed",
      rollNo: "20210005",
      assignments: 70,
      midterm: 68,
      final: 72,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    },
    {
      id: "6",
      name: "Lubna Rahman",
      rollNo: "20210006",
      assignments: 95,
      midterm: 92,
      final: 94,
      total: 0,
      letterGrade: "",
      gpa: 0,
      status: "draft"
    }
  ]

  const calculateGrade = (assignments, midterm, final) => {
    if (assignments === null || midterm === null || final === null) {
      return { total: 0, letterGrade: "I", gpa: 0 } // Incomplete
    }

    const total = Math.round(
      (assignments * gradeDistribution.assignment) / 100 +
        (midterm * gradeDistribution.midterm) / 100 +
        (final * gradeDistribution.final) / 100
    )

    let letterGrade = ""
    let gpa = 0

    if (total >= 90) {
      letterGrade = "A"
      gpa = 4.0
    } else if (total >= 85) {
      letterGrade = "A-"
      gpa = 3.7
    } else if (total >= 80) {
      letterGrade = "B+"
      gpa = 3.5
    } else if (total >= 75) {
      letterGrade = "B"
      gpa = 3.0
    } else if (total >= 70) {
      letterGrade = "B-"
      gpa = 2.7
    } else if (total >= 65) {
      letterGrade = "C+"
      gpa = 2.5
    } else if (total >= 60) {
      letterGrade = "C"
      gpa = 2.0
    } else if (total >= 50) {
      letterGrade = "D"
      gpa = 1.0
    } else {
      letterGrade = "F"
      gpa = 0.0
    }

    return { total, letterGrade, gpa }
  }

  const handleCourseChange = courseCode => {
    setSelectedCourse(courseCode)
    // Load students with calculated grades
    const studentsWithGrades = mockStudents.map(student => {
      const gradeInfo = calculateGrade(
        student.assignments,
        student.midterm,
        student.final
      )
      return {
        ...student,
        ...gradeInfo
      }
    })
    setStudents(studentsWithGrades)
  }

  const handleGradeChange = (studentId, field, value) => {
    const numValue =
      value === "" ? null : Math.max(0, Math.min(100, parseInt(value) || 0))

    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          const updatedStudent = { ...student, [field]: numValue }
          const gradeInfo = calculateGrade(
            updatedStudent.assignments,
            updatedStudent.midterm,
            updatedStudent.final
          )
          return {
            ...updatedStudent,
            ...gradeInfo,
            status: "draft"
          }
        }
        return student
      })
    )
  }

  const handleSubmitGrades = () => {
    const incompleteStudents = students.filter(
      s => s.assignments === null || s.midterm === null || s.final === null
    )

    if (incompleteStudents.length > 0) {
      toast.error(
        `Please complete grades for all students. ${incompleteStudents.length} students have incomplete grades.`
      )
      return
    }

    setStudents(prev =>
      prev.map(student => ({ ...student, status: "submitted" }))
    )
    toast.success(
      `Grades submitted successfully for ${students.length} students!`
    )
  }

  const handleExport = format => {
    console.log(`Exporting grades as ${format.toUpperCase()}`)
    toast.success(`Grades exported as ${format.toUpperCase()}`)
  }

  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm)
  )

  const getGradeColor = grade => {
    switch (grade) {
      case "A":
      case "A-":
        return "text-green-600 bg-green-50"
      case "B+":
      case "B":
        return "text-blue-600 bg-blue-50"
      case "B-":
      case "C+":
        return "text-yellow-600 bg-yellow-50"
      case "C":
      case "D":
        return "text-orange-600 bg-orange-50"
      case "F":
        return "text-red-600 bg-red-50"
      case "I":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getClassAverage = () => {
    if (students.length === 0) return 0
    const validStudents = students.filter(s => s.letterGrade !== "I")
    if (validStudents.length === 0) return 0
    return Math.round(
      validStudents.reduce((sum, s) => sum + s.total, 0) / validStudents.length
    )
  }

  const getGradeDistributionStats = () => {
    const distribution = { A: 0, B: 0, C: 0, D: 0, F: 0, I: 0 }
    students.forEach(student => {
      const firstLetter = student.letterGrade.charAt(0)
      if (firstLetter in distribution) {
        distribution[firstLetter]++
      }
    })
    return distribution
  }

  const gradeStats = getGradeDistributionStats()

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-faculty rounded-xl flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Grades Management
                </h1>
                <p className="text-gray-600">Enter and manage student grades</p>
              </div>
            </div>

            {students.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleSubmitGrades}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Submit Grades
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Selection */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-green-600" />
            Select Course
          </CardTitle>
          <CardDescription>
            Choose course and semester to manage grades
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="text-sm font-medium text-gray-700">
                Semester
              </label>
              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCourse && (
            <Card className="border border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      Grade Distribution
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-green-700">
                    <span>Assignments: {gradeDistribution.assignment}%</span>
                    <span>Midterm: {gradeDistribution.midterm}%</span>
                    <span>Final: {gradeDistribution.final}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Grade Statistics */}
      {students.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {getClassAverage()}
              </div>
              <div className="text-xs text-gray-600">Class Average</div>
            </CardContent>
          </Card>
          {Object.entries(gradeStats).map(([grade, count]) => (
            <Card key={grade} className="border-0 shadow-sm bg-white">
              <CardContent className="p-3 text-center">
                <div className="text-xl font-bold text-gray-700">{count}</div>
                <div className="text-xs text-gray-600">Grade {grade}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grades Table */}
      {students.length > 0 && (
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Student Grades - {selectedCourse}
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
              Enter grades for assignments, midterm, and final exam
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Roll No</TableHead>
                    <TableHead className="font-medium">Student Name</TableHead>
                    <TableHead className="font-medium text-center">
                      Assignments ({gradeDistribution.assignment}%)
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      Midterm ({gradeDistribution.midterm}%)
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      Final ({gradeDistribution.final}%)
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      Total
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      Grade
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      GPA
                    </TableHead>
                    <TableHead className="font-medium text-center">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map(student => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-green-600">
                        {student.rollNo}
                      </TableCell>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.assignments ?? ""}
                          onChange={e =>
                            handleGradeChange(
                              student.id,
                              "assignments",
                              e.target.value
                            )
                          }
                          className="w-20 text-center"
                          placeholder="0-100"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.midterm ?? ""}
                          onChange={e =>
                            handleGradeChange(
                              student.id,
                              "midterm",
                              e.target.value
                            )
                          }
                          className="w-20 text-center"
                          placeholder="0-100"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.final ?? ""}
                          onChange={e =>
                            handleGradeChange(
                              student.id,
                              "final",
                              e.target.value
                            )
                          }
                          className="w-20 text-center"
                          placeholder="0-100"
                        />
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {student.letterGrade === "I" ? "-" : student.total}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`${getGradeColor(
                            student.letterGrade
                          )} border-0`}
                        >
                          {student.letterGrade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {student.gpa.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.status === "submitted" ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Submitted
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {students.some(
              s =>
                s.assignments === null || s.midterm === null || s.final === null
            ) && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Some students have incomplete grades. Please enter all
                    required grades before submitting.
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!selectedCourse && (
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a Course
            </h3>
            <p className="text-gray-600">
              Choose a course to start entering and managing student grades
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
