function initializeOnWindowsLoad() {
  getBalance();
  setMonths();
  getCosts();
}

const baseUrl = "https://berlo-egyenlege-backend.vercel.app";
const requestParamsGetMethod = {
  headers: {
    "Content-Type": "application/json"
  }
}

async function getBalance() {
  await fetch(`${baseUrl}/balance`, requestParamsGetMethod)
    .then(async response => {      
      const jsonData = await response.json();
      updateBalance(jsonData);
    })
    .catch(error => {
      console.log("can't get the balance");
      console.log(error);
    });
  }
  
  function updateBalance(data) {
    let balanceElement = document.getElementById("balance");
    balanceElement.textContent = data[0].balance + ",- Ft";

    if (data[0].balance < 0) {
      balanceElement.style.color = "red";
    } else {
      balanceElement.style.color = "forestgreen";
    }

  }

async function getCosts() {
  let table = document.getElementById("cost-table");
  
  await fetch(`${baseUrl}/costs`, requestParamsGetMethod)
  .then(async response => {
    const jsonData = await response.json();
    
    if (jsonData) {
      jsonData.forEach(cost => {
        const date = convertDate(cost.date);
        const amount = formatAmount(cost.amount);
        createTableRow(jsonData.length, table, [date, amount]);
      });
    } else {
      createTableRow(1, table, ["Nincs mit kifizetni."]);
    }
  })
  .catch(error => {
    console.log("can't get costs", error);
  });
}

function createTableRow(numberOfColumns, table, data) {
  const tableRow = document.createElement("tr");

  for (let i = 0; i < numberOfColumns; i++) {
    let tableCell = document.createElement("td");
    tableCell.textContent = data[i];
    tableRow.appendChild(tableCell);
  }

  table.appendChild(tableRow);
}

function convertDate(date) {
  let newDate = new Date(date);
  let month = newDate.toLocaleString("hu", { month: "long" });
  return newDate.getFullYear() + ". " + month;
}

function formatAmount(amount) {
  return new Intl.NumberFormat("de-DE").format(amount) + ",-";
}
  
  
function setMonths() {
  let dropDownMenu = document.getElementById("month-selection");
  const months = ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"];

  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.value = i+1<10 ? "0"+(i+1) : i+1;
    option.textContent = months[i];
    dropDownMenu.appendChild(option);
  }
}


let modalTrigger = "";

function addCostFormSubmit() {
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

function submitPassword() {
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

async function createCost(password) {
  const year = document.getElementById("year-selection").value;
  const month = document.getElementById("month-selection").value;
  const amount = document.getElementById("amount").value;
  

  if (password && year && month && amount) {
    /*
    const data = {
      "password": password,
      "cost": {
        "date": year + "-" + month,
        "amount": amount
      }
    }
    */
    const data = {
      "date": year + "-" + month,
      "amount": amount
    }

    const requestParams = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("password:" + password)
      }, 
      body: JSON.stringify(data)
    }

    console.log(data);

    await fetch(`${baseUrl}/cost`, requestParams)
    .then(async response => {
      const jsonData = await response.json();
  
      if (jsonData) {}
    })
    .catch(error => {
      console.log("can't create cost", error);
    }); 
  } else {
    console.log("password or amount or date is missing");
    // TODO: error message for user
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
