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
      document.getElementById("balance").textContent = jsonData[0].balance + ",- Ft";
    })
    .catch(error => {
      console.log("can't get the balance");
      console.log(error);
    });
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
  const months = {
    "01": "január",
    "02": "február",
    "03": "március",
    "04": "április",
    "05": "május",
    "06": "június",
    "07": "július",
    "08": "augusztus",
    "09": "szeptember",
    "10": "október",
    "11": "november",
    "12": "december"
  }

  for (const month in months) {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = months[month];
    dropDownMenu.appendChild(option);
  }
}


function addCostFormSubmit(event) {
  event.preventDefault();
}

function submitPassword() {
  const passwordElements = document.getElementsByClassName("passwordField");
  if (passwordElements && passwordElements.length == 1) {
    const password = passwordElements[0].value;

    if( modalTrigger == "cost") {
      console.log("a create cost fog meghívódni");
      createCost(password);
    } else if (modalTrigger == "payment") {
      console.log("a create payment fog meghívódni");
      // TODO: add createPayment
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


let modalTrigger = "";
// get the triggering button of the modal
let modalElement = document.getElementsByClassName("modal");
if (modalElement) {
  modalElement[0].addEventListener('show.bs.modal', (event) => {
    const triggeringButton = event.relatedTarget;
    const classAttributes = triggeringButton.getAttribute("class");
    if (classAttributes.includes("cost")) {
      modalTrigger = "cost";
    } else if (classAttributes.includes("payment")) {
      modalTrigger = "payment";
    }
  });
}
