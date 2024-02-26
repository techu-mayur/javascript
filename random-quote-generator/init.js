// Function to fetch a random quote from the Quotable API
async function fetchRandomQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { content: "Failed to fetch a quote.", author: "Unknown" };
  }
}
// Function to generate a new quote using the Quotable API
async function generateNewQuote() {
  const quoteText = document.getElementById("quoteText");
  const quoteName = document.getElementById("quoteName");
  const newQuote = await fetchRandomQuote();
  quoteText.textContent = newQuote.content;
  quoteName.textContent = newQuote.author;
}
// Function to copy the current quote to the clipboard
function copyQuote() {
  const quoteText = document.getElementById("quoteText");
  const textArea = document.createElement("textarea");
  textArea.value = quoteText.textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "block";
  setTimeout(() => {
    tooltip.style.display = "none";
  }, 1500);
}
// Function to share the current quote on Twitter
// Function to share the current quote on Facebook
function shareOnFacebook() {
  const quoteText = document.getElementById("quoteText").textContent;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}&quote=${encodeURIComponent(quoteText)}`;
  window.open(facebookUrl, "_blank");
}
// Function to share the current quote on Twitter
function shareOnTwitter() {
  const quoteText = document.getElementById("quoteText").textContent;
  const authorName = document.getElementById("quoteName").textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quoteText}" - ${authorName} via @YourTwitterHandle`
  )}`;
  window.open(twitterUrl, "_blank");
}
function shareOnInstagram() {
  const quoteText = document.getElementById("quoteText").textContent;
  const instagramDirectUrl = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
    quoteText
  )}`;
  window.open(instagramDirectUrl, "_blank");
}
function shareOnWhatsAppStatus() {
  const quoteText = document.getElementById("quoteText").textContent;
  const whatsappStatusUrl = `https://wa.me/?text=${encodeURIComponent(
    quoteText
  )}`;
  window.open(whatsappStatusUrl, "_blank");
}
// Initial quote generation
generateNewQuote();
