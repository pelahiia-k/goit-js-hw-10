import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delayValue = Number(form.elements.delay.value);
  const stateValue = form.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      stateValue === 'fulfilled' ? resolve(delayValue) : reject(delayValue);
    }, delayValue);
  })
    .then(ms => {
      iziToast.success({
        message: `Fulfilled promise in ${ms}ms`,
        position: 'topRight',
      });
    })
    .catch(ms => {
      iziToast.error({
        message: `Rejected promise in ${ms}ms`,
        position: 'topRight',
      });
    });
});
