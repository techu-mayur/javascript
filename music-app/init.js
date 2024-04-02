$(window).on("load", function () {
  // Show loader initially
  $(".loader").fadeIn();

  // Set a timeout to hide the loader after 2 seconds
  setTimeout(function() {
      $(".loader").fadeOut();
  }, 2000);
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

$('.recommended-artist-carousel').owlCarousel({
  loop:false,
  dots:false,
  nav:false,
  margin:0,
  responsiveClass:true,
  responsive:{
      0:{
          items:2.5,
      },
      600:{
          items:2.5,

      },
      1000:{
          items:2.5,
      }
  }
});

$('.recent-played-carousel').owlCarousel({
  loop:false,
  dots:false,
  nav:false,
  margin:20,
  responsiveClass:true,
  responsive:{
      0:{
          items:3.5,
      },
      600:{
          items:3.5,

      },
      1000:{
          items:3.5,
      }
  }
});

$('.top-chart-carousel').owlCarousel({
  loop:false,
  dots:false,
  nav:false,
  margin:20,
  responsiveClass:true,
  responsive:{
      0:{
          items:2.5,
      },
      600:{
          items:2.5,

      },
      1000:{
          items:2.5,
      }
  }
});

// Tab click event
$('ul.list-unstyled li').click(function(){
  var tab_id = $(this).attr('data-tab');

  // Remove the 'active' class from all tabs
  $('ul.list-unstyled li').removeClass('active');
  // Hide all tab content
  $('.tab-pane').removeClass('active');

  // Add the 'active' class to the clicked tab
  $(this).addClass('active');
  // Show the corresponding tab content
  $("#" + tab_id).addClass('active');
});

// On click of a link with class "music"
$(".music").click(function(e){
  e.preventDefault(); // Prevent default link behavior

  // Show the music container div
  $("#music").show();
});

// Music player
$(document).ready(function() {
  const client_id = 'dbfc329374eb4362a541cec8ff7d8d84';
  const client_secret = '59a8c1cff28d42659771c6869a9235b1';
  const grant_type = 'client_credentials';

  $.ajax({
      url: 'https://accounts.spotify.com/api/token',
      type: 'POST',
      headers: {
          'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
          'grant_type': grant_type
      },
      success: function(response) {
          const access_token = response.access_token;
          // Now you can use this access_token to fetch playlist tracks
          fetchPlaylistTracks(access_token);
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
      }
  });

  function fetchPlaylistTracks(access_token) {
      const playlist_id = 'YOUR_PLAYLIST_ID';
      const apiUrl = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;

      $.ajax({
          url: apiUrl,
          type: 'GET',
          headers: {
              'Authorization': 'Bearer ' + access_token
          },
          success: function(response) {
              // Update UI with fetched playlist tracks
              const songsList = response.items.map(item => ({
                  title: item.track.name,
                  artist: item.track.artists[0].name,
                  album: item.track.album.name,
                  thumb: item.track.album.images[0].url,
                  link: item.track.preview_url // Assuming the API provides preview_url for song preview
              }));
              // Call changeSong to load the first song
              changeSong(songsList);
          },
          error: function(xhr, status, error) {
              console.error('Error:', error);
          }
      });
  }

  // Initialize variables
  var currIndex = 0;
  var isPlaying = false;
  var currSong = new Audio();

  var songThumb = document.querySelector(".song-thumb");
  var songTitle = document.querySelector(".song-info-title");
  var songArtist = document.querySelector(".song-info-artist");
  var songAlbum = document.querySelector(".song-info-album");

  var stateButton = document.querySelector(".player-state-btn");
  var songProgressBar = document.querySelector(".song-progress-value");
  var volumeSlider = document.querySelector("#volume-slider");
  var volumeTrail = document.querySelector(".volume-trail");

  // Change song based on index
  function changeSong(songsList) {
      let currentStatus = isPlaying;
      if (currentStatus) toggleState();
      songTitle.innerHTML = songsList[currIndex]["title"];
      songArtist.innerHTML = songsList[currIndex]["artist"];
      songAlbum.innerHTML = songsList[currIndex]["album"];
      songThumb.style.backgroundImage = `url(${songsList[currIndex]["thumb"]})`;
      currSong.src = songsList[currIndex]["link"];

      if (currentStatus) toggleState();
  }

  // Play the next song
  function nextSong() {
      currIndex++;
      if (currIndex >= songsList.length) currIndex = 0;
      changeSong(songsList);
  }

  // Play the previous song
  function prevSong() {
      currIndex--;
      if (currIndex < 0) currIndex = songsList.length - 1;
      changeSong(songsList);
  }

  // Toggle play/pause state
  function toggleState() {
      if (isPlaying) {
          currSong.pause();
          stateButton.classList = "fas fa-play-circle player-state-btn";
      } else {
          currSong.play();
          stateButton.classList = "fas fa-pause-circle player-state-btn";
      }
      isPlaying = !isPlaying;
  }

  // Adjust volume
  function adjustVolume(currVol) {
      currSong.volume = currVol;
      if (currVol !== "0" && currVol !== 0)
          volumeTrail.style.width = `${currVol * 100 - 2}%`;
      else
          volumeTrail.style.width = "0%";
      volumeSlider.value = currVol;
  }

  // Update progress bar while playing
  currSong.addEventListener('timeupdate', () => {
      let currPosition = currSong.currentTime / currSong.duration * 600;
      if (!isNaN(currPosition))
          songProgressBar.setAttribute("stroke-dasharray", `${currPosition} ${600 - currPosition}`);
      else
          songProgressBar.setAttribute("stroke-dasharray", "0 600");
  });

  // Next song button click event
  $('.player-move-btn').click(nextSong);

  // Play/pause button click event
  $('.player-state-btn').click(toggleState);

  // Volume slider change event
  $('#volume-slider').change(function() {
      adjustVolume($(this).val());
  });

  // Search input change event
  $('.searchbar').on('input', function() {
      let searchTerm = $(this).val().toLowerCase();
      let filteredSongs = songsList.filter(song => {
          return song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);
      });
      // Update the UI with filtered songs
      // For example, you can render the filtered songs in the search result box
  });
});
