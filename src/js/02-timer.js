import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  calendar: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  timerFace: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

const startTime = Date.now();
let indervalId = null;

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
    console.log(selectedDates[0]);
  },
};

refs.startBtn.addEventListener('click', onClick);

function onClick() {
  indervalId = setInterval(() => {
    console.log('1'); //test
  }, 1000);
  refs.startBtn.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.timer.setAttribute(
  'style',
  `font-size: 16px;
  text-transform: uppercase;
   display: flex;
     gap: 30px;
     margin-top: 30px;`
);

refs.startBtn.disabled = true;
flatpickr(refs.calendar, options);
