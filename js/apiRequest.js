import { 
  updateBalance, 
  createTableRow, 
  convertDate, 
  isValidDate,
  convertStringToTimestamp, 
  formatAmount, 
  handleModals, 
} from './utility.js'


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
    
    if (jsonData && jsonData.length > 0) {
      jsonData.forEach(cost => {
        const date = convertDate(cost.date, "YYYY-MM");
        const amount = formatAmount(cost.amount);
        createTableRow(2, table, [date, amount]);
      });
    } else {
      createTableRow(2, table, ["Nincs mit kifizetni."]);
    }
  })
  .catch(error => {
    console.log("can't get costs", error);
  });
}

export async function getPayments() {
  let table = document.getElementById("payment-table");
  
  await fetch(`${baseUrl}/payments`, requestParamsGetMethod)
  .then(async response => {
    const jsonData = await response.json();
    
    if (jsonData && jsonData.length > 0) {
      jsonData.forEach(payment => {
        const date = convertDate(payment.date, "YYYY-MM-DD");
        const amount = formatAmount(payment.amount);
        createTableRow(2, table, [date, amount]);
      });
    } else {
      createTableRow(2, table, ["Nincsenek befizetések."]);
    }
  })
  .catch(error => {
    console.log("can't get payments", error);
  });
}

export async function createCost(password) {
  const year = document.getElementById("year-selection").value;
  const month = document.getElementById("month-selection").value;
  const amount = document.getElementById("cost-amount").value;
  const date = isValidDate(year + "-" + month) ? convertStringToTimestamp(year + "-" + month) : handleModals(false, "Érvénytelen dátum!");
  
  if (password && year && month && amount) {
    let payload = JSON.stringify({
      "password": password,
      "cost": {
        "date": date,
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


export async function createPayment(password, selectedDate) {
  const date = isValidDate(selectedDate) ? convertStringToTimestamp(selectedDate) : handleModals(false, "Érvénytelen dátum!");
  const amount = document.getElementById("payment-amount").value;
  
  if (password && date && amount) {
    let payload = JSON.stringify({
      "password": password,
      "payment": {
        "date": date,
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

    await fetch(`${baseUrl}/payment`, requestParams)
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
