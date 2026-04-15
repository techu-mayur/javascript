$(window).on("load", function () {
  $(".loader").fadeOut();
});
document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.querySelector(".next-button");
  const screenOne = document.querySelector(".screen-one");
  const screenTwo = document.querySelector(".screen-two");
  nextButton.addEventListener("click", function () {
    screenOne.style.opacity = 0;
    setTimeout(() => {
      screenOne.style.display = "none";
      screenTwo.classList.add("show");
    }, 500);
  });
});
document
  .getElementById("your-date-of-birth")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const birthDate = new Date(document.getElementById("birth-date").value);
    const todayDate = new Date(document.getElementById("today-date").value);
    if (birthDate > todayDate) {
      alert("Birth date cannot be in the future.");
      return;
    }
    let years = todayDate.getFullYear() - birthDate.getFullYear();
    let months = todayDate.getMonth() - birthDate.getMonth();
    let days = todayDate.getDate() - birthDate.getDate();
    if (days < 0) {
      months--;
      days += new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        0
      ).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    document.getElementById("years").firstChild.nodeValue = years + " ";
    document.getElementById("months").firstChild.nodeValue = months + " ";
    document.getElementById("days").firstChild.nodeValue = days + " ";
  });
