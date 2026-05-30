const adminBtn =
document.getElementById("adminProfileBtn");

const modal =
document.getElementById("profileModal");

const closeBtn =
document.getElementById("closeProfile");


adminBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});


closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});