import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRXQbzPIgxajqry9JhaXsQt0GKqyH9-vw",
  authDomain: "prepaid-water-etopup.firebaseapp.com",
  projectId: "prepaid-water-etopup",
  storageBucket: "prepaid-water-etopup.firebasestorage.app",
  messagingSenderId: "468229120952",
  appId: "1:468229120952:web:18a0a2301b80e15c55e54d",
  measurementId: "G-T219CENGQ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const welcomeMsg = document.getElementById('welcome-msg');

onAuthStateChanged(auth, (user) => {
  if (user) {
    welcomeMsg.textContent = `Welcome, ${user.email}`;
  } else {
    window.location.href = './index.html';
  }
});

const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = './index.html';
});
