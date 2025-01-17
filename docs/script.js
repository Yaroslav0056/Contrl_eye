function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  if (!name || !email || !message) {
    displayMessage(errorMessage, "Будь ласка, заповніть всі поля.");
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    displayMessage(errorMessage, "Невірна адреса електронної пошти. Перевірте формат.");
    return false;
  }

  displayMessage(successMessage, "Дякуємо! Ми отримали вашу заявку.", true);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";

  return false;
}

function displayMessage(element, message, isSuccess = false) {
  element.textContent = message;
  element.style.display = "block";

  const otherElement = isSuccess
    ? document.getElementById("error-message")
    : document.getElementById("success-message");

  otherElement.style.display = "none";

  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

