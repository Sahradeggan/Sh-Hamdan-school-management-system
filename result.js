document.addEventListener("DOMContentLoaded", () => {

let results = JSON.parse(localStorage.getItem("results")) || [];

// ELEMENTS
const resultForm = document.getElementById("resultForm");
const resultTableBody = document.getElementById("resultTableBody");
const searchResult = document.getElementById("searchResult");
const resultSubmitBtn = document.getElementById("resultSubmitBtn");

let editIndex = null;


// SAFETY CHECK
if (!resultForm || !resultTableBody || !searchResult || !resultSubmitBtn) {
    console.error("Result elements not found.");
    return;
}


// SAVE / UPDATE
resultForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const result = {
        id: document.getElementById("resultStudentId").value,
        name: document.getElementById("resultStudentName").value,
        subject: document.getElementById("resultSubject").value,
        marks: document.getElementById("resultMarks").value,
        grade: document.getElementById("resultGrade").value,
        exam: document.getElementById("resultExam").value
    };

    // ADD MODE
    if (editIndex === null) {
        results.push(result);
    } 
    // UPDATE MODE
    else {
        results[editIndex] = result;
        editIndex = null;
        resultSubmitBtn.textContent = "Add Result";
    }

    localStorage.setItem("results", JSON.stringify(results));

    resultForm.reset();

    renderResults();
});


// RENDER TABLE
function renderResults(data = results) {

    resultTableBody.innerHTML = "";

    data.forEach((r, index) => {

        resultTableBody.innerHTML += `
            <tr>
                <td>${r.id}</td>
                <td>${r.name}</td>
                <td>${r.subject}</td>
                <td>${r.marks}</td>
                <td>${r.grade}</td>
                <td>${r.exam}</td>
                <td>
                    <button onclick="editResult(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteResult(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE
window.deleteResult = function(index) {

    results.splice(index, 1);

    localStorage.setItem("results", JSON.stringify(results));

    renderResults();
};


// EDIT
window.editResult = function(index) {

    const r = results[index];

    document.getElementById("resultStudentId").value = r.id;
    document.getElementById("resultStudentName").value = r.name;
    document.getElementById("resultSubject").value = r.subject;
    document.getElementById("resultMarks").value = r.marks;
    document.getElementById("resultGrade").value = r.grade;
    document.getElementById("resultExam").value = r.exam;

    editIndex = index;

    resultSubmitBtn.textContent = "Update Result";
};


// SEARCH
searchResult.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = results.filter(r =>
        r.name.toLowerCase().includes(value) ||
        r.id.toLowerCase().includes(value)
    );

    renderResults(filtered);
});


// INIT
renderResults();

});