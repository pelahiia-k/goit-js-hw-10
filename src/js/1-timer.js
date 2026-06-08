import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  timeout: 3000,
  position: 'topRight',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
  backgroundColor: '#0f172a',
  titleColor: '#22c55e',
  messageColor: '#e5e7eb',
  progressBarColor: '#22c55e',
  iconColor: '#22c55e',
  close: false,
});

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

updateTimer({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      startBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });

      return;
    }

    startBtn.disabled = false;
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;

  updateCountdown();

  timerId = setInterval(updateCountdown, 1000);
});

function updateCountdown() {
  const timeLeft = userSelectedDate - Date.now();

  if (timeLeft <= 0) {
    clearInterval(timerId);

    updateTimer({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    dateInput.disabled = false;
    startBtn.disabled = true;

    return;
  }

  updateTimer(convertMs(timeLeft));
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
