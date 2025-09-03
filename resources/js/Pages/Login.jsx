import { useState } from "react";
import { Button } from "../Components/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../Components/card";
import { Input } from "../Components/input";
import { Label } from "../Components/label";
import { Alert, AlertDescription } from "../Components/alert";
import { LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

// * Component: Login
// This component provides a user authentication form.
// It is designed to be used for different user roles (student, faculty, admin)
// and handles input validation and submission.

export function Login({ onLogin, onBack, initialRole }) {
    // State to toggle password visibility in the login form.
    const [showPassword, setShowPassword] = useState(false);
    // State to manage the data entered into the login form.
    const [formData, setFormData] = useState({
        role: initialRole,
        userId: "",
        password: "",
    });
    // State to hold any validation errors for the form fields.
    const [validationErrors, setValidationErrors] = useState([]);
    // State to track the submission process, used for disabling the button and showing a loader.
    const [isSubmitting, setIsSubmitting] = useState(false);

    //  Validation Patterns
    // Defines the regular expression patterns for validating user IDs based on their role.
    const validationPatterns = {
        student: {
            id: /^20\d{6}$/,
            idDescription:
                "Student ID format: 20XXXXXX (8 digits starting with 20)",
        },
        faculty: {
            id: /^FAC\d{3,4}$/,
            idDescription:
                "Faculty ID format: FACXXX or FACXXXX (FAC followed by 3-4 digits)",
        },
        admin: {
            id: /^ADM\d{3}$/,
            idDescription: "Admin ID format: ADMXXX (ADM followed by 3 digits)",
        },
    };

    // Function: validateForm
    // Validates the current form data based on the selected role.
    const validateForm = () => {
        const errors = [];
        const patterns = validationPatterns[formData.role];

        //  Validate User ID
        if (!formData.userId.trim()) {
            errors.push({ field: "userId", message: "ID is required" });
        } else if (!patterns.id.test(formData.userId)) {
            errors.push({
                field: "userId",
                message: `Invalid ID format. ${patterns.idDescription}`,
            });
        }

        //  Validate Password
        if (!formData.password) {
            errors.push({ field: "password", message: "Password is required" });
        }

        return errors;
    };

    //  Function: handleSubmit
    // Handles the form submission event.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const errors = validateForm();
        setValidationErrors(errors);

        if (errors.length === 0) {
            // ! Simulating API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            //  Trigger the onLogin callback
            onLogin(formData.role, {
                userId: formData.userId,
                password: formData.password,
            });
        }

        setIsSubmitting(false);
    };

    //  Function: handleInputChange
    // Updates the form data state as the user types.
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setValidationErrors((prev) =>
            prev.filter((error) => error.field !== field)
        );
    };
    // A helper function to retrieve the error message for a specific form field.
    const getFieldError = (field) => {
        return validationErrors.find((error) => error.field === field)?.message;
    };

    const currentPattern = validationPatterns[formData.role];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="border-0 shadow-2xl">
                    <CardHeader className="text-center pb-6">
                        <div
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 mx-auto ${
                                formData.role === "student"
                                    ? "bg-blue-500"
                                    : formData.role === "faculty"
                                    ? "bg-green-500"
                                    : "bg-purple-500"
                            }`}
                        >
                            <LogIn className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl">
                            Login as{" "}
                            {formData.role === "student"
                                ? "Student"
                                : formData.role === "faculty"
                                ? "Faculty"
                                : "Admin"}
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access the {formData.role}{" "}
                            portal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="userId">
                                    {formData.role === "student"
                                        ? "Student ID"
                                        : formData.role === "faculty"
                                        ? "Faculty ID"
                                        : "Admin ID"}
                                </Label>
                                <Input
                                    id="userId"
                                    type="text"
                                    placeholder={
                                        formData.role === "student"
                                            ? "e.g., 20210001"
                                            : formData.role === "faculty"
                                            ? "e.g., FAC001"
                                            : "e.g., ADM001"
                                    }
                                    value={formData.userId}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "userId",
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                    className={
                                        getFieldError("userId")
                                            ? "border-red-500"
                                            : ""
                                    }
                                />
                                <p className="text-xs text-gray-500">
                                    {currentPattern.idDescription}
                                </p>
                                {getFieldError("userId") && (
                                    <Alert className="py-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className="text-sm">
                                            {getFieldError("userId")}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        className={
                                            getFieldError("password")
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                                {getFieldError("password") && (
                                    <Alert className="py-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className="text-sm">
                                            {getFieldError("password")}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="rounded"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="px-0"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full ${
                                    formData.role === "student"
                                        ? "bg-blue-500"
                                        : formData.role === "faculty"
                                        ? "bg-green-500"
                                        : "bg-purple-500"
                                } hover:opacity-90 text-white transition-colors`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={onBack}
                            >
                                Back to Home
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
