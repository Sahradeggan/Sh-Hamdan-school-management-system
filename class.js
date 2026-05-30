document.addEventListener("DOMContentLoaded", () => {

let classes = JSON.parse(localStorage.getItem("classes")) || [];

// ELEMENTS
const classForm = document.getElementById("classForm");
const classTableBody = document.getElementById("classTableBody");
const searchClass = document.getElementById("searchClass");
const classSubmitBtn = document.getElementById("classSubmitBtn");

let editIndex = null;


// SAFETY CHECK
if (!classForm || !classTableBody || !searchClass || !classSubmitBtn) {
    console.error("Class elements not found.");
    return;
}


// SAVE / UPDATE
classForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const classItem = {
        id: document.getElementById("classId").value,
        name: document.getElementById("className").value,
        subject: document.getElementById("classSubject").value,
        teacher: document.getElementById("classTeacher").value
    };

    if (editIndex === null) {
        classes.push(classItem);
    } else {
        classes[editIndex] = classItem;
        editIndex = null;
        classSubmitBtn.textContent = "Add Class";
    }

    localStorage.setItem("classes", JSON.stringify(classes));

    classForm.reset();

    renderClasses();
});


// RENDER
function renderClasses(data = classes) {

    classTableBody.innerHTML = "";

    data.forEach((c, index) => {

        classTableBody.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.subject}</td>
                <td>${c.teacher}</td>
                <td>
                    <button onclick="editClass(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteClass(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE
window.deleteClass = function(index) {

    classes.splice(index, 1);

    localStorage.setItem("classes", JSON.stringify(classes));

    renderClasses();
};


// EDIT
window.editClass = function(index) {

    const c = classes[index];

    document.getElementById("classId").value = c.id;
    document.getElementById("className").value = c.name;
    document.getElementById("classSubject").value = c.subject;
    document.getElementById("classTeacher").value = c.teacher;

    editIndex = index;

    classSubmitBtn.textContent = "Update Class";
};


// SEARCH
searchClass.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = classes.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.id.toLowerCase().includes(value)
    );

    renderClasses(filtered);
});


// INIT
renderClasses();

});