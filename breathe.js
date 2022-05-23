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

// Populate audio elements
// This checks for any element named audio with a number, and adds it to the audios array.
// The audios array is used later to pause and play the correct track

let audios = []
let audiolisting = true;
let counter = 0;

while (audiolisting) {
    // Set a string equal to the name of the next audio element to check for
    string = 'audio' + (counter+1).toString();

    if (document.getElementById(string) != null) { 
    audios[counter] = [document.getElementById(string), document.getElementById(string).getAttribute("data-title")];
    counter++;
    } else {
        audiolisting = false;
    }
}

console.log("Audio listing complete, found " + audios.length + " items.")

// Create an array of audio elements
// const audios = [audio1, audio2, audio3];

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
volumereadout.innerHTML = "VOLUME:<br>" + playervolume * 10 + "%";


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
    volumereadout.innerHTML = "VOLUME:<br>" + playervolume * 10 + "%"
}
    
function volumechangedown() {
    if (playervolume > 1 && playervolume <= 10) {
        playervolume--
    }
    audios[currentaudiotrack][0].volume = playervolume/10
    volumereadout.innerHTML = "VOLUME:<br>" + playervolume * 10 + "%"
}

function playbacktoggle() {
    if (audios[currentaudiotrack][0].paused) {
        audios[currentaudiotrack][0].play()
        audioplaybutton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
        updateTitle();
    } else if (!audios[currentaudiotrack][0].paused) {
        audios[currentaudiotrack][0].pause()
        audioplaybutton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>'
        nowplaying.innerHTML = "PAUSED";
    }
}

function skipforward() {
    audios[currentaudiotrack][0].pause();
    if (currentaudiotrack < audios.length - 1) {
        currentaudiotrack++
        audios[currentaudiotrack][0].play()
    } else {
        currentaudiotrack = 0;
        audios[currentaudiotrack][0].play()
    }
    updateTitle();
}

function skipback() {
    audios[currentaudiotrack][0].pause();
    if (currentaudiotrack > 0) {
        currentaudiotrack--
        audios[currentaudiotrack][0].play()
    } else {
        currentaudiotrack = audios.length - 1;
        audios[currentaudiotrack][0].play()
    }
    updateTitle();
}

// Could replace this with something more dynamic - have audio elements and their titles in a multilayer array?
function updateTitle() {
    nowplaying.innerHTML= "Now playing: " + audios[currentaudiotrack][1];
}