function lighton() {
  let spanElement = document.getElementById("light");
  let passwordBox = document.getElementById("passwordBox");
  let flashlight = document.getElementById("flashlight");
  let sectionVisibility = document.getElementById("password-visibility");
  if (spanElement.style.background === "none") {
    spanElement.style.background =
      "linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), white)";
    passwordBox.type = "text";
    flashlight.src = "flashlight-off.png";
    sectionVisibility.classList.add("password-visible");
    sectionVisibility.classList.remove("password-hidden");
  } else {
    spanElement.style.background = "none";
    passwordBox.type = "password";
    flashlight.src = "flashlight-off.png";
    sectionVisibility.classList.remove("password-visible");
    sectionVisibility.classList.add("password-hidden");
  }
}
