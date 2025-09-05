import { auth } from "../../docs/client/firebaseConfig.js"; 

import {onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const welcomeMsg = document.getElementById("welcome-msg");
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./login.html";
});
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const idToken = await user.getIdToken();

    const response = await fetch("http://localhost:5000/verify", {
      method: "POST", // must match server
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken })
    });

    const data = await response.json();

    if (response.ok) {
      welcomeMsg.textContent = `Welcome, ${data.email || "User"}!`;
    } else {
      welcomeMsg.textContent = "Token verification failed. Please log in again.";
    }
  } else {
    window.location.href = "./login.html";
  }
});
