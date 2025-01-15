
const gebruikers = [
    { username: "admin", password: "admin123" },
    { username: "gebruiker1", password: "wachtwoord1" },
    { username: "gebruiker2", password: "wachtwoord2" }
];

function toonSectie(event, sectieId) {
    event.preventDefault();

    let secties = document.querySelectorAll("section");
    secties.forEach((sectie) => {
        sectie.style.display = "none";
    });

    let sectie = document.getElementById(sectieId);
    if (sectie) {
        sectie.style.display = "block";
    }
}

function valideerInlog(event) {
    event.preventDefault();

    const gebruikersnaam = document.getElementById("username").value;
    const wachtwoord = document.getElementById("password").value;

    const gebruikerGevonden = gebruikers.some(
        (gebruiker) =>
            gebruiker.username === gebruikersnaam && gebruiker.password === wachtwoord
    );

    if (gebruikerGevonden) {
        window.location.href = "dashboard.html"; 
    } else {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
    }
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", valideerInlog);
}

const rekeningen = [
    { naam: "Spaarrekening", saldo: 1500 },
    { naam: "Betaalrekening", saldo: 250 },
];

let transactions = [];

function populateDropdowns() {
    const fromAccountDropdown = document.getElementById("fromAccount");
    const toAccountDropdown = document.getElementById("toAccount");

    fromAccountDropdown.innerHTML = '<option value="">Selecteer een rekening</option>';
    toAccountDropdown.innerHTML = '<option value="">Selecteer een rekening</option>';

    rekeningen.forEach((rekening, index) => {
        const optionFrom = document.createElement("option");
        optionFrom.value = index;
        optionFrom.textContent = `${rekening.naam} (€${rekening.saldo.toFixed(2)})`;
        fromAccountDropdown.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = index;
        optionTo.textContent = `${rekening.naam} (€${rekening.saldo.toFixed(2)})`;
        toAccountDropdown.appendChild(optionTo);
    });
}

function toonRekeningen() {
    const overzicht = document.getElementById("rekening-overzicht");
    overzicht.innerHTML = "";

    rekeningen.forEach((rekening) => {
        const rekeningDiv = document.createElement("div");
        rekeningDiv.classList.add("rekening");
        rekeningDiv.innerHTML = `
            <p>${rekening.naam}</p>
            <p>Saldo: €${rekening.saldo.toFixed(2)}</p>
        `;
        overzicht.appendChild(rekeningDiv);
    });
}

function addTransaction(type, bedrag, rekeningNaam) {
    const currentDate = new Date().toISOString().split("T")[0];
    const newTransaction = {
        datum: currentDate,
        type: type,
        bedrag: parseFloat(bedrag),
        rekening: rekeningNaam,
    };

    transactions.push(newTransaction);
    updateTransactionTable();
}

function updateTransactionTable() {
    const transactionTableBody = document.getElementById("transaction-table-body");
    transactionTableBody.innerHTML = "";

    transactions.forEach((transaction) => {
        const row = document.createElement("tr");

        const datumCell = document.createElement("td");
        datumCell.textContent = transaction.datum;
        row.appendChild(datumCell);

        const typeCell = document.createElement("td");
        typeCell.textContent = transaction.type;
        row.appendChild(typeCell);

        const rekeningCell = document.createElement("td");
        rekeningCell.textContent = transaction.rekening;
        row.appendChild(rekeningCell);

        const bedragCell = document.createElement("td");
        bedragCell.textContent = `${transaction.bedrag.toFixed(2)} €`;
        row.appendChild(bedragCell);

        transactionTableBody.appendChild(row);
    });
}

document.getElementById("transferForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fromAccountIndex = parseInt(document.getElementById("fromAccount").value);
    const toAccountIndex = parseInt(document.getElementById("toAccount").value);
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(fromAccountIndex) || isNaN(toAccountIndex) || fromAccountIndex === toAccountIndex || amount <= 0) {
        alert("Controleer je invoer!");
        return;
    }

    const fromAccount = rekeningen[fromAccountIndex];
    const toAccount = rekeningen[toAccountIndex];

    if (amount > fromAccount.saldo) {
        alert("Onvoldoende saldo!");
        return;
    }

    fromAccount.saldo -= amount;
    toAccount.saldo += amount;

    addTransaction("uitgaand", -amount, fromAccount.naam);
    addTransaction("inkomend", amount, toAccount.naam);

    populateDropdowns();
    toonRekeningen();
});

window.onload = function () {
    populateDropdowns();
    toonRekeningen();
};

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const sellButtons = document.querySelectorAll('.sell-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityInput = button.closest('form').querySelector('input');
            const quantity = parseInt(quantityInput.value) || 0;
            if (quantity > 0) {
                alert(`Je hebt ${quantity} aandelen gekocht!`);
                quantityInput.value = '';
            } else {
                alert('Voer een geldig aantal in.');
            }
        });
    });

    sellButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityInput = button.closest('form').querySelector('input');
            const quantity = parseInt(quantityInput.value) || 0;
            if (quantity > 0) {
                alert(`Je hebt ${quantity} aandelen verkocht!`);
                quantityInput.value = '';
            } else {
                alert('Voer een geldig aantal in.');
            }
        });
    });
});
