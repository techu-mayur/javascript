function updateClock() {
  const hourHand = document.querySelector(".hour-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const secondHand = document.querySelector(".second-hand");
  const heading = document.getElementById("clock-heading");
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // Calculate the rotation for each hand
  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
  // Apply the rotation to each hand
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  // Update background and heading color based on the time
  let backgroundImage = "";
  let headingClass = "";
  if (hours >= 6 && hours < 12) {
    backgroundImage = 'url("morning.jpg")'; // Replace with your morning image URL
    headingClass = "heading-day";
  } else if (hours >= 12 && hours < 16) {
    backgroundImage = 'url("afternoon.jpg")'; // Replace with your afternoon image URL
    headingClass = "heading-day";
  } else if (hours >= 16 && hours < 20) {
    backgroundImage = 'url("evening.jpg")'; // Replace with your evening image URL
    headingClass = "heading-day";
  } else {
    backgroundImage = 'url("night.jpg")'; // Replace with your night image URL
    headingClass = "heading-night";
  }
  document.body.style.backgroundImage = backgroundImage;
  heading.className = `heading ${headingClass}`;
}
// Run the updateClock function every second
setInterval(updateClock, 1000);
// Initial call to set the time immediately
updateClock();
