// LOGIN PROTECTION

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href = "index.html";

}



// SIDEBAR NAVIGATION

const menuItems = document.querySelectorAll(".menu li[data-section]");

const sections = document.querySelectorAll(".content-section");


menuItems.forEach(item => {

    item.addEventListener("click", ()=>{

        const target = item.dataset.section;


        // REMOVE ACTIVE MENU

        menuItems.forEach(li=>{
            li.classList.remove("active");
        });


        item.classList.add("active");


        // HIDE ALL SECTIONS

        sections.forEach(section=>{
            section.classList.remove("active");
        });


        // SHOW TARGET SECTION

        document
            .getElementById(target)
            .classList.add("active");

    });

});



// LOGOUT

const logoutBtn = document.getElementById("logoutBtn");


logoutBtn.addEventListener("click", ()=>{

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

});