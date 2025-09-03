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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../Components/ui/table"
import { Input } from "../../Components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../Components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../Components/ui/dialog"
import { Label } from "../../Components/ui/label"
import { Textarea } from "../../Components/ui/textarea"
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone
} from "lucide-react"
import { toast } from "sonner"

export function FacultyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [viewingFaculty, setViewingFaculty] = useState(null)

  const departments = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History"
  ]

  const facultyData = [
    {
      id: "FAC001",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      department: "Computer Science",
      designation: "Associate Professor",
      contactNo: "+1-555-0123",
      office: "Tech-301",
      gender: "Female",
      status: "Active",
      joiningDate: "2020-08-15",
      courses: ["CS101", "CS301"],
      students: 75,
      biography:
        "Dr. Wilson specializes in artificial intelligence and machine learning.",
      educationalBackground: [
        "PhD Computer Science, MIT",
        "MS Computer Science, Stanford"
      ]
    },
    {
      id: "FAC002",
      name: "Prof. Michael Johnson",
      email: "michael.johnson@university.edu",
      department: "Mathematics",
      designation: "Professor",
      contactNo: "+1-555-0124",
      office: "Math-205",
      gender: "Male",
      status: "Active",
      joiningDate: "2018-09-01",
      courses: ["MATH201", "MATH301", "MATH401"],
      students: 120,
      biography:
        "Prof. Johnson is an expert in algebraic topology and differential geometry.",
      educationalBackground: [
        "PhD Mathematics, Harvard",
        "MS Mathematics, Princeton"
      ]
    },
    {
      id: "FAC003",
      name: "Dr. Emily Brown",
      email: "emily.brown@university.edu",
      department: "Physics",
      designation: "Assistant Professor",
      contactNo: "+1-555-0125",
      office: "Physics-102",
      gender: "Female",
      status: "On Leave",
      joiningDate: "2019-01-10",
      courses: ["PHYS101", "PHYS201"],
      students: 65,
      biography:
        "Dr. Brown conducts research in quantum mechanics and particle physics.",
      educationalBackground: ["PhD Physics, Caltech", "BS Physics, Berkeley"]
    },
    {
      id: "FAC004",
      name: "Dr. James Davis",
      email: "james.davis@university.edu",
      department: "Computer Science",
      designation: "Lecturer",
      contactNo: "+1-555-0126",
      office: "Tech-104",
      gender: "Male",
      status: "Pending Approval",
      joiningDate: "2024-01-15",
      courses: ["CS201"],
      students: 30,
      biography:
        "Dr. Davis brings industry experience in software development and database systems.",
      educationalBackground: [
        "PhD Computer Science, Berkeley",
        "MS Software Engineering, CMU"
      ]
    },
    {
      id: "FAC005",
      name: "Dr. Lisa Anderson",
      email: "lisa.anderson@university.edu",
      department: "Chemistry",
      designation: "Associate Professor",
      contactNo: "+1-555-0127",
      office: "Chem-201",
      gender: "Female",
      status: "Active",
      joiningDate: "2021-03-20",
      courses: ["CHEM101", "CHEM201"],
      students: 85,
      biography:
        "Dr. Anderson specializes in organic chemistry and biochemical research.",
      educationalBackground: [
        "PhD Chemistry, Yale",
        "MS Chemistry, Northwestern"
      ]
    }
  ]

  const [faculty, setFaculty] = useState(facultyData)
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    facultyId: "",
    designation: "",
    department: "",
    joiningDate: "",
    email: "",
    phone: "",
    office: "",
    biography: "",
    educationalBackground: [""],
    password: ""
  })

  const [educationFields, setEducationFields] = useState([""]) // Track multiple education fields

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment =
      departmentFilter === "all" || member.department === departmentFilter
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const addEducationField = () => {
    setEducationFields([...educationFields, ""])
    setNewFaculty({
      ...newFaculty,
      educationalBackground: [...newFaculty.educationalBackground, ""]
    })
  }

  const removeEducationField = index => {
    if (educationFields.length > 1) {
      const newFields = educationFields.filter((_, i) => i !== index)
      const newEducation = newFaculty.educationalBackground.filter(
        (_, i) => i !== index
      )
      setEducationFields(newFields)
      setNewFaculty({
        ...newFaculty,
        educationalBackground: newEducation
      })
    }
  }

  const updateEducationField = (index, value) => {
    const newEducation = [...newFaculty.educationalBackground]
    newEducation[index] = value
    setNewFaculty({
      ...newFaculty,
      educationalBackground: newEducation
    })
  }

  const handleAddFaculty = () => {
    if (
      !newFaculty.name ||
      !newFaculty.facultyId ||
      !newFaculty.designation ||
      !newFaculty.department ||
      !newFaculty.joiningDate ||
      !newFaculty.password
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    const facultyToAdd = {
      id: newFaculty.facultyId,
      name: newFaculty.name,
      email: newFaculty.email,
      department: newFaculty.department,
      designation: newFaculty.designation,
      contactNo: newFaculty.phone,
      office: newFaculty.office,
      gender: "Not Specified", // Will be updated in edit
      status: "Active",
      joiningDate: newFaculty.joiningDate,
      courses: [],
      students: 0,
      biography: newFaculty.biography,
      educationalBackground: newFaculty.educationalBackground.filter(
        edu => edu.trim() !== ""
      )
    }

    setFaculty([...faculty, facultyToAdd])

    // Reset form
    setNewFaculty({
      name: "",
      facultyId: "",
      designation: "",
      department: "",
      joiningDate: "",
      email: "",
      phone: "",
      office: "",
      biography: "",
      educationalBackground: [""],
      password: ""
    })
    setEducationFields([""])
    setShowAddModal(false)

    // Show success message with login credentials
    toast.success(
      `Faculty member added successfully! Login ID: ${newFaculty.facultyId}, Password: ${newFaculty.password}`
    )
  }

  const handleEditFaculty = member => {
    setEditingFaculty(member)
  }

  const handleUpdateFaculty = () => {
    setFaculty(
      faculty.map(member =>
        member.id === editingFaculty.id ? editingFaculty : member
      )
    )
    setEditingFaculty(null)
    toast.success("Faculty member updated successfully")
  }

  const handleDeleteFaculty = id => {
    setFaculty(faculty.filter(member => member.id !== id))
    toast.success("Faculty member removed successfully")
  }

  const handleViewDetails = member => {
    setViewingFaculty(member)
  }

  const getStatusColor = status => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Pending Approval":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingApprovals = faculty.filter(
    member => member.status === "Pending Approval"
  )

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="gradient-admin rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Faculty Management
            </h1>
            <p className="text-purple-100">
              Manage faculty members, assignments, and approvals
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{faculty.length}</div>
            <div className="text-purple-100">Total Faculty</div>
          </div>
        </div>
      </div>

      {/* Main Faculty Management */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Faculty Directory
              </CardTitle>
              <CardDescription>
                Manage faculty members and their assignments
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Faculty Member</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new faculty member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={newFaculty.name}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              name: e.target.value
                            })
                          }
                          placeholder="Dr. John Smith"
                        />
                      </div>
                      <div>
                        <Label htmlFor="facultyId">Faculty ID *</Label>
                        <Input
                          id="facultyId"
                          value={newFaculty.facultyId}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              facultyId: e.target.value.toUpperCase()
                            })
                          }
                          placeholder="FAC001"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="designation">Designation *</Label>
                        <Select
                          value={newFaculty.designation}
                          onValueChange={value =>
                            setNewFaculty({ ...newFaculty, designation: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Professor">Professor</SelectItem>
                            <SelectItem value="Associate Professor">
                              Associate Professor
                            </SelectItem>
                            <SelectItem value="Assistant Professor">
                              Assistant Professor
                            </SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                            <SelectItem value="Senior Lecturer">
                              Senior Lecturer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select
                          value={newFaculty.department}
                          onValueChange={value =>
                            setNewFaculty({ ...newFaculty, department: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="joiningDate">Joining Date *</Label>
                        <Input
                          id="joiningDate"
                          type="date"
                          value={newFaculty.joiningDate}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              joiningDate: e.target.value
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newFaculty.email}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              email: e.target.value
                            })
                          }
                          placeholder="john.smith@university.edu"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newFaculty.phone}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              phone: e.target.value
                            })
                          }
                          placeholder="+1-555-0123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="office">Office</Label>
                        <Input
                          id="office"
                          value={newFaculty.office}
                          onChange={e =>
                            setNewFaculty({
                              ...newFaculty,
                              office: e.target.value
                            })
                          }
                          placeholder="Tech-301"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="biography">Biography</Label>
                      <Textarea
                        id="biography"
                        value={newFaculty.biography}
                        onChange={e =>
                          setNewFaculty({
                            ...newFaculty,
                            biography: e.target.value
                          })
                        }
                        placeholder="Brief biography and research interests..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Educational Background</Label>
                      {educationFields.map((field, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mt-2"
                        >
                          <Input
                            value={
                              newFaculty.educationalBackground[index] || ""
                            }
                            onChange={e =>
                              updateEducationField(index, e.target.value)
                            }
                            placeholder="e.g., PhD Computer Science, MIT"
                          />
                          {educationFields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeEducationField(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addEducationField}
                        className="mt-2"
                      >
                        Add More Education
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor="password">Login Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newFaculty.password}
                        onChange={e =>
                          setNewFaculty({
                            ...newFaculty,
                            password: e.target.value
                          })
                        }
                        placeholder="Create login password for faculty"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        This password will be used for faculty login with their
                        Faculty ID
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddFaculty}>Add Faculty</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or faculty ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Pending Approval">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Faculty Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Faculty ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact No</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map(member => (
                  <TableRow key={member.id} className="hover:bg-purple-50">
                    <TableCell className="font-medium">{member.id}</TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.designation}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {member.contactNo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => handleEditFaculty(member)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => handleViewDetails(member)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteFaculty(member.id)}
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

          {filteredFaculty.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No faculty members found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Faculty Modal */}
      {editingFaculty && (
        <Dialog
          open={!!editingFaculty}
          onOpenChange={() => setEditingFaculty(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Faculty Member</DialogTitle>
              <DialogDescription>
                Update faculty member details
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editingFaculty.name}
                  onChange={e =>
                    setEditingFaculty({
                      ...editingFaculty,
                      name: e.target.value
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingFaculty.email}
                  onChange={e =>
                    setEditingFaculty({
                      ...editingFaculty,
                      email: e.target.value
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-department">Department</Label>
                <Select
                  value={editingFaculty.department}
                  onValueChange={value =>
                    setEditingFaculty({ ...editingFaculty, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-contact">Contact Number</Label>
                <Input
                  id="edit-contact"
                  value={editingFaculty.contactNo}
                  onChange={e =>
                    setEditingFaculty({
                      ...editingFaculty,
                      contactNo: e.target.value
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingFaculty(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateFaculty}>Update Faculty</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* View Faculty Details Modal */}
      {viewingFaculty && (
        <Dialog
          open={!!viewingFaculty}
          onOpenChange={() => setViewingFaculty(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Faculty Details</DialogTitle>
              <DialogDescription>
                Complete information for {viewingFaculty.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Faculty ID</Label>
                  <p className="text-sm font-medium">{viewingFaculty.id}</p>
                </div>
                <div>
                  <Label>Name</Label>
                  <p className="text-sm font-medium">{viewingFaculty.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p className="text-sm font-medium">{viewingFaculty.email}</p>
                </div>
                <div>
                  <Label>Contact Number</Label>
                  <p className="text-sm font-medium">
                    {viewingFaculty.contactNo}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <p className="text-sm font-medium">
                    {viewingFaculty.department}
                  </p>
                </div>
                <div>
                  <Label>Designation</Label>
                  <p className="text-sm font-medium">
                    {viewingFaculty.designation}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Office</Label>
                  <p className="text-sm font-medium">{viewingFaculty.office}</p>
                </div>
                <div>
                  <Label>Gender</Label>
                  <p className="text-sm font-medium">{viewingFaculty.gender}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Joining Date</Label>
                  <p className="text-sm font-medium">
                    {new Date(viewingFaculty.joiningDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(viewingFaculty.status)}>
                    {viewingFaculty.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Biography</Label>
                <p className="text-sm text-gray-600">
                  {viewingFaculty.biography}
                </p>
              </div>

              <div>
                <Label>Educational Background</Label>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {viewingFaculty.educationalBackground.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Assigned Courses</Label>
                  <p className="text-sm font-medium">
                    {viewingFaculty.courses.join(", ") || "No courses assigned"}
                  </p>
                </div>
                <div>
                  <Label>Total Students</Label>
                  <p className="text-sm font-medium">
                    {viewingFaculty.students}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setViewingFaculty(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
