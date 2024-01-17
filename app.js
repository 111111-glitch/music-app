document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');

    // Spotify API endpoint for playing a track
    const playUrl = 'https://api.spotify.com/v1/me/player/play';

    // Dummy array of song IDs, replace this with your actual song data
    const songIds = ['song1_id', 'song2_id', 'song3_id'];
    let currentSongIndex = 0; // Index of the currently playing song

    function playSong() {
        // Construct the request body with the track URI
        const requestBody = {
            uris: [`spotify:track:${songIds[currentSongIndex]}`]
        };

        // Fetch request to play the current song
        fetch(playUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer your_access_token',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to play the song');
            }
            console.log('Successfully played the song');
        })
        .catch(error => console.error('Error:', error));
    }

    function pauseSong() {
        // Fetch request to pause the current song
        fetch('https://api.spotify.com/v1/me/player/pause', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer your_access_token',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to pause the song');
            }
            console.log('Successfully paused the song');
        })
        .catch(error => console.error('Error:', error));
    }

    function playNextSong() {
        // Increment the currentSongIndex
        currentSongIndex++;

        // If the index is greater than the last song index, set it to the first song
        if (currentSongIndex >= songIds.length) {
            currentSongIndex = 0;
        }

        playSong();
    }

    function playPreviousSong() {
        // Decrement the currentSongIndex
        currentSongIndex--;

        // If the index is less than 0, set it to the last song in the array
        if (currentSongIndex < 0) {
            currentSongIndex = songIds.length - 1;
        }

        playSong();
    }

    function togglePlayPause() {
          // Toggle visibility of play and pause buttons
          playButton.style.display = playButton.style.display === 'none' ? 'block' : 'none';
          pauseButton.style.display = pauseButton.style.display === 'none' ? 'block' : 'none';
  
          // You can add additional logic here for play/pause actions
          if (playButton.style.display === 'block') {
              pauseSong();  // If play button is visible, pause the song
          } else {
              playSong();   // If pause button is visible, play the song
          }
      }

    // Assign functions to global variables for inline onclick attributes
    window.togglePlayPause = togglePlayPause;
    window.playPreviousSong = playPreviousSong;
    window.playNextSong = playNextSong;

    // Add click events for buttons
    playButton.addEventListener('click', togglePlayPause);
    pauseButton.addEventListener('click', togglePlayPause);
    previousButton.addEventListener('click', playPreviousSong);
    nextButton.addEventListener('click', playNextSong);
});
