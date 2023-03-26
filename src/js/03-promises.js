import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const button = document.querySelector('button[type="submit"]');

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

// =============================================

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (form) {
      resolve();
    } else {
      reject();
    }
  }, delayInput);
});
