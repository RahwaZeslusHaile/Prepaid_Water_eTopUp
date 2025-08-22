import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

const signupForm   = document.querySelector('.signup-form');
const errorMessage = document.getElementById('error-message')

signupForm.addEventListener('submit',async(e)=>{
    e.preventDefault()
 const name = signupForm.name.value;
  const email = signupForm.email.value;
  const phone = signupForm.phone.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirm_password.value;
  if(password !== confirmPassword){
    errorMessage.textContent = "passwords do not match"
    return 
  }

  try{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user
    alert(`account created successfully! Welcome,${name}`);
    signupForm.reset();
    window.location.href = "./dashboard.html"
  }
  catch(error){
    errorMessage.textContent = error.message;
  }
})

