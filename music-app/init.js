document.addEventListener("DOMContentLoaded", async function () {
  const clientId = "dbfc329374eb4362a541cec8ff7d8d84";
  const clientSecret = "59a8c1cff28d42659771c6869a9235b1";

  const playerContainer = document.querySelector(".player-container");
  const playButton = playerContainer.querySelector(".play-btn i");
  const nextButton = playerContainer.querySelector(".next-btn i");
  const prevButton = playerContainer.querySelector(".prev-btn i");
  const songTitle = playerContainer.querySelector(".song-name h3");
  const authorImage = playerContainer.querySelector(".author img");
  const musicThumbnail = playerContainer.querySelector(".music-bg img");
  const progressBar = playerContainer.querySelector(".progress-bar");
  const progressTimeCurrent = playerContainer.querySelector(
    ".progress-time .time:first-child"
  );
  const progressTimeRemaining = playerContainer.querySelector(
    ".progress-time .time:last-child"
  );
  const volumeButton = playerContainer.querySelector(".volume-btn i");

  let currentSongIndex = 0;
  let songs = [];
  let audio = new Audio();

  async function getAccessToken(clientId, clientSecret) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  }

  async function fetchBollywoodSongs(token) {
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=hindi%20bollywood&type=track&limit=10",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    const data = await response.json();
    return data.tracks.items;
  }

  try {
    const token = await getAccessToken(clientId, clientSecret);
    songs = await fetchBollywoodSongs(token);

    if (songs.length > 0) {
      loadSong(songs[currentSongIndex]);
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
  }

  function loadSong(song) {
    console.log(song.preview_url); // Log the preview_url to check if it's valid
    audio.src = song.preview_url;
    songTitle.textContent = `${song.artists[0].name} - ${song.name}`;
    authorImage.src = song.album.images[0].url;
    musicThumbnail.src = song.album.images[0].url;
    progressBar.style.width = "0%";
    progressTimeCurrent.textContent = "00:00";
    progressTimeRemaining.textContent = `-00:30`;
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  playButton.addEventListener("click", function () {
    console.log("Play button clicked"); // Log to check if the button click event is triggered
    console.log("Audio paused:", audio.paused); // Log the paused state of the audio
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          playButton.classList.replace("fa-play", "fa-pause");
          console.log("Audio playing"); // Log for debugging
        })
        .catch((error) => {
          console.error("Error playing audio:", error); // Log error if any
        });
    } else {
      audio.pause();
      playButton.classList.replace("fa-pause", "fa-play");
      console.log("Audio paused"); // Log for debugging
    }
  });

  nextButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.classList.replace("fa-play", "fa-pause");
  });

  prevButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playButton.classList.replace("fa-play", "fa-pause");
  });
  audio.addEventListener("timeupdate", function () {
    const duration = audio.duration || 30; // Fallback to 30 seconds if duration is not available
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;

    if (!isNaN(progressPercent)) {
      // Check if progressPercent is a valid number
      progressBar.style.width = `${progressPercent}%`;
      progressTimeCurrent.textContent = formatTime(currentTime);
      progressTimeRemaining.textContent = `-${formatTime(
        duration - currentTime
      )}`;
    }
  });

  audio.addEventListener("ended", function () {
    nextButton.click();
  });

  volumeButton.addEventListener("click", function () {
    console.log("Volume button clicked"); // Log to check if the volume button click event is triggered
    console.log("Audio muted:", audio.muted); // Log the muted state of the audio
    audio.muted = !audio.muted;
    volumeButton.classList.toggle("fa-volume-mute", audio.muted);
    volumeButton.classList.toggle("fa-volume-high", !audio.muted);
  });
});
