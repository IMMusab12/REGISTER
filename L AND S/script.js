const authContainer = document.getElementById("auth-container");
const authButton = document.getElementById("auth-button");
const toggleAuth = document.getElementById("switch-auth");
const formTitle = document.getElementById("form-title");
let isLogin = true;

// Switch between Login and Signup
toggleAuth.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Signup";
  authButton.textContent = isLogin ? "Login" : "Signup";
  toggleAuth.textContent = isLogin
    ? "Don't have an account? Signup"
    : "Already have an account? Login";
});

// Authentication Logic
authButton.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (isLogin) {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      alert("Login successful!");
      // Redirect to hero.html after successful login
      window.location.href = "hero.html";
    } else {
      alert("Invalid credentials. Please try again.");
    }
  } else {
    if (localStorage.getItem(username)) {
      alert("User already exists. Please login.");
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      alert("Signup successful! You can now login.");
      isLogin = true;
      toggleAuth.click();
    }
  }
});
