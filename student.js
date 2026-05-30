let students = JSON.parse(localStorage.getItem("students")) || [];

// ELEMENTS
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchStudent");
const submitBtn = document.getElementById("submitBtn");

let editIndex = null;


// SAVE / UPDATE STUDENT
studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        id: document.getElementById("studentId").value,
        name: document.getElementById("studentName").value,
        age: document.getElementById("studentAge").value,
        gender: document.getElementById("studentGender").value,
        className: document.getElementById("studentClass").value,
        phone: document.getElementById("studentPhone").value,
        parent: document.getElementById("studentParent").value,
        address: document.getElementById("studentAddress").value
    };

    // ADD MODE
    if (editIndex === null) {
        students.push(student);
    } 
    // UPDATE MODE
    else {
        students[editIndex] = student;
        editIndex = null;
        submitBtn.textContent = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));

    studentForm.reset();

    renderStudents();
});


// RENDER STUDENTS TABLE
function renderStudents(data = students) {

    studentTableBody.innerHTML = "";

    data.forEach((student, index) => {

        studentTableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.gender}</td>
                <td>${student.className}</td>
                <td>${student.phone}</td>
                <td>${student.parent}</td>
                <td>${student.address}</td>
                <td>
                    <button onclick="editStudent(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteStudent(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE STUDENT
function deleteStudent(index) {

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    renderStudents();
}


// EDIT STUDENT
function editStudent(index) {

    const student = students[index];

    document.getElementById("studentId").value = student.id;
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentAge").value = student.age;
    document.getElementById("studentGender").value = student.gender;
    document.getElementById("studentClass").value = student.className;
    document.getElementById("studentPhone").value = student.phone;
    document.getElementById("studentParent").value = student.parent;
    document.getElementById("studentAddress").value = student.address;

    editIndex = index;

    submitBtn.textContent = "Update Student";
}


// SEARCH STUDENT
searchInput.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(value) ||
        student.id.toLowerCase().includes(value)
    );

    renderStudents(filtered);
});


// INITIAL LOAD
renderStudents();