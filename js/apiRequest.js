import { updateBalance, createTableRow, convertDate, formatAmount, handleModals } from './utility.js'

const baseUrl = "https://berlo-egyenlege-backend.vercel.app";
const requestParamsGetMethod = {
  headers: {
    "Content-Type": "application/json"
  }
}

export async function getBalance() {
  await fetch(`${baseUrl}/balance`, requestParamsGetMethod)
    .then(async response => {      
      const jsonData = await response.json();
      if (jsonData && jsonData.length > 0) updateBalance(jsonData[0].balance);
    })
    .catch(error => {
      console.log("can't get the balance: " + error);
  });
}


export async function getCosts() {
  let table = document.getElementById("cost-table");
  
  await fetch(`${baseUrl}/costs`, requestParamsGetMethod)
  .then(async response => {
    const jsonData = await response.json();
    
    if (jsonData) {
      jsonData.forEach(cost => {
        const date = convertDate(cost.date);
        const amount = formatAmount(cost.amount);
        createTableRow(2, table, [date, amount]);
      });
    } else {
      createTableRow(1, table, ["Nincs mit kifizetni."]);
    }
  })
  .catch(error => {
    console.log("can't get costs", error);
  });
}



export async function createCost(password) {
  const year = document.getElementById("year-selection").value;
  const month = document.getElementById("month-selection").value;
  const amount = document.getElementById("cost-amount").value;
  
  if (password && year && month && amount) {
    let payload = JSON.stringify({
      "password": password,
      "cost": {
        "date": year + "-" + month,
        "amount": amount
      }
    });

    const requestParams = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Basic " + btoa("password:" + password)
      }, 
      body: payload
    }

    await fetch(`${baseUrl}/cost`, requestParams)
    .then(async response => {
      if (response?.ok) {
        handleModals(true, "Sikeres rögzítés!");
      }
      if (response.status == 403) {
        handleModals(false, "Hibás jelszó!");
      }
    })
    .catch(() => {
      handleModals(false, "Jaj.. valami gikszer volt. Nem sikerült rögzíteni!");
    }); 
  }
}
