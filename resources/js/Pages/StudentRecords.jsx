import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Button } from "../Components/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../Components/table";
import { Input } from "../Components/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../Components/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../Components/dialog";
import { Label } from "../Components/label";
import { Users, Search, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

export function StudentRecords() {
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [students, setStudents] = useState(studentData);

    const [editingStudent, setEditingStudent] = useState(null);
    const [viewingStudent, setViewingStudent] = useState(null);
    const [addingStudent, setAddingStudent] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [newStudent, setNewStudent] = useState({
        id: "",
        name: "",
        section: "",
        degreeProgram: "",
        completedCredits: "",
        department: "",
        semester: "",
        advisor: "",
        email: "",
        contact: "",
    });

    const departments = [
        "Computer Science",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "History",
    ];

    const filteredStudents = students.filter((s) => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment =
            departmentFilter === "all" || s.department === departmentFilter;
        return matchesSearch && matchesDepartment;
    });

    const handleDeleteStudent = (id) => {
        setStudents(students.filter((s) => s.id !== id));
        toast.success("Student removed successfully");
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setEditForm({ ...student });
    };

    const handleViewClick = (student) => {
        setViewingStudent(student);
    };

    const handleUpdateStudent = () => {
        setStudents(
            students.map((s) => (s.id === editingStudent.id ? editForm : s))
        );
        setEditingStudent(null);
        toast.success("Student updated successfully");
    };

    const handleAddStudent = () => {
        setStudents([...students, newStudent]);
        setAddingStudent(false);
        setNewStudent({
            id: "",
            name: "",
            section: "",
            degreeProgram: "",
            completedCredits: "",
            department: "",
            semester: "",
            advisor: "",
            email: "",
            contact: "",
        });
        toast.success("Student added successfully");
    };

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center">
                            <Users className="h-8 w-8 mr-3" />
                            Student Records
                        </h1>
                        <p className="text-indigo-100">
                            Manage student information and records
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">
                            {students.length}
                        </div>
                        <div className="text-indigo-100">Total Students</div>
                    </div>
                </div>
            </div>

            {/* Add Student Button */}
            <div className="flex justify-end">
                <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => setAddingStudent(true)}
                >
                    + Add Student
                </Button>
            </div>

            {/* Student Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 rounded-t-lg">
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-indigo-600" />
                        Student Directory
                    </CardTitle>
                    <CardDescription>
                        Manage student information and details
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Search + Filter */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name, email, or student ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                <SelectItem value="all">
                                    All Departments
                                </SelectItem>
                                {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Degree Program</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Completed Credits</TableHead>
                                    <TableHead>Advisor</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Contact No</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.map((s) => (
                                    <TableRow
                                        key={s.id}
                                        className="hover:bg-indigo-50"
                                    >
                                        <TableCell>{s.id}</TableCell>
                                        <TableCell>{s.name}</TableCell>
                                        <TableCell>{s.department}</TableCell>
                                        <TableCell>{s.degreeProgram}</TableCell>
                                        <TableCell>{s.semester}</TableCell>
                                        <TableCell>
                                            {s.completedCredits}
                                        </TableCell>
                                        <TableCell>{s.advisor}</TableCell>
                                        <TableCell>{s.email}</TableCell>
                                        <TableCell>{s.contact}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                                                    onClick={() =>
                                                        handleEditClick(s)
                                                    }
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-green-100 hover:bg-green-200 text-green-700"
                                                    onClick={() =>
                                                        handleViewClick(s)
                                                    }
                                                >
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-red-100 hover:bg-red-200 text-red-700"
                                                    onClick={() =>
                                                        handleDeleteStudent(
                                                            s.id
                                                        )
                                                    }
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
                </CardContent>
            </Card>

            {/* Add Student Modal */}
            {addingStudent && (
                <Dialog
                    open={true}
                    onOpenChange={() => setAddingStudent(false)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Student</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <InputField
                                label="Full Name"
                                value={newStudent.name}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, name: v })
                                }
                            />
                            <InputField
                                label="Student ID"
                                value={newStudent.id}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, id: v })
                                }
                            />
                            <InputField
                                label="Section"
                                value={newStudent.section}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, section: v })
                                }
                            />
                            <InputField
                                label="Degree Program"
                                value={newStudent.degreeProgram}
                                setValue={(v) =>
                                    setNewStudent({
                                        ...newStudent,
                                        degreeProgram: v,
                                    })
                                }
                            />
                            <InputField
                                label="Completed Credits"
                                value={newStudent.completedCredits}
                                setValue={(v) =>
                                    setNewStudent({
                                        ...newStudent,
                                        completedCredits: v,
                                    })
                                }
                            />
                            <InputField
                                label="Department"
                                value={newStudent.department}
                                setValue={(v) =>
                                    setNewStudent({
                                        ...newStudent,
                                        department: v,
                                    })
                                }
                            />
                            <InputField
                                label="Current Semester"
                                value={newStudent.semester}
                                setValue={(v) =>
                                    setNewStudent({
                                        ...newStudent,
                                        semester: v,
                                    })
                                }
                            />
                            <InputField
                                label="Advisor"
                                value={newStudent.advisor}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, advisor: v })
                                }
                            />
                            <InputField
                                label="Email"
                                value={newStudent.email}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, email: v })
                                }
                            />
                            <InputField
                                label="Contact No"
                                value={newStudent.contact}
                                setValue={(v) =>
                                    setNewStudent({ ...newStudent, contact: v })
                                }
                            />

                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setAddingStudent(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleAddStudent}>
                                    Add Student
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Edit Modal */}
            {editingStudent && (
                <Dialog
                    open={true}
                    onOpenChange={() => setEditingStudent(null)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>Edit Student</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <InputField
                                label="Full Name"
                                value={editForm.name}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, name: v })
                                }
                            />
                            <InputField
                                label="Student ID"
                                value={editForm.id}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, id: v })
                                }
                            />
                            <InputField
                                label="Section"
                                value={editForm.section}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, section: v })
                                }
                            />
                            <InputField
                                label="Degree Program"
                                value={editForm.degreeProgram}
                                setValue={(v) =>
                                    setEditForm({
                                        ...editForm,
                                        degreeProgram: v,
                                    })
                                }
                            />
                            <InputField
                                label="Completed Credits"
                                value={editForm.completedCredits}
                                setValue={(v) =>
                                    setEditForm({
                                        ...editForm,
                                        completedCredits: v,
                                    })
                                }
                            />
                            <InputField
                                label="Department"
                                value={editForm.department}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, department: v })
                                }
                            />
                            <InputField
                                label="Current Semester"
                                value={editForm.semester}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, semester: v })
                                }
                            />
                            <InputField
                                label="Advisor"
                                value={editForm.advisor}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, advisor: v })
                                }
                            />
                            <InputField
                                label="Email"
                                value={editForm.email}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, email: v })
                                }
                            />
                            <InputField
                                label="Contact No"
                                value={editForm.contact}
                                setValue={(v) =>
                                    setEditForm({ ...editForm, contact: v })
                                }
                            />

                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditingStudent(null)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdateStudent}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* View Modal */}
            {viewingStudent && (
                <Dialog
                    open={true}
                    onOpenChange={() => setViewingStudent(null)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>View Student</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 mt-2">
                            <StudentViewField
                                label="Full Name"
                                value={viewingStudent.name}
                            />
                            <StudentViewField
                                label="Student ID"
                                value={viewingStudent.id}
                            />
                            <StudentViewField
                                label="Section"
                                value={viewingStudent.section}
                            />
                            <StudentViewField
                                label="Degree Program"
                                value={viewingStudent.degreeProgram}
                            />
                            <StudentViewField
                                label="Completed Credits"
                                value={viewingStudent.completedCredits}
                            />
                            <StudentViewField
                                label="Department"
                                value={viewingStudent.department}
                            />
                            <StudentViewField
                                label="Current Semester"
                                value={viewingStudent.semester}
                            />
                            <StudentViewField
                                label="Advisor"
                                value={viewingStudent.advisor}
                            />
                            <StudentViewField
                                label="Email"
                                value={viewingStudent.email}
                            />
                            <StudentViewField
                                label="Contact No"
                                value={viewingStudent.contact}
                            />
                            <div className="flex justify-end mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setViewingStudent(null)}
                                >
                                    Close
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

// Helper component for editable input field
function InputField({ label, value, setValue }) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
}

// Helper component for view-only field
function StudentViewField({ label, value }) {
    return (
        <p>
            <strong>{label}:</strong> {value}
        </p>
    );
}

// Sample student data
const studentData = [
    {
        id: "20210001",
        name: "Alice Johnson",
        section: "A",
        degreeProgram: "Bachelor of Science",
        completedCredits: 90,
        department: "Computer Science",
        semester: "7th",
        advisor: "Dr. Smith",
        email: "alice.johnson@student.university.edu",
        contact: "+1-555-2001",
    },
    {
        id: "20210002",
        name: "Bob Smith",
        section: "B",
        degreeProgram: "Bachelor of Science",
        completedCredits: 85,
        department: "Mathematics",
        semester: "7th",
        advisor: "Dr. Lee",
        email: "bob.smith@student.university.edu",
        contact: "+1-555-2002",
    },
];
