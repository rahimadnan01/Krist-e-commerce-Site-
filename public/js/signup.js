const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  // password logic
  const password = document.querySelector("#password").value;
  console.log(password);
  if (password.length < 8) {
    alert("Password must have 8 characters");
  }
  const response = await fetch("/api/v1/auth/register", {
    method: "POST",
    body: formData,
  });

  try {
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      let url = data.data.redirectUrl;
      if (url) {
        window.location.href = url;
        alert("Signup completed");
      } else {
        alert("User created successfully");
      }
    } else {
      alert("Please Enter all fields");
    }
  } catch (error) {
    console.log(error);
  }
});
