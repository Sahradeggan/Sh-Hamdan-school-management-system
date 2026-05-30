document.addEventListener("DOMContentLoaded", () => {

let fees = JSON.parse(localStorage.getItem("fees")) || [];

// ELEMENTS
const feeForm = document.getElementById("feeForm");
const feeTableBody = document.getElementById("feeTableBody");
const searchFee = document.getElementById("searchFee");
const feeSubmitBtn = document.getElementById("feeSubmitBtn");

let editIndex = null;


// SAFETY CHECK
if (!feeForm || !feeTableBody || !searchFee || !feeSubmitBtn) {
    console.error("Fee elements not found.");
    return;
}


// SAVE / UPDATE
feeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fee = {
        id: document.getElementById("feeStudentId").value,
        name: document.getElementById("feeStudentName").value,
        total: document.getElementById("feeAmount").value,
        paid: document.getElementById("feePaid").value,
        balance: document.getElementById("feeBalance").value,
        date: document.getElementById("feeDate").value
    };

    // ADD MODE
    if (editIndex === null) {
        fees.push(fee);
    } 
    // UPDATE MODE
    else {
        fees[editIndex] = fee;
        editIndex = null;
        feeSubmitBtn.textContent = "Add Fee";
    }

    localStorage.setItem("fees", JSON.stringify(fees));

    feeForm.reset();

    renderFees();
});


// RENDER TABLE
function renderFees(data = fees) {

    feeTableBody.innerHTML = "";

    data.forEach((f, index) => {

        feeTableBody.innerHTML += `
            <tr>
                <td>${f.id}</td>
                <td>${f.name}</td>
                <td>${f.total}</td>
                <td>${f.paid}</td>
                <td>${f.balance}</td>
                <td>${f.date}</td>
                <td>
                    <button onclick="editFee(${index})" class="btn-edit">Edit</button>
                    <button onclick="deleteFee(${index})" class="btn-delete">Delete</button>
                </td>
            </tr>
        `;
    });
}


// DELETE
window.deleteFee = function(index) {

    fees.splice(index, 1);

    localStorage.setItem("fees", JSON.stringify(fees));

    renderFees();
};


// EDIT
window.editFee = function(index) {

    const f = fees[index];

    document.getElementById("feeStudentId").value = f.id;
    document.getElementById("feeStudentName").value = f.name;
    document.getElementById("feeAmount").value = f.total;
    document.getElementById("feePaid").value = f.paid;
    document.getElementById("feeBalance").value = f.balance;
    document.getElementById("feeDate").value = f.date;

    editIndex = index;

    feeSubmitBtn.textContent = "Update Fee";
};


// SEARCH
searchFee.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = fees.filter(f =>
        f.name.toLowerCase().includes(value) ||
        f.id.toLowerCase().includes(value)
    );

    renderFees(filtered);
});


// INIT
renderFees();

});