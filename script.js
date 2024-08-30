'use strict'
const billInput = document.querySelector('.bill-input');
const tipButtons = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('.custom');
const numPeopleInput = document.querySelector('.num-people');
const tipAmountDisplay = document.querySelector('.tip-total-amount .result:nth-child(1) .num');
const totalAmountDisplay = document.querySelector('.tip-total-amount .result:nth-child(2) .num');
const resetButton = document.querySelector('.btn');
const error=document.querySelector('.error');
const errorTwo=document.querySelector('.error-2');
const btnContainer=document.querySelector('.btn-container');
const btn=document.querySelector('.btn');

let bill = 0;
let tipPercent = 0;
let numPeople = 0;

function calculate() {
  // Only calculate if bill, tipPercent, and numPeople are valid
  if (bill > 0 && tipPercent > 0 && numPeople > 0) {
    const tipAmount = (bill * (tipPercent / 100)) / numPeople;
    const totalAmount = (bill / numPeople) + tipAmount;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;

    // Add classes for reset button styling
    btnContainer.classList.add('btn-container-color');
    btn.classList.add('btn-color');

    // Hide error messages
    error.classList.add('hidden');
    errorTwo.classList.add('hidden');
  } else {
    // Clear displayed amounts if inputs are not valid
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';

    // Show error messages based on the input values only after interaction
    if (numPeople === 0 && numPeopleInput.value !== '') {
      error.classList.remove('hidden');
    } else {
      error.classList.add('hidden');
    }

    if (bill === 0 && billInput.value !== '') {
      errorTwo.classList.remove('hidden');
    } else {
      errorTwo.classList.add('hidden');
    }

    // Remove reset button styles
    btnContainer.classList.remove('btn-container-color');
    btn.classList.remove('btn-color');
  }
}

// Event listeners for inputs
billInput.addEventListener('input', function () {
  bill = parseFloat(billInput.value);
  errorTwo.classList.add('hidden');  // Hide error when input starts
  calculate();  // Only calculate if all conditions are met
});

tipButtons.forEach(button => {
  button.addEventListener('click', function () {
    tipPercent = parseFloat(button.textContent);
    tipButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    customTipInput.value = '';
    calculate();
  });
});

customTipInput.addEventListener('input', function () {
  tipPercent = parseFloat(customTipInput.value);
  tipButtons.forEach(btn => btn.classList.remove('selected'));
  calculate();
});

numPeopleInput.addEventListener('input', function () {
  numPeople = parseFloat(numPeopleInput.value);
  error.classList.add('hidden');  // Hide error when input starts
  calculate();
});

// Reset button logic
resetButton.addEventListener('click', function () {
  billInput.value = '';
  tipButtons.forEach(btn => btn.classList.remove('selected'));
  customTipInput.value = '';
  numPeopleInput.value = '';
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  btnContainer.classList.remove('btn-container-color');
  btn.classList.remove('btn-color');
  bill = 0;
  tipPercent = 0;
  numPeople = 0;
  error.classList.add('hidden');
  errorTwo.classList.add('hidden');
});
