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
