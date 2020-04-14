const tableRows = document.getElementsByTagName('tr');

const firstActivateButton = document.querySelector('button');
firstActivateButton.addEventListener('click', toggleStatus);

const firstRemoveButton = document.querySelectorAll('button')[1];
firstRemoveButton.addEventListener('click', removeUser);

for (let i = tableRows.length - 1; i > 0; i--) {
    tableRows[i].addEventListener('click', updateField);
}
const addButton = document.querySelector('form > button')
addButton.addEventListener('click', addUser);

const form = document.querySelector('form');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');

function updateField() {
    const td = event.target;
    if (td.headers !== 'status' &&
        td.headers !== 'action' &&
        event.toElement.nodeName !== "BUTTON") {
            const newName = prompt('Enter new name: ', td.innerHTML);
            td.innerHTML = newName;
        }
}
function addUser() {
    event.preventDefault();
    const nameInput = form.querySelector('input[id=name]').value;
    const emailInput = form.querySelector('input[id=email]').value;
    const phoneInput = form.querySelector('input[id=phone]').value;
    const tr = generateTableRow(nameInput, emailInput, phoneInput);
    tbody.appendChild(tr);
}
function generateTableRow(name, email, phone) {
    const nameTD = generateTableData(name, 'name');
    const emailTD = generateTableData(email, 'email');
    const phoneTD = generateTableData(phone, 'phone');
    const statusTD = generateTableData('false', 'status');

    const activateBtn = generateActionButton('Activate');
    activateBtn.addEventListener('click', toggleStatus);
    const removeBtn = generateActionButton('Remove');
    const actionTD = generateTableData('', 'action');
    actionTD.appendChild(activateBtn);
    actionTD.appendChild(removeBtn);

    const tr = document.createElement('tr');

    tr.appendChild(nameTD);
    tr.appendChild(emailTD);
    tr.appendChild(phoneTD);
    tr.appendChild(statusTD);
    tr.appendChild(actionTD);
    return tr;
}
function generateTableData(value, headers) {
    const td = document.createElement('td');
    console.log('td: ', td);
    td.innerHTML = value;
    td.headers = headers;
    return td;
}
function generateActionButton(title) {
    const button = document.createElement('button');
    button.textContent = title;
    return button;
}
function toggleStatus() {
    const currentRow = event.path[2];
    const statusTD = currentRow.querySelector('td[headers=status]');

    if (statusTD.innerHTML === 'true') {
        statusTD.innerHTML = 'false';
        this.textContent = 'activate'; // title for button
    } else {
        statusTD.innerHTML = 'true';
        this.textContent = 'Inactivate';
    }
}
function removeUser() {
    const currentRow = event.path[2]
    const id = currentRow.rowIndex;
    table.deleteRow(id);
}
