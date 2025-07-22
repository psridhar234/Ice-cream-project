document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey");
  const errorBox = document.getElementById("errorBox");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for now

    // Reset previous error messages
    errorBox.style.display = "none";
    errorBox.innerHTML = "";

    // Get form inputs
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
    const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
    const billingAddress = document.getElementById("Address").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const creditCardNumber = document.getElementById("creditCardNumber").value.trim();

    // Validation flags
    let isValid = true;

    // Check for empty fields and conditions
    if (!deliveryMethod) {
      showError("Delivery or Pickup selection is required");
      isValid = false;
    } else if (deliveryMethod.value === "delivery" && deliveryAddress === "") {
      showError("Delivery Address is required for delivery option");
      isValid = false;
    }

    if (billingAddress === "") {
      showError("Billing Address is required");
      isValid = false;
    }

    if (contactNumber === "") {
      showError("Contact Number is required");
      isValid = false;
    }

    if (email === "") {
      showError("Email is required");
      isValid = false;
    }

    if (!paymentMethod) {
      showError("Payment Method selection is required");
      isValid = false;
    } else if (paymentMethod.value === "payOnline" && creditCardNumber === "") {
      showError("Credit Card Number is required for online payment");
      isValid = false;
    }

    // If all inputs are valid, submit the form
    if (isValid) {
      form.submit();
    }
  });

  // Function to display error messages
  function showError(message) {
    errorBox.style.display = "block";
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message"); // Add class for styling
    errorBox.appendChild(errorMessage);
  }
});
  