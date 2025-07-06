// Cyberpunk Stopwatch Script

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapTime = 0;

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - lapTime;
        tInterval = setInterval(getShowTime, 1); // Update every millisecond
        running = true;
        startStopBtn.innerHTML = "Stop";
        display.classList.add('running'); // Optional: for styling when running
    } else {
        clearInterval(tInterval);
        lapTime = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerHTML = "Start";
        display.classList.remove('running');
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    lapTime = 0;
    startStopBtn.innerHTML = "Start";
    const initialTime = "00:00:00:000";
    display.innerHTML = initialTime;
    display.setAttribute('data-text', initialTime);
    display.classList.remove('running');
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;

    const currentTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    display.innerHTML = currentTime;
    display.setAttribute('data-text', currentTime);
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
