let timer;
let sessionDuration = 25;
let breakDuration = 5;
let currentDuration = sessionDuration;
let minutes = sessionDuration;
let seconds = 0;
let audio;

function adjustDuration(type, amount) {
    if (type === 'session') {
        sessionDuration += amount;
        currentDuration = sessionDuration;
    } else if (type === 'break') {
        breakDuration += amount;
        currentDuration = breakDuration;
    }

    if (currentDuration < 1) {
        currentDuration = 1;
    }

    minutes = currentDuration;
    seconds = 0;
    updateDisplay();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}



function resetTimer() {
    clearInterval(timer);
    minutes = sessionDuration;
    seconds = 0;
    updateDisplay();
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        playNotificationSound();
        if (currentDuration === sessionDuration) {
            minutes = breakDuration;
        } else {
            minutes = sessionDuration;
        }
        seconds = 0;
        updateDisplay();
    } else if (seconds === 0) {
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    updateDisplay();
}

function updateDisplay() {
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    document.getElementById('timer').innerText = `${displayMinutes}:${displaySeconds}`;
    document.getElementById('sessionDuration').innerText = sessionDuration;
    document.getElementById('breakDuration').innerText = breakDuration;

  
}


function playNotificationSound() {
    const notificationSound = new Audio('sound/wind-chimes-bells-115747 (2).mp3');
    notificationSound.play();
}




function stopNotificationSound() {
    const notificationSound = document.getElementById('notificationSound');
    notificationSound.pause();
    notificationSound.currentTime = 0;
}

function playNotificationSound() {
    notificationSound.play();
    return notificationSound; // Return the Audio element
}

function stopTimer() {
    clearInterval(timer);
    const sound = playNotificationSound(); // Get the Audio element
    stopNotificationSound(sound);
}




