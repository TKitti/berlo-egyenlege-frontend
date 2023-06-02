function initializeOnWindowsLoad() {
  getBalance();
  setMonths();
  getCosts();
}

const baseUrl = "https://berlo-egyenlege-backend.vercel.app";
const requestParams = {
  headers: {
    "Content-Type": "application/json"
  }
}

async function getBalance() {
  await fetch(`${baseUrl}/balance`, requestParams)
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
  
  await fetch(`${baseUrl}/costs`, requestParams)
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
    "january": "január",
    "february": "február",
    "march": "március",
    "april": "április",
    "mai": "május",
    "june": "június",
    "july": "július",
    "august": "augusztus",
    "september": "szeptember",
    "october": "október",
    "november": "november",
    "december": "december"
  }

  for (const month in months) {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = months[month];
    dropDownMenu.appendChild(option);
  }
}


function addCostFormSubmit(event, form) {
  event.preventDefault();

  const month = document.getElementById("month-selection").value;
  const amount = document.getElementById("amount").value;

  if(month && amount) {
    // TODO: http request + handle response
    //form.submit();
    //fetch(baseUrl + form.action, {method:'post', body: new FormData(form)});

  } else {
    // TODO: error message for user
  }
}
