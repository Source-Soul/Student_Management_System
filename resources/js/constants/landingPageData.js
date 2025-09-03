// resources/js/constants/landingPageData.js

// Features section (e.g., key things your app provides)
export const features = [
  {
    title: "Manage Students",
    description: "Add, edit, and view student information efficiently.",
    icon: "User" // optional, if you map it to an icon in JSX
  },
  {
    title: "Track Progress",
    description: "Monitor student grades and progress easily.",
    icon: "BarChart"
  },
  {
    title: "Faculty Management",
    description: "Manage faculty assignments and schedules.",
    icon: "Users"
  },
];

// Roles section (e.g., different user types)
export const roles = [
  {
    name: "Admin",
    description: "Full access to all features and management tools.",
  },
  {
    name: "Faculty",
    description: "Can manage courses, grades, and student interactions.",
  },
  {
    name: "Student",
    description: "Can view grades, progress, and course information.",
  },
];

// Stats section (e.g., numbers displayed on the landing page)
export const stats = [
  { label: "Students", value: 1200 },
  { label: "Faculties", value: 75 },
  { label: "Courses", value: 50 },
];
