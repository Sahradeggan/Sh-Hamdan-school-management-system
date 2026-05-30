document.addEventListener("DOMContentLoaded", () => {

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

// ELEMENTS
const attendanceForm = document.getElementById("attendanceForm");
const attendanceTableBody = document.getElementById("attendanceTableBody");
const searchAttendance = document.getElementById("searchAttendance");
const attSubmitBtn = document.getElementById("attSubmitBtn");

let editIndex = null;


// SAFETY CHECK
if (!attendanceForm || !attendanceTableBody || !searchAttendance || !attSubmitBtn) {
    console.error("Attendance elements not found.");
    return;
}


// SAVE / UPDATE
attendanceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const record = {
        id: document.getElementById("attStudentId").value,
        name: document.getElementById("attStudentName").value,
        status: document.getElementById("attStatus").value,
        date: document.getElementById("attDate").value
    };

    // ADD MODE
    if (editIndex === null) {
        attendance.push(record);
    } 
    // UPDATE MODE
    else {
        attendance[editIndex] = record;
        editIndex = null;
        attSubmitBtn.textContent = "Add Attendance";
    }

    localStorage.setItem("attendance", JSON.stringify(attendance));

    attendanceForm.reset();

    renderAttendance();
});


// RENDER
function renderAttendance(data = attendance) {

    attendanceTableBody.innerHTML = "";

    data.forEach((a, index) => {

        attendanceTableBody.innerHTML += `
            <tr>
                <td>${a.id}</td>
                <td>${a.name}</td>
                <td>${a.status}</td>
                <td>${a.date}</td>
                <td>
                    <button onclick="editAttendance(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteAttendance(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE
window.deleteAttendance = function(index) {

    attendance.splice(index, 1);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    renderAttendance();
};


// EDIT
window.editAttendance = function(index) {

    const a = attendance[index];

    document.getElementById("attStudentId").value = a.id;
    document.getElementById("attStudentName").value = a.name;
    document.getElementById("attStatus").value = a.status;
    document.getElementById("attDate").value = a.date;

    editIndex = index;

    attSubmitBtn.textContent = "Update Attendance";
};


// SEARCH
searchAttendance.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = attendance.filter(a =>
        a.name.toLowerCase().includes(value) ||
        a.id.toLowerCase().includes(value)
    );

    renderAttendance(filtered);
});


// INIT
renderAttendance();

});