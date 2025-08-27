import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRXQbzPIgxajqry9JhaXsQt0GKqyH9-vw",
  authDomain: "prepaid-water-etopup.firebaseapp.com",
  projectId: "prepaid-water-etopup",
  storageBucket: "prepaid-water-etopup.appspot.com",
  messagingSenderId: "468229120952",
  appId: "1:468229120952:web:18a0a2301b80e15c55e54d",
  measurementId: "G-T219CENGQ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elements
const welcomeEl = document.getElementById("welcome");
const meterList = document.getElementById("meter-list");
const transactionList = document.getElementById("transaction-list");
const logoutBtn = document.getElementById("logout-btn");
const addMeterBtn = document.getElementById("add-meter-btn");

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Show welcome with user email
    welcomeEl.textContent = `Welcome back, ${user.name}`;

    // Dashboard starts empty
    meterList.innerHTML = "<li>No meters yet. Click 'Add Meter' to get started.</li>";
    transactionList.innerHTML = "<li>No transactions yet.</li>";
  } else {
    // If no user, redirect to login
    window.location.href = "./index.html";
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "./index.html";
});

// Add meter (temporary demo only, later connect to Firestore)
addMeterBtn.addEventListener("click", () => {
  meterList.innerHTML = "";
  const li = document.createElement("li");
  li.textContent = "Demo Meter - Balance: R 0.00";
  meterList.appendChild(li);
});
