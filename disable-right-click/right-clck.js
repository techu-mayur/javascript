document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("keydown", (event) => {
  if (
    event.ctrlKey &&
    (event.key === "u" || event.key === "s" || event.key === "c")
  ) {
    event.preventDefault();
  }
});
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  alert("Right-click is disabled!");
});
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("contextmenu", (event) => event.preventDefault());
});
