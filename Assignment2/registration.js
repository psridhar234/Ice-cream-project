document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("survey");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission for now
      
      // Reset previous error messages
      const errorMessages = document.querySelectorAll(".error-message");
      errorMessages.forEach(function (error) {
        error.remove();
      });
      
      // Get form inputs
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const postcode = document.getElementById("postcode").value.trim();
      const email = document.getElementById("email").value.trim();
      const gender = document.querySelector('input[name="gender"]:checked');
      const iceCream = document.querySelectorAll('input[name="iceCream"]:checked');
      
      // Validation flags
      let isValid = true;
      
      // Validation checks
      if (username === "") {
        showError("username", "Username is required");
        isValid = false;
      }
      
      if (password === "") {
        showError("password", "Password is required");
        isValid = false;
      } else if (password.length < 9) {
        showError("password", "Password must be at least 9 characters long");
        isValid = false;
      }
      
      if (postcode === "") {
        showError("postcode", "Postcode is required");
        isValid = false;
      } else if (!/^\d{4}$/.test(postcode)) {
        showError("postcode", "Postcode must be a 4-digit number");
        isValid = false;
      }
      
      if (email === "") {
        showError("email", "Email is required");
        isValid = false;
      }
      
      if (!gender) {
        showError("gender", "Gender is required");
        isValid = false;
      }
      
      if (iceCream.length === 0) {
        showError("iceCream", "Please select at least one favorite ice cream");
        isValid = false;
      }
      
      // If all inputs are valid, submit the form
      if (isValid) {
        alert("Form submitted successfully!");
        form.submit();
      }
    });
    
    // Function to display error messages inline
    function showError(field, message) {
      const inputField = document.getElementById(field);
      const errorMessage = document.createElement("span");
      errorMessage.className = "error-message";
      errorMessage.textContent = message;
      inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
    }
  });