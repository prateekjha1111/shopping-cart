
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const goToLogin = document.getElementById('go-to-login');
const goToSignup = document.getElementById('go-to-signup');

goToLogin.addEventListener('click', () => {
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});

goToSignup.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

// Sign up form
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  };

  // user data
  const userData = { name, email, password };

  // save to local storage
  localStorage.setItem('data', JSON.stringify(userData));
  // registration done
  alert('Registration successful! Please log in.');
    registerForm.reset();

  // log in now
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
});

// Log in form   
const loginFormContent = document.getElementById('login-form-content');

loginFormContent.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const loginPassword = document.getElementById('login-password').value.trim();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('data'));
  console.log(userData);

  if (!userData || userData.password !== loginPassword) {
    alert('Invalid email or password!');
    return;
 }
  alert(`Welcome, ${userData.name}! Redirecting to products...`);

 window.location.href = 'products.html';
});