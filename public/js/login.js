import { auth } from "../../docs/client/firebaseConfig.js"; 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginForm = document.querySelector(".login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email_phone.value.trim();
  const password = loginForm.password.value;

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  try {
  
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

  
    const idToken = await user.getIdToken();

  
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });

    if (response.ok) {
      alert(`Welcome back, ${user.email}!`);
      window.location.href = "./dashboard.html";
    } else {
      errorMessage.textContent = "Token verification failed";
    }
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      errorMessage.textContent = "No account found with this email. Please sign up.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage.textContent = "Incorrect password. Please try again.";
    } else {
      errorMessage.textContent = error.message;
    }
  }
});
