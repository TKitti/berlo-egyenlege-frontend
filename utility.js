export function updateBalance(data) {
  let balanceElement = document.getElementById("balance");
  balanceElement.textContent = data[0].balance + ",- Ft";

  if (data[0].balance < 0) {
    balanceElement.style.color = "red";
  } else {
    balanceElement.style.color = "forestgreen";
  }
}

export function createTableRow(numberOfColumns, table, data) {
  const tableRow = document.createElement("tr");

  for (let i = 0; i < numberOfColumns; i++) {
    let tableCell = document.createElement("td");
    tableCell.textContent = data[i];
    tableRow.appendChild(tableCell);
  }

  table.appendChild(tableRow);
}

export function convertDate(date) {
  let newDate = new Date(date);
  let month = newDate.toLocaleString("hu", { month: "long" });
  return newDate.getFullYear() + ". " + month;
}

export function formatAmount(amount) {
  return new Intl.NumberFormat("de-DE").format(amount) + ",-";
}

export function setMonths() {
  let dropDownMenu = document.getElementById("month-selection");
  const months = ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"];

  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.value = i+1<10 ? "0"+(i+1) : i+1;
    option.textContent = months[i];
    dropDownMenu.appendChild(option);
  }
}