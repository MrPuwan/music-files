const songs = [
    { title: "Mathaka mandira", artist: "Nilan Fernando & Pavani Perara", file: "music/1.mp3", cover: "images/1.jpg" },
    { title: "Sumudu walawaka", artist: "Dr Amila Edirisinghe(cover)", file: "music/2.mp3", cover: "images/2.jpg" },
    { title: "Himi nathi adreka", artist: "Raveen Tharuka", file: "music/3.mp3", cover: "images/3.jpg" }
]; // List of songs with details

let currentIndex = 0; // Current song index
let isShuffle = false; // Shuffle mode flag

const audio = document.getElementById("audio"); // Audio element
const songTitle = document.getElementById("song-title"); // Song title element
const artistName = document.getElementById("artist-name"); // Artist name element
const albumImage = document.getElementById("album-image"); // Album image element
const progressBar = document.getElementById("progress-bar"); // Progress bar element
const playPauseBtn = document.getElementById("play-pause"); // Play/Pause button element
const shuffleBtn = document.getElementById("shuffle"); // Shuffle button element
const reactionBtn = document.getElementById("reaction"); // Reaction button element
const reactionAnimationContainer = document.getElementById("reaction-animation"); // Reaction animation container element

// Function to trigger the flying reaction
function triggerReaction(reactionText) {
    const reaction = document.createElement("div"); // Create reaction element
    reaction.classList.add("reaction"); // Add reaction class
    reaction.innerHTML = reactionText; // Set reaction text
    
    // Append to the reaction container
    reactionAnimationContainer.appendChild(reaction); // Add to container
    
    // Animation will be triggered by CSS @keyframes
    setTimeout(() => {
        reaction.remove(); // Remove reaction after animation
    }, 2000); // 2000ms is the duration of the animation
}

// Reaction Button Event Listener
reactionBtn.addEventListener("click", () => {
    // Example: you can change this to add any emoji or text you like
    triggerReaction("❤️"); // You can add more reactions like "👍", "😊", etc.
});

// Update the song details (title, artist, and album image)
function updateSong() {
    const currentSong = songs[currentIndex]; // Get current song
    audio.src = currentSong.file; // Set audio file
    songTitle.textContent = currentSong.title; // Set song title
    artistName.textContent = currentSong.artist; // Set artist name
    albumImage.src = currentSong.cover; // Set album image
    audio.load(); // Load audio
}

// Shuffle the song and image
function shuffleSong() {
    currentIndex = Math.floor(Math.random() * songs.length); // Get random index
    updateSong(); // Update song details
    audio.play(); // Play audio
}

// Play/Pause button event listener
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play(); // Play audio
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
    } else {
        audio.pause(); // Pause audio
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
    }
});

// Shuffle button event listener
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle; // Toggle shuffle mode
    shuffleBtn.classList.toggle("active", isShuffle); // Toggle active class
    if (isShuffle) {
        shuffleSong(); // Shuffle song
    } else {
        updateSong(); // Update song
    }
});

// Next button event listener
document.getElementById("next").addEventListener("click", () => {
    if (isShuffle) {
        shuffleSong(); // Shuffle song
    } else {
        currentIndex = (currentIndex + 1) % songs.length; // Next song index
        updateSong(); // Update song
        audio.play(); // Play audio
    }
});

// Previous button event listener
document.getElementById("previous").addEventListener("click", () => {
    if (isShuffle) {
        shuffleSong(); // Shuffle song
    } else {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length; // Previous song index
        updateSong(); // Update song
        audio.play(); // Play audio
    }
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    const progress = (audio.currentTime / audio.duration) * 100; // Calculate progress
    progressBar.value = progress; // Update progress bar
    const currentTime = formatTime(audio.currentTime); // Format current time
    const durationTime = formatTime(audio.duration); // Format duration time
    document.getElementById("current-time").textContent = currentTime; // Set current time
    document.getElementById("duration-time").textContent = durationTime; // Set duration time
});

// Format time in mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60); // Get minutes
    const secs = Math.floor(seconds % 60); // Get seconds
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`; // Format time
}

// Progress bar event listener
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration; // Update current time
});

// Song end event listener
audio.addEventListener("ended", () => {
    if (isShuffle) {
        shuffleSong(); // Shuffle song
    } else {
        currentIndex = (currentIndex + 1) % songs.length; // Next song index
        updateSong(); // Update song
        audio.play(); // Play audio
    }
});

// Initialize the first song
updateSong(); // Update song details
