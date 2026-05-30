document.addEventListener("DOMContentLoaded", () => {

function updateStats() {

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const results = JSON.parse(localStorage.getItem("results")) || [];
    const fees = JSON.parse(localStorage.getItem("fees")) || [];

    // UPDATE UI
    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("totalTeachers").innerText = teachers.length;
    document.getElementById("totalClasses").innerText = classes.length;
    document.getElementById("totalAttendance").innerText = attendance.length;
    document.getElementById("totalResults").innerText = results.length;
    document.getElementById("totalFees").innerText = fees.length;
}


// RUN ON LOAD
updateStats();


// AUTO REFRESH (LIVE SYSTEM)
setInterval(updateStats, 1000);

});