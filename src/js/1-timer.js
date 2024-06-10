import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import imageUrl from '../img/symbol-defs.svg';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  clockface: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
  input: document.querySelector('#datetime-picker'),
};

let intervalId;
let userSelectedDate;

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        messageSize: '16',
        imageWidth: 302,
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#b51b1b',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
        iconUrl: imageUrl,
        iconColor: '#FAFAFB',
      });
      refs.startBtn.disabled = true;
      refs.startBtn.classList.remove('correct-date');
    } else {
      userSelectedDate = selectedDate;
      refs.startBtn.disabled = false;
      refs.startBtn.classList.add('correct-date');
    }
  },
};

flatpickr(refs.input, options);

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = new Date();
    const diff = userSelectedDate - currentTime;
    refs.startBtn.classList.remove('correct-date');

    if (diff <= 0) {
      stopTimer();
      updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 }, true);
      return;
    }

    const time = convertMs(diff);
    updateClockface(time, false);
  }, 1000);

  refs.startBtn.disabled = true;
  refs.input.disabled = true;
}

function stopTimer() {
  clearInterval(intervalId);
  refs.input.disabled = false;
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

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }, isDisabled) {
  refs.clockface.days.textContent = addLeadingZero(days);
  refs.clockface.hours.textContent = addLeadingZero(hours);
  refs.clockface.minutes.textContent = addLeadingZero(minutes);
  refs.clockface.seconds.textContent = addLeadingZero(seconds);
  if (isDisabled) {
    refs.startBtn.disabled = true;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
