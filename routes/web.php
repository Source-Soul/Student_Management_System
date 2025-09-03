<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing page
Route::get('/', function () {
    return Inertia::render('LandingPage');
});

// ---------------------
// Student routes
// ---------------------
Route::prefix('student')->group(function () {
    Route::get('profile', fn() => Inertia::render('StudentProfile'));
    Route::get('my-courses', fn() => Inertia::render('MyCourses'));
    Route::get('enrollment', fn() => Inertia::render('CourseEnrollment'));
    Route::get('attendance', fn() => Inertia::render('AttendanceTracking'));
    Route::get('schedule', fn() => Inertia::render('ClassRoutine'));
    Route::get('notifications', fn() => Inertia::render('StudentNotification'));
    Route::get('grades', fn() => Inertia::render('StudentResult'));
    Route::get('feedback', fn() => Inertia::render('CourseFeedback'));
});

// ---------------------
// Admin routes
// ---------------------
Route::prefix('admin')->group(function () {
    Route::get('dashboard', fn() => Inertia::render('AdminDashboard'));
    Route::get('faculty-management', fn() => Inertia::render('FacultyManagement'));
    Route::get('student-records', fn() => Inertia::render('StudentRecords'));
    Route::get('approvals', fn() => Inertia::render('ApprovalsManagement'));
});

// ---------------------
// Faculty routes
// ---------------------
Route::prefix('faculty')->group(function () {
    Route::get('dashboard', fn() => Inertia::render('faculty/FacultyDashboard'));
    Route::get('schedule', fn() => Inertia::render('faculty/FacultySchedule'));
    Route::get('attendance', fn() => Inertia::render('faculty/FacultyAttendance'));
    Route::get('grades', fn() => Inertia::render('faculty/FacultyGrades'));
    Route::get('feedback', fn() => Inertia::render('faculty/FacultyFeedback'));
    Route::get('profile', fn() => Inertia::render('faculty/FacultyProfile'));
    Route::get('teaching-assistants', fn() => Inertia::render('faculty/TeachingAssistants'));
});
