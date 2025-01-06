const signUpButton = document.getElementById('signUpButton'); // Button for signing up
const signUpForm = document.getElementById('signUpForm'); // Form for signup

// Ensure elements exist before adding the event listener
if (signUpButton && signUpForm) {
    signUpButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        signUpForm.style.display = "block"; // Display the signup form
        alert("Registered successfully"); // Show alert message
    });
}