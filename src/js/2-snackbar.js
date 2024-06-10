import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import rejectImageUrl from '../img/alert-icon.svg';
import successImageUrl from '../img/succes-icon.svg';

const inputForm = document.querySelector('.form');

inputForm.addEventListener('submit', promiseGenerator);

function promiseGenerator(e) {
  e.preventDefault();

  const delay = parseInt(e.target.delay.value);
  const status = e.target.state.value;

  if (isNaN(delay) || delay <= 0) {
    iziToast.error({
      message: 'Please enter a valid delay time.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      iconColor: '#fff',
    });
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageSize: '16',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#326101',
        iconColor: '#fff',
        iconUrl: successImageUrl,
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        messageSize: '16',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        close: true,
        closeOnEscape: true,
        closeOnClick: true,
        progressBar: true,
        progressBarColor: '#ffbebe',
        iconUrl: rejectImageUrl,
        iconColor: '#fff',
      });
    });
}
