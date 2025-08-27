import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRXQbzPIgxajqry9JhaXsQt0GKqyH9-vw",
  authDomain: "prepaid-water-etopup.firebaseapp.com",
  projectId: "prepaid-water-etopup",
  storageBucket: "prepaid-water-etopup.appspot.com",
  messagingSenderId: "468229120952",
  appId: "1:468229120952:web:18a0a2301b80e15c55e54d",
  measurementId: "G-T219CENGQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

const signupForm   = document.querySelector('.signup-form');
const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = signupForm.fullname.value.trim();
  const email = signupForm.email.value.trim();
  const phone = signupForm.phone.value.trim();
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirm_password.value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match";
    return;
  }

  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save fullname & phone in localStorage
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);

    // Redirect with welcome message
    alert(`Account created successfully! Welcome, ${fullname}`);
    signupForm.reset();
    window.location.href = "./dashboard.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
