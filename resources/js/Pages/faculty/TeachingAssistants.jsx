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
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar"
import { Checkbox } from "../../Components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../Components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../Components/ui/table"
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  UserPlus,
  Settings,
  BookOpen,
  UserCheck,
  Clock,
  FileText
} from "lucide-react"
import { toast } from "sonner"

export function TeachingAssistants() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTA, setEditingTA] = useState(null)

  // Mock courses
  const courses = [
    { code: "CSE301", name: "Data Structures and Algorithms" },
    { code: "CSE401", name: "Operating Systems" },
    { code: "CSE250", name: "Database Management Systems" }
  ]

  // Mock TAs data
  const [teachingAssistants, setTeachingAssistants] = useState([
    {
      id: "1",
      name: "Ali Rahman",
      email: "ali.rahman@student.edu",
      phone: "+880-1234-567890",
      studentId: "20190001",
      semester: "7th Semester",
      department: "Computer Science and Engineering",
      courses: ["CSE301", "CSE401"],
      permissions: {
        takeAttendance: true,
        manageGrading: true,
        uploadMaterials: false,
        communicateStudents: true
      },
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Ahmed",
      email: "sarah.ahmed@student.edu",
      phone: "+880-1234-567891",
      studentId: "20190002",
      semester: "7th Semester",
      department: "Computer Science and Engineering",
      courses: ["CSE250"],
      permissions: {
        takeAttendance: true,
        manageGrading: false,
        uploadMaterials: true,
        communicateStudents: true
      },
      status: "active"
    },
    {
      id: "3",
      name: "Hassan Khan",
      email: "hassan.khan@student.edu",
      phone: "+880-1234-567892",
      studentId: "20190003",
      semester: "6th Semester",
      department: "Computer Science and Engineering",
      courses: ["CSE301"],
      permissions: {
        takeAttendance: false,
        manageGrading: false,
        uploadMaterials: true,
        communicateStudents: false
      },
      status: "pending"
    }
  ])

  const [newTA, setNewTA] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    semester: "",
    department: "Computer Science and Engineering",
    courses: [],
    permissions: {
      takeAttendance: false,
      manageGrading: false,
      uploadMaterials: false,
      communicateStudents: false
    },
    status: "pending"
  })

  const filteredTAs = teachingAssistants.filter(ta => {
    const matchesSearch =
      ta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ta.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ta.studentId.includes(searchTerm)

    const matchesCourse =
      selectedCourse === "all" || ta.courses.includes(selectedCourse)

    return matchesSearch && matchesCourse
  })

  const handleAddTA = () => {
    if (!newTA.name || !newTA.email || !newTA.studentId) {
      toast.error("Please fill in all required fields")
      return
    }

    const taToAdd = {
      id: Date.now().toString(),
      name: newTA.name,
      email: newTA.email,
      phone: newTA.phone || "",
      studentId: newTA.studentId,
      semester: newTA.semester || "",
      department: newTA.department,
      courses: newTA.courses || [],
      permissions: newTA.permissions,
      status: "pending"
    }

    setTeachingAssistants(prev => [...prev, taToAdd])
    setNewTA({
      name: "",
      email: "",
      phone: "",
      studentId: "",
      semester: "",
      department: "Computer Science and Engineering",
      courses: [],
      permissions: {
        takeAttendance: false,
        manageGrading: false,
        uploadMaterials: false,
        communicateStudents: false
      },
      status: "pending"
    })
    setIsAddDialogOpen(false)
    toast.success("Teaching Assistant added successfully!")
  }

  const handleUpdatePermissions = (taId, permissions) => {
    setTeachingAssistants(prev =>
      prev.map(ta => (ta.id === taId ? { ...ta, permissions } : ta))
    )
    toast.success("Permissions updated successfully!")
  }

  const handleStatusChange = (taId, status) => {
    setTeachingAssistants(prev =>
      prev.map(ta => (ta.id === taId ? { ...ta, status } : ta))
    )
    toast.success(`TA status updated to ${status}`)
  }

  const handleDeleteTA = taId => {
    setTeachingAssistants(prev => prev.filter(ta => ta.id !== taId))
    toast.success("Teaching Assistant removed successfully!")
  }

  const getStatusBadge = status => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getPermissionIcon = permission => {
    switch (permission) {
      case "takeAttendance":
        return UserCheck
      case "manageGrading":
        return FileText
      case "uploadMaterials":
        return BookOpen
      case "communicateStudents":
        return Mail
      default:
        return Settings
    }
  }

  const getPermissionLabel = permission => {
    switch (permission) {
      case "takeAttendance":
        return "Take Attendance"
      case "manageGrading":
        return "Manage Grading"
      case "uploadMaterials":
        return "Upload Materials"
      case "communicateStudents":
        return "Communicate with Students"
      default:
        return permission
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen faculty-theme">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-faculty rounded-xl flex items-center justify-center">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Teaching Assistants
                </h1>
                <p className="text-gray-600">
                  Manage TAs and their permissions
                </p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add TA
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle>Add Teaching Assistant</DialogTitle>
                  <DialogDescription>
                    Add a new teaching assistant and configure their permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        value={newTA.name || ""}
                        onChange={e =>
                          setNewTA(prev => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Student ID *
                      </label>
                      <Input
                        value={newTA.studentId || ""}
                        onChange={e =>
                          setNewTA(prev => ({
                            ...prev,
                            studentId: e.target.value
                          }))
                        }
                        placeholder="Student ID"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        value={newTA.email || ""}
                        onChange={e =>
                          setNewTA(prev => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="email@student.edu"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={newTA.phone || ""}
                        onChange={e =>
                          setNewTA(prev => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Assign Courses
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {courses.map(course => (
                        <div
                          key={course.code}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={course.code}
                            checked={newTA.courses?.includes(course.code)}
                            onCheckedChange={checked => {
                              if (checked) {
                                setNewTA(prev => ({
                                  ...prev,
                                  courses: [
                                    ...(prev.courses || []),
                                    course.code
                                  ]
                                }))
                              } else {
                                setNewTA(prev => ({
                                  ...prev,
                                  courses:
                                    prev.courses?.filter(
                                      c => c !== course.code
                                    ) || []
                                }))
                              }
                            }}
                          />
                          <label htmlFor={course.code} className="text-sm">
                            {course.code} - {course.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Permissions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(newTA.permissions || {}).map(permission => {
                        const Icon = getPermissionIcon(permission)
                        return (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission}
                              checked={newTA.permissions?.[permission]}
                              onCheckedChange={checked => {
                                setNewTA(prev => ({
                                  ...prev,
                                  permissions: {
                                    ...prev.permissions,
                                    [permission]: checked
                                  }
                                }))
                              }}
                            />
                            <Icon className="h-4 w-4 text-gray-600" />
                            <label htmlFor={permission} className="text-sm">
                              {getPermissionLabel(permission)}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddTA}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add TA
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-64">
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
            </div>

            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search TAs..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {teachingAssistants.length}
            </div>
            <div className="text-sm text-gray-600">Total TAs</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {teachingAssistants.filter(ta => ta.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active TAs</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {teachingAssistants.filter(ta => ta.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {courses.length}
            </div>
            <div className="text-sm text-gray-600">Assigned Courses</div>
          </CardContent>
        </Card>
      </div>

      {/* TAs Table */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-green-600" />
            Teaching Assistants
          </CardTitle>
          <CardDescription>
            Manage teaching assistants and their course assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">TA Details</TableHead>
                  <TableHead className="font-medium">Student Info</TableHead>
                  <TableHead className="font-medium">
                    Assigned Courses
                  </TableHead>
                  <TableHead className="font-medium">Permissions</TableHead>
                  <TableHead className="font-medium text-center">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTAs.map(ta => (
                  <TableRow key={ta.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={ta.photo} alt={ta.name} />
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {ta.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">
                            {ta.name}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <span>{ta.email}</span>
                          </div>
                          {ta.phone && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              <span>{ta.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-green-600">
                          {ta.studentId}
                        </div>
                        <div className="text-sm text-gray-600">
                          {ta.semester}
                        </div>
                        <div className="text-xs text-gray-500">
                          {ta.department}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ta.courses.map(courseCode => (
                          <Badge
                            key={courseCode}
                            variant="outline"
                            className="text-xs"
                          >
                            {courseCode}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {Object.entries(ta.permissions).map(
                          ([permission, hasPermission]) => {
                            const Icon = getPermissionIcon(permission)
                            return (
                              <div
                                key={permission}
                                className={`flex items-center space-x-2 text-xs ${
                                  hasPermission
                                    ? "text-green-600"
                                    : "text-gray-400"
                                }`}
                              >
                                <Icon className="h-3 w-3" />
                                <span>{getPermissionLabel(permission)}</span>
                              </div>
                            )
                          }
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(ta.status)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {ta.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(ta.id, "active")}
                            className="hover:bg-green-50 hover:border-green-200"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        {ta.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleStatusChange(ta.id, "inactive")
                            }
                            className="hover:bg-yellow-50 hover:border-yellow-200"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTA(ta)}
                          className="hover:bg-blue-50 hover:border-blue-200"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTA(ta.id)}
                          className="hover:bg-red-50 hover:border-red-200"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTAs.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Teaching Assistants Found
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCourse !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding your first teaching assistant"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
