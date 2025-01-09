const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signupForm);
  const response = await fetch("/api/v1/users/register", {
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
