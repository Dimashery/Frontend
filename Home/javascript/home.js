// Pilih tombol Login dan Get Started
const loginButton = document.querySelector('.login-btn');
const getStartedButton = document.querySelector('.get-started-btn');

// Tambahkan event listener untuk tombol Login
loginButton.addEventListener('click', () => {
  // Redirect ke halaman login
  window.location.href = '../../Login/html/login.html'; // Ganti dengan path halaman login yang sesuai
});

// Tambahkan event listener untuk tombol Get Started
getStartedButton.addEventListener('click', () => {
  // Redirect ke halaman Get Started
  window.location.href = '../../whats_new/html/whats_new.html'; // Ganti dengan path halaman Get Started yang sesuai
});

