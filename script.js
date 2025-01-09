const timerEl = document.querySelector('.timer')
const marksList = document.querySelector('.marks-list')
let interValId = 0;
let timer = 0;
let marks = [];

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

const addMarkToList = (markIndex, markTime) => {
    marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const toggleTimer = () => {
    const button = document.querySelector('.power');
    const action = button.getAttribute('action');

    clearInterval(interValId);

    if (action == 'start' || action == 'continue') {
        interValId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
            button.setAttribute('action', 'pause');
            button.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else if (action == 'pause') {
        button.setAttribute('action', 'continue');
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const markTime = () => {
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const resetTimer = () => {
    clearInterval(interValId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.querySelector('.power');
    button.setAttribute('action', 'start');
    button.innerHTML = '<i class="fa-solid fa-play"><i>';
}

document.querySelector('.power').addEventListener('click', toggleTimer);
document.querySelector('.mark').addEventListener('click', markTime);
document.querySelector('.reset').addEventListener('click', resetTimer);
