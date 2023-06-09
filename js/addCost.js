import { createCost  } from "./apiRequest.js";
import { setMonths, showHideErrorMessage } from "./utility.js";

window.onload = () => {
  setMonths();
};


let modalTrigger = "";
const costAmountInputField = document.getElementById("cost-amount");
const costAmountErrorMsgElement = document.getElementById("cost-amount-error-msg");
const togglePasswordIcon = document.getElementById("togglePassword");
const passwordElement = document.getElementById("password");
const passwordErrorMsgElement = document.getElementById("pw-error-msg");
const passwordModal = document.getElementById('givePasswordModal');


// we need the attach the function to the window to be able to use it globally
// the modularization (the multiple js files) messes up the click events
window.addCostFormSubmit = () => {
  modalTrigger = "cost";
  let modal = new bootstrap.Modal(document.getElementById('givePasswordModal'));
  const amount = costAmountInputField.value;

  if (amount) {
    modal.show();
  } else {
    costAmountErrorMsgElement.style.display = "block";
  }
}

window.submitPassword = () => {
  if (passwordElement) {
    const password = passwordElement.value;
    
    if (password) {
      if (modalTrigger == "cost") {
        createCost(password);
      } else if (modalTrigger == "payment") {
        // TODO: add createPayment
      }
    } else {
      passwordErrorMsgElement.style.display = "block";
    }
  }
}


// ******************************* EVENT LISTENERS *******************************

costAmountInputField.addEventListener('keyup', function() {
  showHideErrorMessage(this, costAmountErrorMsgElement);  
}, 
false
);

costAmountInputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addCostFormSubmit();
  }
});

passwordElement.addEventListener('keyup', function() {
  showHideErrorMessage(this, passwordErrorMsgElement);  
}, 
false
);

passwordElement.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitPassword();
  }
});

// show-hide password
togglePasswordIcon.addEventListener('click', () => {
  const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordElement.setAttribute('type', type);
  togglePassword.classList.toggle('bi-eye');
});

passwordModal.addEventListener('hidden.bs.modal', function () {
  passwordElement.value = "";
  passwordErrorMsgElement.style.display = "none";
});