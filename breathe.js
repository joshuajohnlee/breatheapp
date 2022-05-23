    // Initialise variables for controls
    let speed = 5;
    let playervolume = 5;
    let currentaudiotrack = 0;


// Set variables for HTML elements
let speedreadout = document.getElementById('speedreadout');
let speedupbutton = document.getElementById('speedup');
let speeddownbutton = document.getElementById('speeddown')
let volumereadout = document.getElementById('volumereadout');
let volumeupbutton = document.getElementById('volumeup');
let volumedownbutton = document.getElementById('volumedown');
let audioplaybutton = document.getElementById('audioplaybutton');
let nowplaying = document.getElementById('nowplaying');
let audioskipforward = document.getElementById('audioskipforward');
let audioskipback = document.getElementById('audioskipback');
let audio1 = document.getElementById('audio1');
let audio2 = document.getElementById('audio2');
let audio3 = document.getElementById('audio3');

// Create an array of audio elements
const audios = [audio1, audio2, audio3];

// Add button listeners
speedupbutton.addEventListener("click", speedchangeup);
speeddownbutton.addEventListener("click", speedchangedown);
volumeupbutton.addEventListener("click", volumechangeup);
volumedownbutton.addEventListener("click", volumechangedown);
audioplaybutton.addEventListener("click", playbacktoggle);
audioskipforward.addEventListener("click", skipforward);
audioskipback.addEventListener("click", skipback);

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
    audios[currentaudiotrack].volume = playervolume/10
    volumereadout.innerHTML = playervolume * 10 + "%"
}
    
function volumechangedown() {
    if (playervolume > 1 && playervolume <= 10) {
        playervolume--
    }
    audios[currentaudiotrack].volume = playervolume/10
    volumereadout.innerHTML = playervolume * 10 + "%"
}

function playbacktoggle() {
    if (audios[currentaudiotrack].paused) {
        audios[currentaudiotrack].play()
        audioplaybutton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        updateTitle();
    } else if (!audios[currentaudiotrack].paused) {
        audios[currentaudiotrack].pause()
        audioplaybutton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
        nowplaying.innerHTML = "PAUSED";
    }
}

function skipforward() {
    audios[currentaudiotrack].pause();
    if (currentaudiotrack < audios.length - 1) {
        currentaudiotrack++
        audios[currentaudiotrack].play()
    } else {
        currentaudiotrack = 0;
        audios[currentaudiotrack].play()
    }
    updateTitle();
}

function skipback() {
    audios[currentaudiotrack].pause();
    if (currentaudiotrack > 0) {
        currentaudiotrack--
        audios[currentaudiotrack].play()
    } else {
        currentaudiotrack = audios.length - 1;
        audios[currentaudiotrack].play()
    }
    updateTitle();
}

// Could replace this with something more dynamic - have audio elements and their titles in a multilayer array?
function updateTitle() {
    switch(currentaudiotrack) {
        case 0:
            nowplaying.innerHTML = "Now playing: Relaxing music"
            break;
        case 1:
            nowplaying.innerHTML = "Now playing: Rain Sounds"
            break;
        case 2:
            nowplaying.innerHTML = "Now playing: Binaural Beats"
            break;
    }
}