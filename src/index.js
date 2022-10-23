import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './js/currency.js';

//Business Logic

function getCurrency(choice1, choice2, amount) {
  Currency.getCurrency(choice1, choice2, amount)
    .then(function(response) {
      if (response.result==="success") {
        printElements(response, choice1, choice2, amount);
      } else {
        printError(response, choice1, choice2, amount);
      }
    });
}

// UI Logic

function printElements(response, choice1, choice2, amount) {
  document.querySelector('#showResponse').innerText = `${amount} in ${choice1} is ${response["conversion_result"]} in ${choice2}.`;
}

function printError(error, choice1, choice2, amount) {
  document.querySelector('#showResponse').innerText = `There was an error processing the ${amount} of ${choice1} in to ${choice2}. Please enter a valid ISO 4217 format, and try again:${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const choice1 = document.querySelector('#country1').value;
  document.querySelector('#country1').value = null;
  const choice2 = document.querySelector('#country2').value;
  document.querySelector('#country2').value = null;
  const amount = document.querySelector('#amount-to-change').value;
  document.querySelector('#amount-to-change').value = null;
  getCurrency(choice1, choice2, amount);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
