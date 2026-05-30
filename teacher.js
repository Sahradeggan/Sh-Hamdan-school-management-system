document.addEventListener("DOMContentLoaded", () => {

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

// ELEMENTS
const teacherForm = document.getElementById("teacherForm");
const teacherTableBody = document.getElementById("teacherTableBody");
const searchTeacher = document.getElementById("searchTeacher");
const teacherSubmitBtn = document.getElementById("teacherSubmitBtn");

let editIndex = null;


// SAFETY CHECK
if (!teacherForm || !teacherTableBody || !searchTeacher || !teacherSubmitBtn) {
    console.error("Teacher elements not found. Check HTML IDs or section loading.");
    return;
}


// SAVE / UPDATE
teacherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const teacher = {
        id: document.getElementById("teacherId").value,
        name: document.getElementById("teacherName").value,
        subject: document.getElementById("teacherSubject").value,
        phone: document.getElementById("teacherPhone").value,
        email: document.getElementById("teacherEmail").value,
        salary: document.getElementById("teacherSalary").value
    };

    if (editIndex === null) {
        teachers.push(teacher);
    } else {
        teachers[editIndex] = teacher;
        editIndex = null;
        teacherSubmitBtn.textContent = "Add Teacher";
    }

    localStorage.setItem("teachers", JSON.stringify(teachers));
    teacherForm.reset();
    renderTeachers();
});


// RENDER
function renderTeachers(data = teachers) {

    teacherTableBody.innerHTML = "";

    data.forEach((t, index) => {

        teacherTableBody.innerHTML += `
            <tr>
                <td>${t.id}</td>
                <td>${t.name}</td>
                <td>${t.subject}</td>
                <td>${t.phone}</td>
                <td>${t.email}</td>
                <td>${t.salary}</td>
                <td>
                    <button onclick="editTeacher(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteTeacher(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE
window.deleteTeacher = function(index) {
    teachers.splice(index, 1);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    renderTeachers();
};


// EDIT
window.editTeacher = function(index) {

    const t = teachers[index];

    document.getElementById("teacherId").value = t.id;
    document.getElementById("teacherName").value = t.name;
    document.getElementById("teacherSubject").value = t.subject;
    document.getElementById("teacherPhone").value = t.phone;
    document.getElementById("teacherEmail").value = t.email;
    document.getElementById("teacherSalary").value = t.salary;

    editIndex = index;
    teacherSubmitBtn.textContent = "Update Teacher";
};


// SEARCH
searchTeacher.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = teachers.filter(t =>
        t.name.toLowerCase().includes(value) ||
        t.id.toLowerCase().includes(value)
    );

    renderTeachers(filtered);
});


// INIT
renderTeachers();

});