import { Card } from "../../Components/ui/card"
import { Badge } from "../../Components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  GraduationCap,
  Building
} from "lucide-react"

export function FacultyProfile() {
  const profileData = {
    name: "Dr. Sarah Wilson",
    id: "FAC001",
    email: "sarah.wilson@university.edu",
    phone: "+1 (555) 123-4567",
    office: "Science Building, Room 305",
    department: "Computer Science",
    designation: "Associate Professor",
    joinDate: "August 2018",
    education: [
      { degree: "Ph.D. in Computer Science", institution: "MIT", year: "2016" },
      {
        degree: "M.S. in Computer Science",
        institution: "Stanford University",
        year: "2012"
      },
      {
        degree: "B.S. in Computer Engineering",
        institution: "UC Berkeley",
        year: "2010"
      }
    ],
    publications: [
      {
        title: "Advanced Machine Learning Techniques in Modern Applications",
        journal: "Journal of Computer Science",
        year: "2024"
      },
      {
        title: "Data Mining Approaches for Educational Analytics",
        journal: "Educational Technology & Society",
        year: "2023"
      },
      {
        title: "Computer Vision Applications in Healthcare",
        journal: "IEEE Transactions on Medical Imaging",
        year: "2023"
      }
    ],
    bio:
      "Dr. Sarah Wilson is an Associate Professor in the Computer Science Department with over 8 years of teaching and research experience. Her research focuses on machine learning, data mining, and their applications in various domains including healthcare and education. She has published numerous papers in top-tier journals and conferences."
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Faculty Profile</h1>
        <p className="text-gray-600 mt-1">
          View academic profile and information
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white border border-faculty-primary/20">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="academic"
            className="data-[state=active]:bg-faculty-primary data-[state=active]:text-white"
          >
            Academic
          </TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="p-6 border-faculty-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-faculty-secondary rounded-lg">
                  <User className="w-5 h-5 text-faculty-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {profileData.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faculty ID
                  </label>
                  <p className="text-gray-600">{profileData.id}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <p className="text-gray-900">{profileData.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <Badge
                    variant="outline"
                    className="border-faculty-primary text-faculty-primary"
                  >
                    {profileData.designation}
                  </Badge>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date
                  </label>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6 border-faculty-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-faculty-secondary rounded-lg">
                  <Mail className="w-5 h-5 text-faculty-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail className="w-4 h-4 text-faculty-primary" />
                    <span>{profileData.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Phone className="w-4 h-4 text-faculty-primary" />
                    <span>{profileData.phone}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-4 h-4 text-faculty-primary" />
                    <span>{profileData.office}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Biography */}
          <Card className="p-6 border-faculty-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-faculty-secondary rounded-lg">
                <BookOpen className="w-5 h-5 text-faculty-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Biography</h3>
            </div>

            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          </Card>
        </TabsContent>

        {/* Academic Information */}
        <TabsContent value="academic" className="space-y-6">
          <Card className="p-6 border-faculty-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-faculty-secondary rounded-lg">
                <GraduationCap className="w-5 h-5 text-faculty-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Educational Background
              </h3>
            </div>

            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-faculty-secondary/30 rounded-lg border border-faculty-primary/20"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Building className="w-4 h-4" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-faculty-primary text-faculty-primary"
                    >
                      {edu.year}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
