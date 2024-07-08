let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTimes = [];
let hours = 0;
let minutes = 0;
let seconds = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = 'Start';
    display.textContent = '00:00:00';
    lapTimes = [];
    laps.innerHTML = '';
    hours = 0;
    minutes = 0;
    seconds = 0;
}

function recordLap() {
    if (running) {
        const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    hours = Math.floor(difference / (1000 * 60 * 60));

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}