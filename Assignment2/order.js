document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("survey");
  const errorBox = document.getElementById("errorBox");
  const deliveryAddress = document.getElementById("deliveryAddress");
  const billingAddress = document.getElementById("Address");
  const sameAsDeliveryCheckbox = document.getElementById("sameAsDelivery");
  const creditCardType = document.getElementById("creditCardType");
  const creditCardNumber = document.getElementById("creditCardNumber");
  const deliveryMethodInputs = document.querySelectorAll('input[name="deliveryMethod"]');
  const deliveryAddressSection = document.getElementById("deliveryAddressSection");

  deliveryMethodInputs.forEach(input => {
    input.addEventListener("change", function () {
      if (this.value === "delivery") {
        deliveryAddressSection.style.display = "block";
      } else {
        deliveryAddressSection.style.display = "none";
        deliveryAddress.value = "";
      }
    });
  });

  sameAsDeliveryCheckbox.addEventListener("change", function () {
    if (sameAsDeliveryCheckbox.checked) {
      if (deliveryAddress.value.trim() === "") {
        alert("Please enter your delivery address first");
        sameAsDeliveryCheckbox.checked = false;
      } else {
        billingAddress.value = deliveryAddress.value;
      }
    } else {
      billingAddress.value = "";
    }
  });

  creditCardType.addEventListener("change", function () {
    if (creditCardType.value === "amex") {
      creditCardNumber.maxLength = 15;
    } else {
      creditCardNumber.maxLength = 16;
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for now

    // Reset previous error messages
    errorBox.style.display = "none";
    errorBox.innerHTML = "";

    // Get form inputs
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
    const deliveryAddressValue = deliveryAddress.value.trim();
    const billingAddressValue = billingAddress.value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const creditCardTypeValue = creditCardType.value;
    const creditCardNumberValue = creditCardNumber.value.trim();

    // Validation flags
    let isValid = true;

    // Check for empty fields and conditions
    if (!deliveryMethod) {
      showError("Delivery or Pickup selection is required");
      isValid = false;
    } else if (deliveryMethod.value === "delivery" && deliveryAddressValue === "") {
      showError("Delivery Address is required for delivery option");
      isValid = false;
    }

    if (billingAddressValue === "") {
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
    } else if (paymentMethod.value === "payOnline") {
      if (creditCardTypeValue === "") {
        showError("Credit Card Type is required for online payment");
        isValid = false;
      } else if (creditCardNumberValue === "") {
        showError("Credit Card Number is required for online payment");
        isValid = false;
      } else if ((creditCardTypeValue === "visa" || creditCardTypeValue === "mastercard") && creditCardNumberValue.length !== 16) {
        showError("Visa and MasterCard numbers must be 16 digits long");
        isValid = false;
      } else if (creditCardTypeValue === "amex" && creditCardNumberValue.length !== 15) {
        showError("American Express numbers must be 15 digits long");
        isValid = false;
      }
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