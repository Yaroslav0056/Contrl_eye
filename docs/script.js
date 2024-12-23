function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var errorMessage = document.getElementById("error-message");
  var successMessage = document.getElementById("success-message");

  if (name === "" || email === "" || message === "") {
    errorMessage.textContent = "Будь ласка, заповніть всі поля.";
    errorMessage.style.display = "block";
    successMessage.style.display = "none";
    setTimeout(function () {
      errorMessage.style.display = "none";
    }, 5000);
    return false;
  }

  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent =
      "Невірна адреса електронної пошти. Перевірте формат.";
    errorMessage.style.display = "block";
    successMessage.style.display = "none";
    setTimeout(function () {
      errorMessage.style.display = "none";
    }, 5000);
    return false;
  }

  successMessage.textContent = "Форма надіслана успішно!";
  successMessage.style.display = "block";
  errorMessage.style.display = "none";

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  setTimeout(function () {
    successMessage.style.display = "none";
  }, 5000);

  return false;
}
