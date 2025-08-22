import express from "express";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // serve index.html + signup.html etc. from /public

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Routes for signup, login, reset

// ✅ Signup (with name + phone)
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save extra user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      phone,
      createdAt: new Date().toISOString()
    });

    res.json({ message: "Signup successful", user: { uid: user.uid, email, name, phone } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    res.json({ message: "Login successful", user: { uid: user.uid, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Reset password
app.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(auth, email);
    res.json({ message: "Password reset email sent" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
