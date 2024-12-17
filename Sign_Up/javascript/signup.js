// Toggle visibility for "New Password"
document.getElementById("toggleNewPassword").addEventListener("click", function () {
  const passwordField = document.getElementById("newPassword");
  passwordField.type = passwordField.type === "password" ? "text" : "password";
});

// Toggle visibility for "Confirm Password"
document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
  const confirmPasswordField = document.getElementById("confirmPassword");
  confirmPasswordField.type = confirmPasswordField.type === "password" ? "text" : "password";
});

// Validate and redirect on Sign Up
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password validation
  const passwordRegex = /^(?=.*[~*!@#$%^&()_\-+=]).{12,}$/;

  if (!passwordRegex.test(newPassword)) {
      alert("Password must be at least 12 characters and include symbols (e.g., ~, *)");
      return;
  }

  if (newPassword !== confirmPassword) {
      alert("Passwords do not match. Please confirm your password correctly.");
      return;
  }

  // Redirect to Login page if validation is successful
  alert("Sign Up Successful! Redirecting to login page...");
  window.location.href = "../../Login/html/login.html";
});
