// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ match fixed HTML (name="email" and name="password")
    const email = loginForm.elements["email"].value.trim();
    const password = loginForm.elements["password"].value;

    if (!email || !email.includes("@")) {
      errorMessage.textContent = "Please sign in with a valid email address.";
      return;
    }

    try {
      // ✅ Firebase login
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Store email in localStorage for dashboard access
      localStorage.setItem("email", user.email || "");

      // Optional: personalize welcome
      alert(`Welcome back, ${user.displayName || user.email}!`);

      // Redirect to dashboard
      window.location.href = "./dashboard.html";
    } catch (err) {
      console.error("Login error:", err);

      // Friendlier error messages
      const map = {
        "auth/invalid-email": "The email address is badly formatted.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Network error. Check your connection."
      };

      errorMessage.textContent = map[err.code] || "Login failed. Please try again.";
    }
  });
});
