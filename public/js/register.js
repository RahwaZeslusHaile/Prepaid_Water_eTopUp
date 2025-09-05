// register.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase config
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
const auth = getAuth(app);

// Form & error message
const signupForm = document.querySelector(".signup-form");
const errorMessage = document.getElementById("error-message");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = signupForm.elements["name"].value.trim(); // fixed
  const email = signupForm.elements["email"].value.trim();
  const phone = signupForm.elements["phone"].value.trim();
  const password = signupForm.elements["password"].value;
  const confirmPassword = signupForm.elements["confirm_password"].value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match";
    return;
  }

  try {
    // Firebase signup
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Store user info locally (for dev purposes)
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);

    alert(`Account created successfully! Welcome, ${fullname}`);
    signupForm.reset();

    // Redirect to login
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Signup error:", error);
    const map = {
      "auth/email-already-in-use": "This email is already registered.",
      "auth/invalid-email": "Please enter a valid email.",
      "auth/weak-password": "Password should be at least 6 characters."
    };
    errorMessage.textContent = map[error.code] || error.message;
  }
});
