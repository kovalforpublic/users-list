const addButton = document.querySelector('form > button')
addButton.addEventListener('click', addUser);

const form = document.querySelector('form');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');

function updateField(event) {
    const td = event.target.closest('td');
    const currentRow = event.target.closest('tr');
    const statusTD = currentRow.querySelector('td[headers=status]');
    if (td.headers !== 'status' &&
        td.headers !== 'action' &&
        event.toElement.nodeName !== "BUTTON") {
            const newName = prompt('Enter new name: ', td.innerHTML);
            td.innerHTML = newName;
        } else if (td.headers === 'action') {
            const button = event.toElement;
            switch (button.innerHTML) {
                case 'Activate': 
                    statusTD.innerHTML = 'true';
                    button.innerHTML = 'Inactivate';
                    break;
                case 'Inactivate':
                    statusTD.innerHTML = 'false';
                    button.innerHTML = 'Activate';
                    break;
                case 'Remove':
                    removeUser(currentRow);
                    break;
            }
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
    const removeBtn = generateActionButton('Remove');

    const actionTD = generateTableData('', 'action');
    actionTD.appendChild(activateBtn);
    actionTD.appendChild(removeBtn);

    const tr = document.createElement('tr');
    tr.addEventListener('click', updateField);

    tr.appendChild(nameTD);
    tr.appendChild(emailTD);
    tr.appendChild(phoneTD);
    tr.appendChild(statusTD);
    tr.appendChild(actionTD);
    return tr;
}
function generateTableData(value, headers) {
    const td = document.createElement('td');
    td.innerHTML = value;
    td.headers = headers;
    return td;
}
function generateActionButton(title) {
    const button = document.createElement('button');
    button.textContent = title;
    return button;
}
function removeUser(currentRow) {
    const id = currentRow.rowIndex;
    table.deleteRow(id);
}
