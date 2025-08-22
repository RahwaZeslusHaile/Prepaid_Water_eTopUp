// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector(".signup-form");
  const errorMessage = document.getElementById("error-message");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop form from reloading page

      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const phone = signupForm.phone.value.trim();
      const password = signupForm.password.value;
      const confirmPassword = signupForm.confirm_password.value;

      // Validation
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
      }

      try {
        const res = await fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message || "Signup successful!");
          window.location.href = "./index.html"; // redirect to login
        } else {
          errorMessage.textContent = data.error || "Signup failed.";
        }
      } catch (err) {
        console.error("Signup error:", err);
        errorMessage.textContent = "Something went wrong. Try again.";
      }
    });
  }
});
