// If you want to add interactivity for uploading images, you can implement it here
document.getElementById("edit-profile-btn").addEventListener("click", () => {
  const user_Name = prompt("Enter your name:", document.getElementById("username").textContent);
  const userBio = prompt("Enter your bio:", document.getElementById("user-bio").textContent);

  if (user_Name) {
    document.getElementById("username").textContent = user_Name;
  }

  if (userBio) {
    document.getElementById("user-bio").textContent = userBio;
  }
});


document.querySelector('.upload-image-btn').addEventListener('click', function() {
  alert('Uploading profile image...');
});

document.querySelector('.upload-btn').addEventListener('click', function() {
  alert('Redirecting to track upload...');
});

// Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
  alert("You have been logged out!");
  window.location.href = "login.html"; // Redirect to login page
});
