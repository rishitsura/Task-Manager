// login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const usernamePattern = /^[A-Za-z_][A-Za-z0-9_.]{4,11}$/;
    const isUsernameValid = usernamePattern.test(usernameInput.value);

    const isPasswordValid =
      passwordInput.value.length >= 4 && passwordInput.value.length <= 12;

    if (!isUsernameValid || !isPasswordValid) {
      alert(
        "Invalid username or password format. Please check the requirements."
      );
      return;
    }

    if (usernameInput.value && passwordInput.value) {
      localStorage.setItem("username", usernameInput.value);

      window.location.href = "main.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  });
});
