// const form = document.getElementById('form')
// const firstname_input = document.getElementById('firstname-input')
// const email_input = document.getElementById('email-input')
// const password_input = document.getElementById('password-input')
// const repeat_password_input = document.getElementById('repeat-password-input')
// const error_message = document.getElementById('error-message')

// form.addEventListener('submit', (e) => {
//   let errors = []

//   if(firstname_input){
//     // If we have a firstname input then we are in the signup
//     errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
//   }
//   else{
//     // If we don't have a firstname input then we are in the login
//     errors = getLoginFormErrors(email_input.value, password_input.value)
//   }

//   if(errors.length > 0){
//     // If there are any errors
//     e.preventDefault()
//     error_message.innerText  = errors.join(". ")
//   }
// })

// function getSignupFormErrors(firstname, email, password, repeatPassword){
//   let errors = []

//   if(firstname === '' || firstname == null){
//     errors.push('Firstname is required')
//     firstname_input.parentElement.classList.add('incorrect')
//   }
//   if(email === '' || email == null){
//     errors.push('Email is required')
//     email_input.parentElement.classList.add('incorrect')
//   }
//   if(password === '' || password == null){
//     errors.push('Password is required')
//     password_input.parentElement.classList.add('incorrect')
//   }
//   if(password.length < 8){
//     errors.push('Password must have at least 8 characters')
//     password_input.parentElement.classList.add('incorrect')
//   }
//   if(password !== repeatPassword){
//     errors.push('Password does not match repeated password')
//     password_input.parentElement.classList.add('incorrect')
//     repeat_password_input.parentElement.classList.add('incorrect')
//   }


//   return errors;
// }

// function getLoginFormErrors(email, password){
//   let errors = []

//   if(email === '' || email == null){
//     errors.push('Email is required')
//     email_input.parentElement.classList.add('incorrect')
//   }
//   if(password === '' || password == null){
//     errors.push('Password is required')
//     password_input.parentElement.classList.add('incorrect')
//   }

//   return errors;
// }

// const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

// allInputs.forEach(input => {
//   input.addEventListener('input', () => {
//     if(input.parentElement.classList.contains('incorrect')){
//       input.parentElement.classList.remove('incorrect')
//       error_message.innerText = ''
//     }
//   })
// })
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstname = document.getElementById("firstname-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();
  const repeatPassword = document.getElementById("repeat-password-input").value.trim();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regex (at least 8 characters, including a number and a special character)
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  // Check for empty fields
  if (!firstname || !email || !password || !repeatPassword) {
    Swal.fire({
      icon: "error",
      title: "All fields are required!",
      text: "Please fill out all the fields.",
    });
    return;
  }

  // Validate email
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email!",
      text: "Please enter a valid email address.",
    });
    return;
  }

  // Validate password
  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Weak Password!",
      text: "Password must be at least 8 characters long and include a number and a special character.",
    });
    return;
  }

  // Check if passwords match
  if (password !== repeatPassword) {
    Swal.fire({
      icon: "error",
      title: "Passwords Do Not Match!",
      text: "Please ensure both password fields match.",
    });
    return;
  }

  // Check for existing users
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    Swal.fire({
      icon: "error",
      title: "Account Already Exists!",
      text: "An account with this email already exists. Please log in.",
    });
    return;
  }

  // Save user to localStorage
  users.push({ firstname, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  // Success message and redirect
  Swal.fire({
    icon: "success",
    title: "Signup Successful!",
    text: "Your account has been created. Redirecting to Hero page...",
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "hero.html";
  });
});
// Add event listener to the form submission
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the email and password input values
  const email = document.getElementById("email-input").value.trim();
  const password = document.getElementById("password-input").value.trim();

  // Check for empty fields
  if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Missing Fields!",
      text: "Please fill out both email and password fields.",
    });
    return;
  }

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user with matching email and password
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    // If user doesn't exist or credentials are incorrect
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials!",
      text: "Email or password is incorrect. Please try again.",
    });
  } else {
    // If login is successful
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: `Welcome, ${user.firstname || "User"}! Redirecting to Hero page...`,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      // Redirect to hero.html after login success
      window.location.href = "hero.html";
    });
  }
});
