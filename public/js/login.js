const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  let response = await fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });

  try {
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      if (data) {
        let url = data.message.redirectUrl;
        console.log(url);
        window.location.href = url;
      }
    } else {
      alert("login failed please Enter Correct Data");
    }
  } catch (error) {
    console.log(error);
  }
});
