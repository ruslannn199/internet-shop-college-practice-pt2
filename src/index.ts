import 'normalize.css';
import './assets/styles/styles.scss';

const radioBtnArr = ['r2', 'r3', 'r1'];
let i = 0;
window.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    i = (i + 1) % radioBtnArr.length;
    const radioBtn = <HTMLInputElement>document.getElementById(radioBtnArr[i]);
    radioBtn.checked = true;
  }, 7000);

  const radioBtns = document.querySelectorAll('.radio-btn');
  for (const btn of radioBtns) {
    btn.addEventListener('change', () => {
      i = parseInt(btn.getAttribute('id')!.slice(1), 10);
    })
  }
}, false);
