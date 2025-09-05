import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authAdmin } from "./services/firebaseAdmin.js"; 

dotenv.config();

const app = express();

app.use(cors());            
app.use(express.json());    

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});


app.post("/verify", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decodedToken = await authAdmin.verifyIdToken(idToken);

    res.json({
      message: "Token valid!",
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || null,
      phone_number: decodedToken.phone_number || null
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid token", details: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
