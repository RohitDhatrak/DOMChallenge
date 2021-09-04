const INPUT_TIME = 3; // in seconds

const button = document.querySelector("#run-btn");
const progress = document.querySelector("#progress");

const FACTOR = 25;
const INTERVAL_TIME = (INPUT_TIME * 1000) / 4;
const OFFSET = 100;
let currentWidth = 0;
let clickCount = 0;
let isOpInProgress;

button.addEventListener("click", () => {
    clickCount++;
    button.innerText = "Run " + clickCount;
    if (!isOpInProgress) {
        runProgressBar();
        isOpInProgress = true;
    }
});

function runProgressBar() {
    const intervalId = setInterval(() => {
        progress.style.width = currentWidth + FACTOR + "%";
        currentWidth += FACTOR;
    }, INTERVAL_TIME - OFFSET);

    setTimeout(() => {
        clearInterval(intervalId);
        progress.style.width = 0;
        currentWidth = 0;
        clickCount--;
        isOpInProgress = false;
        button.innerText = "Run " + clickCount;
        if (clickCount && !isOpInProgress) {
            runProgressBar();
            isOpInProgress = true;
        }
    }, INPUT_TIME * 1000);
}
