
import dotenv from "dotenv";
dotenv.config();

import { firebaseConfig ,auth} from "./services/firebaseConfig.js";

console.log(process.env.FIREBASE_API_KEY);
console.log(firebaseConfig);
console.log("API Key:", process.env.FIREBASE_API_KEY); 
