import { auth } from "../../docs/client/firebaseConfig.js"; 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const signupForm = document.querySelector(".signup-form");
const errorMessage = document.getElementById("error-message");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = signupForm.name.value.trim();
  const email = signupForm.email.value.trim();
  const phone = signupForm.phone.value.trim();
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirm_password.value;

  if (name.length < 3) {
    errorMessage.textContent = "Name must be at least 3 characters long.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match";
    return;
  }

  try {
  console.log("Creating user with:", email, password);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log("User created:", user);

  const idToken = await user.getIdToken();
  console.log("Got ID token:", idToken);

  const response = await fetch("http://localhost:5000/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });

  console.log("Backend response status:", response.status);
  const data = await response.json();
  console.log("Backend response data:", data);

  if (response.ok) {
    alert(`Account created successfully! Welcome, ${name}`);
    window.location.href = "./dashboard.html";
  } else {
    errorMessage.textContent = "Token verification failed";
  }

  signupForm.reset();
} catch (error) {
  console.error("Signup error:", error);
  if (error.code === "auth/email-already-in-use") {
    errorMessage.textContent = "This email is already registered. Please login instead.";
  } else {
    errorMessage.textContent = error.message;
  }
}
});
