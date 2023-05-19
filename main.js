function initializeOnWindowsLoad() {
  getBalance();
  setMonths();
}

const baseUrl = "https://berlo-egyenlege-backend.vercel.app";
const url = "https://berlo-egyenlege-backend.vercel.app/balance";
const requestParams = {
  headers: {
    "Content-Type": "application/json"
  }
}

async function getBalance() {
  await fetch(url, requestParams)
    .then(async response => {      
      const jsonData = await response.json();
      console.log(jsonData);
      document.getElementById("balance").textContent = jsonData[0].balance + ",- Ft";
    })
    .catch(error => {
      console.log("Something went wrong!");
      console.log(error);
    });
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
