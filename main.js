import { getBalance, getCosts, createCost  } from "./apiRequest.js";
import { setMonths, showHideErrorMessage } from "./utility.js";


window.onload = () => {
  getBalance();
  setMonths();
  getCosts();
};



let modalTrigger = "";
const costAmountInputField = document.getElementById("cost-amount");
const costAmountErrorMsgElement = document.getElementById("cost-amount-error-msg");
const togglePasswordIcon = document.getElementById("togglePassword");
const passwordElement = document.getElementById("password");
const passwordErrorMsgElement = document.getElementById("pw-error-msg");


// we need the attach the function to the window to be able to use it globally
// the modularization (the multiple js files) messes up the click events
window.addCostFormSubmit = () => {
  modalTrigger = "cost";
  let passwordModal = new bootstrap.Modal(document.getElementById('givePasswordModal'));
  const amount = costAmountInputField.value;

  if (amount) {
    passwordModal.show();
  } else {
    costAmountErrorMsgElement.style.display = "block";
  }
}

window.submitPassword = () => {
  if (passwordElement) {
    const password = passwordElement.value;
    
    if (password) {
      if( modalTrigger == "cost") {
        console.log("a create cost fog meghívódni");
        createCost(password);
      } else if (modalTrigger == "payment") {
        console.log("a create payment fog meghívódni");
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

passwordElement.addEventListener('keyup', function() {
    showHideErrorMessage(this, passwordErrorMsgElement);  
  }, 
  false
);

// show-hide password
togglePasswordIcon.addEventListener('click', () => {
  const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordElement.setAttribute('type', type);
  togglePassword.classList.toggle('bi-eye');
});
