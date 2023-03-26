import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const startTime = Date.now();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= startTime) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    console.log(selectedDates[0]);
  },
};

startBtn.disabled = true;

timer.setAttribute(
  'style',
  `font-size: 36px;
  text-transform: uppercase;
   display: flex;
     gap: 30px;
     margin-top: 30px;`
);

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

flatpickr(calendar, options);
