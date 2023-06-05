import { updateBalance, createTableRow, convertDate, formatAmount } from './utility.js'


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
