// script.js

// Form selectors
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const togglePasswordIcons = document.querySelectorAll(".toggle-password");
const googleBtn = document.getElementById("googleLogin");
const appleBtn = document.getElementById("appleLogin");
const btnRegister = document.getElementsByClassName(".btn");

// Utils
function showMessage(container, message, isError = true) {
  const msg = document.createElement("small");
  msg.textContent = message;
  msg.style.color = isError ? "red" : "green";
  container.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

// Toggle password visibility
if (togglePasswordIcons) {
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const input = document.getElementById(icon.dataset.toggle);
      const img = icon.querySelector("img");
      if (input.type === "password") {
        input.type = "text";
        img.src = "https://img.icons8.com/small/32/visible.png";
      } else {
        input.type = "password";
        img.src = "https://img.icons8.com/small/32/invisible.png";
      }
    });
  });
}

// Registration logic
if (registerForm ) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirmPassword").value;
    const terms = document.getElementById("regTerms");

    if (!name || !email || !password ) {
      return showMessage(registerForm, "All fields are required.");
    }

    if (!validateEmail(email)) {
      return showMessage(registerForm, "Invalid email format.");
    }
    if (password.length < 6) {
      return showMessage(registerForm, "Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return showMessage(registerForm, "Passwords do not match.");
    }
    if (!terms.checked) {
      return showMessage(registerForm, "Please agree to terms.");
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    showMessage(registerForm, "Registration successful!", false);
    registerForm.reset();
    window.location.href = "welcome.html";
  });
}

// Login logic
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!email || !password) {
      return showMessage(loginForm, "Both fields are required.");
    }

    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      return showMessage(loginForm, "Invalid email or password.");
    }

    showMessage(loginForm, "Login successful!", false);
    loginForm.reset();
  });
}

// Social login handler
function handleSocialLogin() {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    alert("Logged in with: " + savedUser.email);
  } else {
    alert("Redirecting to register (no user found)");
  }
}

if (googleBtn) googleBtn.addEventListener("click", handleSocialLogin);
if (appleBtn) appleBtn.addEventListener("click", handleSocialLogin);


