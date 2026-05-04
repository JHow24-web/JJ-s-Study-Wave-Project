const tracks = [
  { title: "Chill Lofi",   artist: "Pixabay",   src: "songs/ChillLOFI.mp3" },
  { title: "STUDYTIME",   artist: "Artist Two",   src: "songs/LOFI.mp3" },
  { title: "ATARI", artist: "Artist Three", src: "songs/MARIO.mp3" },
  { title: "Float Away",   artist: "Pixabay",   src: "songs/WatermelonLOFI.mp3" },
];
let current = 0;
const audio = new Audio();

const trackTitle   = document.querySelector('.track-title');
const trackArtist  = document.querySelector('.track-artist');
const playBtn      = document.querySelector('.btn-play');
const skipBtns     = document.querySelectorAll('.btn-skip');
const progressFill = document.querySelector('.progress-fill');
const progressBar  = document.querySelector('.progress-bar');
const timeSpans    = document.querySelectorAll('.time-row span');
const volumeSlider = document.querySelector('.volume-row input');

// Load track
function loadTrack(index) {
  current = index;
  audio.src = tracks[index].src;
  trackTitle.textContent  = tracks[index].title;
  trackArtist.textContent = tracks[index].artist;
  progressFill.style.width = '0%';
  timeSpans[0].textContent = '0:00';
  timeSpans[1].textContent = '0:00';
}

// Play / Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '&#9646;&#9646;';
  } else {
    audio.pause();
    playBtn.innerHTML = '&#9654;';
  }
});

// Previous button
skipBtns[0].addEventListener('click', () => {
  loadTrack((current - 1 + tracks.length) % tracks.length);
  audio.play();
  playBtn.innerHTML = '&#9646;&#9646;';
});

// Next button
skipBtns[1].addEventListener('click', () => {
  loadTrack((current + 1) % tracks.length);
  audio.play();
  playBtn.innerHTML = '&#9646;&#9646;';
});

// Auto advance
audio.addEventListener('ended', () => {
  loadTrack((current + 1) % tracks.length);
  audio.play();
  playBtn.innerHTML = '&#9646;&#9646;';
});

// Progress bar
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
  timeSpans[0].textContent = formatTime(audio.currentTime);
  timeSpans[1].textContent = formatTime(audio.duration);
});

// Click to seek
progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

// Volume slider
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value / 100;
});

// Helper
function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Load first track on page load
loadTrack(0);