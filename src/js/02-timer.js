import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  calendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  timerface: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

const startTime = Date.now();
let indervalId = null;
let selectedDate = null;
let deltaTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= startTime) {
      Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    selectedDate = selectedDates[0];
    console.log(selectedDates[0]);
  },
};

refs.startBtn.addEventListener('click', onClick);

function onClick() {
  indervalId = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = Math.floor((selectedDate - currentTime) / 1000) * 1000;
    if (deltaTime <= 0) {
      clearInterval(indervalId);
      Notify.info('Time is up!');
      refs.timerface.days.textContent = '00';
      refs.timerface.hours.textContent = '00';
      refs.timerface.minutes.textContent = '00';
      refs.timerface.seconds.textContent = '00';
      refs.startBtn.disabled = false;
    } else {
      const timerface = convertMs(deltaTime);
      updateTimer(timerface);
    }
  }, 1000);
  refs.startBtn.disabled = true;
}

function updateTimer(timerface) {
  const { days, hours, minutes, seconds } = timerface;
  refs.timerface.days.textContent = days;
  refs.timerface.hours.textContent = hours;
  refs.timerface.minutes.textContent = minutes;
  refs.timerface.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.startBtn.disabled = true;
flatpickr(refs.calendar, options);
