const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [{
    name: 'song-1',
    displayName: 'Electric Chill Machine',
    artist: 'Creative Commons',
    image: 'pic-1',
},
{
    name: 'song-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Creative Commons',
    image: 'pic-2',
},
{
    name: 'song-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
    image: 'pic-3',

},
{
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
    image: 'metric-1',

},
]

// CHeck if playing
let isPlaying = false;

// Current Song
let songIndex = 0;


// Play
function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
}

// Pause
function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play')
}


//Update Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.image}.jpg`;
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) { songIndex = songs.length - 1 }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) { songIndex = 0 }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar & Time of Music Playing
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){durationSeconds = `0${durationSeconds}`;}
        // Delay switching duration Element to avoid NAN
        if (durationSeconds) {durationElement.textContent = `${durationMinutes}:${durationSeconds}`;}

        // Calculate display for current time of current song
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){currentSeconds = `0${currentSeconds}`;}
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
} 



// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);

// On Load 
loadSong(songs[songIndex]);