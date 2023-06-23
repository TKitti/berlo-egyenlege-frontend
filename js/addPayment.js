import { createCost, createPayment  } from "./apiRequest.js";
import { showHideErrorMessage, clearInputField } from "./utility.js";

var selectedDate;

$(function() {
  $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
  $("#datepicker").on("change",function(){
      selectedDate = $(this).val();
      if (selectedDate != "") dateErrorMsgElement.style.display = "none";
  });
});


let modalTrigger = "";
const dateInputField = document.getElementById("datepicker");
const dateErrorMsgElement = document.getElementById("date-error-msg");
const paymentAmountInputField = document.getElementById("payment-amount");
const paymentAmountErrorMsgElement = document.getElementById("payment-amount-error-msg");
const togglePasswordIcon = document.getElementById("togglePassword");
const passwordElement = document.getElementById("password");
const passwordErrorMsgElement = document.getElementById("pw-error-msg");
const passwordModal = document.getElementById('givePasswordModal');


window.addPaymentFormSubmit = () => {
  modalTrigger = "payment";
  let modal = new bootstrap.Modal(document.getElementById('givePasswordModal'));
  const amount = paymentAmountInputField.value;

  if (amount && selectedDate) {
    modal.show();
  } else if(!amount && !selectedDate) {
    paymentAmountErrorMsgElement.style.display = "block";
    dateErrorMsgElement.style.display = "block";
  } else if(!amount) {
    paymentAmountErrorMsgElement.style.display = "block";
  } else if(!selectedDate) {
    dateErrorMsgElement.style.display = "block";
  } 
}

window.submitPassword = () => {
  if (passwordElement) {
    const password = passwordElement.value;
    
    if (password) {
      if (modalTrigger == "cost") {
        createCost(password);
      } else if (modalTrigger == "payment") {
        createPayment(password, selectedDate);
      }
      clearInputField(paymentAmountInputField);
      clearInputField(dateInputField);
    } else {
      passwordErrorMsgElement.style.display = "block";
    }
  }
}


// ******************************* EVENT LISTENERS *******************************

paymentAmountInputField.addEventListener('keyup', function() {
  showHideErrorMessage(this, paymentAmountErrorMsgElement);  
}, 
false
);

paymentAmountInputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addPaymentFormSubmit();
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
  clearInputField(passwordElement);
  passwordErrorMsgElement.style.display = "none";
});