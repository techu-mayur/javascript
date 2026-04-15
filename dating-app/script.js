document.addEventListener("DOMContentLoaded", () => {
  const profiles = [
    {
      name: "John Doe",
      age: 25,
      bio: "Lorem ipsum dolor sit amet.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      age: 28,
      bio: "Curabitur lacinia, urna nec pulvinar aliquet.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Alice Johnson",
      age: 22,
      bio: "Praesent tincidunt, est at luctus suscipit.",
      image: "https://via.placeholder.com/150",
    },
  ];
  let currentIndex = 0;
  const profileCard = document.getElementById("profile-card");
  const profileImage = document.getElementById("profileImage");
  const profileName = document.getElementById("profileName");
  const profileBio = document.getElementById("profileBio");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");
  function loadProfile(index) {
    const profile = profiles[index];
    profileImage.src = profile.image;
    profileName.textContent = `${profile.name}, ${profile.age}`;
    profileBio.textContent = profile.bio;
    profileCard.classList.add("reset");
  }
  function swipe(direction) {
    profileCard.classList.remove("reset");
    profileCard.classList.add(`swipe-${direction}`);
    setTimeout(() => {
      profileCard.classList.remove(`swipe-${direction}`);
      currentIndex = (currentIndex + 1) % profiles.length;
      loadProfile(currentIndex);
    }, 500);
  }
  likeBtn.addEventListener("click", () => swipe("right"));
  dislikeBtn.addEventListener("click", () => swipe("left"));
  loadProfile(currentIndex);
});
