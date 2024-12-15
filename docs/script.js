function toggleAnonymousFields() {
  const isAnonymous = document.getElementById("anonymous").checked;
  const usernameField = document.getElementById("username");
  const emailField = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const usernameError = document.getElementById("username-error");

  console.log("toggleAnonymousFields викликано!"); 

  if (isAnonymous) {
    console.log("Анонімно: сховати поля"); 
    usernameField.style.display = "none";
    emailField.style.display = "none";
    emailError.style.display = "none";
    usernameError.style.display = "none"; 
  } else {
    console.log("Не анонімно: показати поля"); 
    usernameField.style.display = "block";
    emailField.style.display = "block";
  }
}

function submitFeedback() {
  const feedback = document.getElementById("feedback").value.trim();
  const isAnonymous = document.getElementById("anonymous").checked;
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();

  const feedbackError = document.getElementById("feedback-error");
  const emailError = document.getElementById("email-error");
  const usernameError = document.getElementById("username-error");

  feedbackError.style.display = "none";
  emailError.style.display = "none";
  usernameError.style.display = "none";

  if (!feedback) {
    feedbackError.style.display = "block";
    return;
  }

  if (!isAnonymous) {
    if (!username) {
      usernameError.style.display = "block";
      return;
    }

    if (!email) {
      emailError.style.display = "block";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailPattern.test(email)) {
      emailError.style.display = "block";
      return;
    }
  }

  document.getElementById("thank-you").style.display = "block";

  document.getElementById("feedback").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  document.getElementById("anonymous").checked = false;

  toggleAnonymousFields(); 
}
