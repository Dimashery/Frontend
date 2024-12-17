// Toggle Password Visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});

// Redirect to Home Page on Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
      // Optionally, you can add validation logic here
      window.location.href = "../../Home/html/home.html"; // Redirect to the home page
  } else {
      alert("Please fill in all fields!");
  }
});
