import { getBalance, getCosts, createCost  } from "./apiRequest.js";
import { setMonths } from "./utility.js";


window.onload = () => {
  getBalance();
  setMonths();
  getCosts();
};



let modalTrigger = "";

// we need the attach the function to the window to be able to use it globally
// the modularization (the multiple js files) messes up the click events
window.addCostFormSubmit = () => {
  modalTrigger = "cost";
  let passwordModal = new bootstrap.Modal(document.getElementById('givePasswordModal'));
  const amount = document.getElementById("amount").value;
  let errorMsg = document.getElementById("amount-error-msg");

  if (amount) {
    passwordModal.show();
    errorMsg.style.display = "none";
  } else {
    errorMsg.style.display = "block";
  }
}

window.submitPassword = () => {
  const passwordElement = document.getElementById("passwordField");
  if (passwordElement) {
    const password = passwordElement.value;
    let errorMsg = document.getElementById("pw-error-msg");

    if (password) {
      errorMsg.style.display = "none";

      if( modalTrigger == "cost") {
        console.log("a create cost fog meghívódni");
        createCost(password);
      } else if (modalTrigger == "payment") {
        console.log("a create payment fog meghívódni");
        // TODO: add createPayment
      }
    } else {
      errorMsg.style.display = "block";
    }
  }
}



// show-hide password
const togglePassword = document.getElementById("togglePassword");
const passwordElement = document.getElementById("passwordField");

togglePassword.addEventListener('click', () => {
  const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordElement.setAttribute('type', type);
  togglePassword.classList.toggle('bi-eye');
});
