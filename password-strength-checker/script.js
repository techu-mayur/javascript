document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const strengthBar = document.getElementById("strength-bar");
  const strengthText = document.getElementById("strength-text");
  const strengthEmoji = document.getElementById("strength-emoji");
  // Checklist elements
  const charLength = document.getElementById("char-length");
  const uppercase = document.getElementById("uppercase");
  const numeric = document.getElementById("numeric");
  const specialChar = document.getElementById("special-char");
  const noAmbiguous = document.getElementById("no-ambiguous");
  let strength = 0;
  // Check for length
  if (password.length > 8) {
    strength += 1;
    charLength.checked = true;
  } else {
    charLength.checked = false;
  }
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    strength += 1;
    uppercase.checked = true;
  } else {
    uppercase.checked = false;
  }
  // Check for numbers
  if (/[0-9]/.test(password)) {
    strength += 1;
    numeric.checked = true;
  } else {
    numeric.checked = false;
  }
  // Check for special characters
  if (/[!@#$%^&*]/.test(password)) {
    strength += 1;
    specialChar.checked = true;
  } else {
    specialChar.checked = false;
  }
  // Check for ambiguous characters (should not be present)
  if (!/[{}\[\]()\/\\'\"`~.,;:<>]/.test(password)) {
    strength += 1;
    noAmbiguous.checked = true;
  } else {
    noAmbiguous.checked = false;
  }
  // Set strength bar width and color
  const width = `${strength * 20}%`;
  strengthBar.style.width = width;
  if (strength <= 1) {
    strengthBar.classList.remove("bg-success", "bg-warning");
    strengthBar.classList.add("bg-danger");
    strengthText.textContent = "Password Strength: Very Weak";
    strengthEmoji.textContent = "😟";
  } else if (strength == 2) {
    strengthBar.classList.remove("bg-success", "bg-danger");
    strengthBar.classList.add("bg-warning");
    strengthText.textContent = "Password Strength: Weak";
    strengthEmoji.textContent = "😐";
  } else if (strength == 3) {
    strengthBar.classList.remove("bg-success", "bg-danger");
    strengthBar.classList.add("bg-warning");
    strengthText.textContent = "Password Strength: Medium";
    strengthEmoji.textContent = "🙂";
  } else if (strength == 4) {
    strengthBar.classList.remove("bg-danger", "bg-warning");
    strengthBar.classList.add("bg-success");
    strengthText.textContent = "Password Strength: Strong";
    strengthEmoji.textContent = "😊";
  } else if (strength == 5) {
    strengthBar.classList.remove("bg-danger", "bg-warning");
    strengthBar.classList.add("bg-success");
    strengthText.textContent = "Password Strength: Very Strong";
    strengthEmoji.textContent = "💪";
  }
});
document
  .getElementById("toggle-password")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-icon");
    // Toggle the type attribute
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("bi-eye-slash");
      toggleIcon.classList.add("bi-eye");
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("bi-eye");
      toggleIcon.classList.add("bi-eye-slash");
    }
  });
