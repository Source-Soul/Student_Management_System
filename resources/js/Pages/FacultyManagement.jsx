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
import {
    Users,
    Search,
    Edit,
    Trash2,
    Eye,
    Mail,
    Phone,
    Calendar,
    Plus,
} from "lucide-react";
import { toast } from "sonner";

export function FacultyManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [faculty, setFaculty] = useState(facultyData);

    const [editingFaculty, setEditingFaculty] = useState(null);
    const [viewingFaculty, setViewingFaculty] = useState(null);
    const [editForm, setEditForm] = useState({});

    // New State for Add Faculty
    const [addingFaculty, setAddingFaculty] = useState(false);
    const [newFaculty, setNewFaculty] = useState({
        id: "",
        name: "",
        department: "",
        designation: "",
        joiningDate: "",
        email: "",
        phone: "",
        office: "",
        status: "Active",
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

    const filteredFaculty = faculty.filter((m) => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment =
            departmentFilter === "all" || m.department === departmentFilter;
        return matchesSearch && matchesDepartment;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "On Leave":
                return "bg-yellow-100 text-yellow-800";
            case "Pending Approval":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleDeleteFaculty = (id) => {
        setFaculty(faculty.filter((m) => m.id !== id));
        toast.success("Faculty member removed successfully");
    };

    const handleEditClick = (faculty) => {
        setEditingFaculty(faculty);
        setEditForm({ ...faculty });
    };

    const handleViewClick = (faculty) => {
        setViewingFaculty(faculty);
    };

    const handleUpdateFaculty = () => {
        setFaculty(
            faculty.map((f) => (f.id === editingFaculty.id ? editForm : f))
        );
        setEditingFaculty(null);
        toast.success("Faculty updated successfully");
    };

    const handleAddFaculty = () => {
        if (
            !newFaculty.id ||
            !newFaculty.name ||
            !newFaculty.email ||
            !newFaculty.department
        ) {
            toast.error("Please fill all required fields!");
            return;
        }
        setFaculty([...faculty, newFaculty]);
        setAddingFaculty(false);
        setNewFaculty({
            id: "",
            name: "",
            department: "",
            designation: "",
            joiningDate: "",
            email: "",
            phone: "",
            office: "",
            status: "Active",
        });
        toast.success("Faculty added successfully");
    };

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
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
                        <div className="text-2xl font-bold">
                            {faculty.length}
                        </div>
                        <div className="text-purple-100">Total Faculty</div>
                    </div>
                </div>
            </div>

            {/* Faculty Table */}
            <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-t-lg flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-gray-900 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-purple-600" />
                            Faculty Directory
                        </CardTitle>
                        <CardDescription>
                            Manage faculty members and their assignments
                        </CardDescription>
                    </div>
                    <Button
                        className="bg-purple-600 text-white hover:bg-purple-700"
                        onClick={() => setAddingFaculty(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" /> Add Faculty
                    </Button>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Search + Filter */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name, email, or faculty ID..."
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
                                    <TableHead>Faculty ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Contact No</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFaculty.map((m) => (
                                    <TableRow
                                        key={m.id}
                                        className="hover:bg-purple-50"
                                    >
                                        <TableCell>{m.id}</TableCell>
                                        <TableCell>{m.name}</TableCell>
                                        <TableCell>{m.designation}</TableCell>
                                        <TableCell>{m.department}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                    m.status
                                                )}`}
                                            >
                                                {m.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                {m.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                {m.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-purple-100 hover:bg-purple-200 text-purple-700"
                                                    onClick={() =>
                                                        handleEditClick(m)
                                                    }
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-green-100 hover:bg-green-200 text-green-700"
                                                    onClick={() =>
                                                        handleViewClick(m)
                                                    }
                                                >
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-red-100 hover:bg-red-200 text-red-700"
                                                    onClick={() =>
                                                        handleDeleteFaculty(
                                                            m.id
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

            {/* Add Faculty Modal */}
            {addingFaculty && (
                <Dialog
                    open={true}
                    onOpenChange={() => setAddingFaculty(false)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>Add New Faculty</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    value={newFaculty.name}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Faculty ID</Label>
                                <Input
                                    value={newFaculty.id}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            id: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Department</Label>
                                <Select
                                    value={newFaculty.department}
                                    onValueChange={(val) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            department: val,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept} value={dept}>
                                                {dept}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Designation</Label>
                                <Input
                                    value={newFaculty.designation}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            designation: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Joining Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="date"
                                        value={newFaculty.joiningDate}
                                        onChange={(e) =>
                                            setNewFaculty({
                                                ...newFaculty,
                                                joiningDate: e.target.value,
                                            })
                                        }
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    value={newFaculty.email}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={newFaculty.phone}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Office Address</Label>
                                <Input
                                    value={newFaculty.office}
                                    onChange={(e) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            office: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Status</Label>
                                <Select
                                    value={newFaculty.status}
                                    onValueChange={(val) =>
                                        setNewFaculty({
                                            ...newFaculty,
                                            status: val,
                                        })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">
                                            Active
                                        </SelectItem>
                                        <SelectItem value="On Leave">
                                            On Leave
                                        </SelectItem>
                                        <SelectItem value="Pending Approval">
                                            Pending Approval
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setAddingFaculty(false)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleAddFaculty}>Add</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Edit Modal */}
            {editingFaculty && (
                <Dialog
                    open={true}
                    onOpenChange={() => setEditingFaculty(null)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>Edit Faculty</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    value={editForm.name}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Faculty ID</Label>
                                <Input
                                    value={editForm.id}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            id: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Department</Label>
                                <Input
                                    value={editForm.department}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            department: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Designation</Label>
                                <Input
                                    value={editForm.designation}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            designation: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Joining Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="date"
                                        value={editForm.joiningDate}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                joiningDate: e.target.value,
                                            })
                                        }
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Phone</Label>
                                <Input
                                    value={editForm.phone}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <Label>Office Address</Label>
                                <Input
                                    value={editForm.office}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            office: e.target.value,
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
                                <Button onClick={handleUpdateFaculty}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* View Modal */}
            {viewingFaculty && (
                <Dialog
                    open={true}
                    onOpenChange={() => setViewingFaculty(null)}
                >
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle>View Faculty</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 mt-2">
                            <p>
                                <strong>Name:</strong> {viewingFaculty.name}
                            </p>
                            <p>
                                <strong>Faculty ID:</strong> {viewingFaculty.id}
                            </p>
                            <p>
                                <strong>Department:</strong>{" "}
                                {viewingFaculty.department}
                            </p>
                            <p>
                                <strong>Designation:</strong>{" "}
                                {viewingFaculty.designation}
                            </p>
                            <p>
                                <strong>Joining Date:</strong>{" "}
                                {viewingFaculty.joiningDate}
                            </p>
                            <p>
                                <strong>Email:</strong> {viewingFaculty.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {viewingFaculty.phone}
                            </p>
                            <p>
                                <strong>Office:</strong> {viewingFaculty.office}
                            </p>
                            <div className="flex justify-end mt-4">
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
    );
}

// Sample faculty data
const facultyData = [
    {
        id: "FAC001",
        name: "Dr. Sarah Wilson",
        email: "sarah.wilson@university.edu",
        department: "Computer Science",
        designation: "Associate Professor",
        phone: "+1-555-0123",
        office: "Tech-301",
        joiningDate: "2020-08-15",
    },
    {
        id: "FAC002",
        name: "Prof. Michael Johnson",
        email: "michael.johnson@university.edu",
        department: "Mathematics",
        designation: "Professor",
        phone: "+1-555-0124",
        office: "Math-205",
        joiningDate: "2018-09-01",
    },
];
