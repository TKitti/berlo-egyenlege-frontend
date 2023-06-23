export function updateBalance(balance) {
  let balanceElement = document.getElementById("balance");

  if((balance && !isNaN(balance)) || balance == 0) {
    balanceElement.textContent = formatAmount(Number(balance)) + " Ft";
    
    if (balance < 0) {
      balanceElement.style.color = "red";
    } else {
      balanceElement.style.color = "forestgreen";
    }
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

export function convertDate(date, format) {
  let newDate = new Date(date);
  let month = newDate.toLocaleDateString("hu", { month: "long" });
  return (format == "YYYY-MM") ? newDate.getFullYear() + ". " + month : newDate.getFullYear() + ". " + month + " " + newDate.getDay() + ".";
}

export function isValidDate(dateString) {
  var regEx1 = /^\d{4}-\d{2}$/;
  var regEx2 = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx1) != null || dateString.match(regEx2) != null;
}

export function convertStringToTimestamp(dateString) {
  return Date.parse(dateString);
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

export function showHideErrorMessage(field, errorMsg) {
  if (field.value == "") errorMsg.style.display = "block";
  else errorMsg.style.display = "none";
}

export function handleModals(isCreationSuccessful, confirmationMsg) {
  let passwordModal = bootstrap.Modal.getInstance(document.getElementById('givePasswordModal'));
  passwordModal.hide();
  let confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  confirmationModal.show();
  const confirmationMsgElement = document.getElementById("confirmation-msg");
  confirmationMsgElement.textContent = confirmationMsg;
  if (!isCreationSuccessful) confirmationMsgElement.style.color = "red";
}

export function clearInputField(element) {
  element.value = "";
}