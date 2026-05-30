const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const errorMessage = document.getElementById("errorMessage");


// SHOW / HIDE PASSWORD

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.classList.remove("bx-hide");
        togglePassword.classList.add("bx-show");

    }else{

        password.type = "password";

        togglePassword.classList.remove("bx-show");
        togglePassword.classList.add("bx-hide");

    }

});


// LOGIN VALIDATION

loginForm.addEventListener("submit", (e)=>{

    e.preventDefault();

    const user = username.value.trim();
    const pass = password.value.trim();


    if(user === "" || pass === ""){

        errorMessage.textContent = "Please fill all fields.";

        return;
    }


    if(user === "admin" && pass === "12345"){

        localStorage.setItem("loggedIn","true");

        window.location.href = "dashboard.html";

    }else{

        errorMessage.textContent = "Invalid username or password.";

    }

});