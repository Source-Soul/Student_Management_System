import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/Components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/card";
import { Badge } from "@/Components/badge";
import {
    BookOpen,
    Users,
    Calendar,
    GraduationCap,
    Bell,
    BarChart3,
    Shield,
    Star,
    CheckCircle,
    TrendingUp,
    Award,
    Clock,
    UserCheck,
    MapPin,
} from "lucide-react";
import { features, roles, stats } from "@/constants/landingPageData";
import { Login } from "@/Pages/Login";

export function LandingPage({ onLogin }) {
    const navigate = useNavigate();
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [selectedRole, setSelectedRole] = useState("student");

    // Persist login state: redirect if already logged in
    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "student") {
            navigate("/student/profile");
        } else if (userRole === "faculty") {
            navigate("/faculty/dashboard");
        } else if (userRole === "admin") {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setShowAuthForm(true);
    };

    const handleLearnMoreClick = () => {
        document
            .getElementById("features-section")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const handleLogin = (role, credentials) => {
        console.log("Logged in as:", role, credentials);
        localStorage.setItem("userRole", role); // <-- store login state

        if (role === "student") {
            navigate("/student/profile");
        } else if (role === "faculty") {
            navigate("/faculty/dashboard");
        } else if (role === "admin") {
            navigate("/admin/dashboard");
        }
    };

    if (showAuthForm) {
        return (
            <Login
                onLogin={handleLogin}
                onBack={() => setShowAuthForm(false)}
                initialRole={selectedRole}
            />
        );
    }

    return (
        <div className="min-h-screen">
            <header className="relative overflow-hidden  bg-blue-900">
                <div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative container mx-auto px-6 py-24">
                        <div className="text-center text-white">
                            <Badge className="mb-6 bg-white/20 text-white border-white/30">
                                <Star className="w-3 h-3 mr-1" />
                                Academic Excellence Platform
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                Student Management
                                <br />
                                <span className="text-yellow-300">System</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                                Streamline academic operations with our
                                comprehensive platform designed for students,
                                faculty, and administrators.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8"
                                    onClick={() =>
                                        document
                                            .getElementById("role-selection")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                >
                                    Get Started
                                    <CheckCircle className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 pulse-glow"
                                    onClick={handleLearnMoreClick}
                                >
                                    <span className="text-blink">
                                        Learn More
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="features-section"
                className="py-20 bg-gradient-to-r from-blue-50 to-purple-50"
            >
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-100 text-blue-800">
                            <Award className="w-3 h-3 mr-1" />
                            Powerful Features
                        </Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Everything you need for
                            <span className="text-blue-600">
                                {" "}
                                academic success
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our platform provides comprehensive tools for
                            managing every aspect of academic life, from
                            enrollment to graduation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <CardHeader>
                                    <div
                                        className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-xl mb-4`}
                                    >
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle className="text-xl">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="role-selection" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-100 text-green-800">
                            <Clock className="w-3 h-3 mr-1" />
                            Choose Your Role
                        </Badge>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Login to your
                            <span className="text-green-600"> portal</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {roles.map((role) => (
                            <Card
                                key={role.id}
                                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group overflow-hidden"
                                onClick={() => handleRoleSelect(role.id)}
                            >
                                <div
                                    className={`h-2 ${
                                        role.id === "student"
                                            ? "bg-blue-500"
                                            : role.id === "faculty"
                                            ? "bg-green-500"
                                            : "bg-purple-500"
                                    }`}
                                ></div>

                                <CardHeader className="text-center pb-4">
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 ${
                                            role.id === "student"
                                                ? "bg-blue-500"
                                                : role.id === "faculty"
                                                ? "bg-green-500"
                                                : "bg-purple-500"
                                        }`}
                                    >
                                        <role.icon className="h-8 w-8 text-white" />
                                    </div>

                                    <CardTitle className="text-2xl">
                                        {role.title}
                                    </CardTitle>
                                    <CardDescription className="text-base leading-relaxed">
                                        {role.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {role.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-3"
                                        >
                                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                            <span className="text-sm text-gray-600">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="pt-4">
                                        <Button
                                            className={`w-full ${
                                                role.id === "student"
                                                    ? "bg-blue-500"
                                                    : role.id === "faculty"
                                                    ? "bg-green-500"
                                                    : "bg-purple-500"
                                            } hover:opacity-90 transition-opacity text-white`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRoleSelect(role.id);
                                            }}
                                        >
                                            Login as{" "}
                                            {role.id === "student"
                                                ? "Student"
                                                : role.id === "faculty"
                                                ? "Faculty"
                                                : "Admin"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-4">
                                University
                            </h3>
                            <p className="text-gray-400 mb-4">
                                Leading the way in higher education with
                                innovative technology and academic excellence.
                            </p>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>
                                        123 University Ave, Education City
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Academic Calendar
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Course Catalog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Student Resources
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Faculty Directory
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-4">
                                Support
                            </h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Technical Support
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        System Status
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                        <p className="text-gray-400">
                            © 2025 University Student Management System. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
