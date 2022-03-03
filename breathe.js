// Set variables for HTML elements
const speedreadout = document.getElementById('speedreadout');
const speedupbutton = document.getElementById('speedup');
const speeddownbutton = document.getElementById('speeddown')

const volumereadout = document.getElementById('volumereadout');
const volumeupbutton = document.getElementById('volumeup');
const volumedownbutton = document.getElementById('volumedown')

const audioplaybutton = document.getElementById('audioplay')

const music = document.getElementById('music1')

// Add button listeners

speedupbutton.addEventListener("click", speedchangeup);
speeddownbutton.addEventListener("click", speedchangedown);
volumeupbutton.addEventListener("click", volumechangeup);
volumedownbutton.addEventListener("click", volumechangedown);
audioplaybutton.addEventListener("click", playbacktoggle);

// Initialise variables for controls 

let speed = 5;
let playervolume = 5;

// Write out the intial values

speedreadout.innerHTML = speed;
volumereadout.innerHTML = playervolume * 10 + "%";

// Speed change functions

function speedchangeup() {
    if (speed >= 1 && speed < 10) {
        speed++
    }  
    speedreadout.innerHTML = speed
}
    
function speedchangedown() {
    if (speed > 1 && speed <= 10) {
        speed--
    }
    speedreadout.innerHTML = speed 
}

// Volume change functions

function volumechangeup() {
    if (playervolume >= 1 && playervolume < 10) {
        playervolume++
    } 
    music.volume = playervolume/10
    volumereadout.innerHTML = playervolume * 10 + "%"
}
    
function volumechangedown() {
    if (playervolume > 1 && playervolume <= 10) {
        playervolume--
    }
    music.volume = playervolume/10
    volumereadout.innerHTML = playervolume * 10 + "%"
}

function playbacktoggle() {
    if (music.paused) {
        music.play()
        audioplaybutton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>'
    } else if (!music.paused) {
        music.pause()
        audioplaybutton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
    }
}

