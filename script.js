const gebruikers = [
    { username: "admin", password: "admin123" },
    { username: "gebruiker1", password: "wachtwoord1" },
    { username: "gebruiker2", password: "wachtwoord2" }
];

function toonSectie(event, sectieId) {
    event.preventDefault();

    console.log("Sectie overschakelen naar:", sectieId);

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
        console.log("Inloggen succesvol!");
        window.location.href = "dashboard.html"; 
    } else {
        console.log("Onjuiste inloggegevens.");
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
    }
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", valideerInlog);
}

window.onload = function () {
    setTimeout(function () {
        const rekeningenSectie = document.getElementById("rekeningen");
        if (rekeningenSectie) {
            rekeningenSectie.style.display = "none";
        }
    }, 5000);
};

const rekeningen = [
    { naam: "Spaarrekening", saldo: 1500 },
    { naam: "Betaalrekening", saldo: 250 },
];

// Functie om de dropdowns te vullen
function populateDropdowns() {
    const fromAccountDropdown = document.getElementById("fromAccount");
    const toAccountDropdown = document.getElementById("toAccount");

    // Reset de dropdowns
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

// Functie om het overzicht van rekeningen te tonen
function toonRekeningen() {
    const overzicht = document.getElementById("rekening-overzicht");
    overzicht.innerHTML = ""; // Reset het overzicht

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

// Functie om een transactie uit te voeren
document.getElementById("transferForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fromAccountIndex = parseInt(document.getElementById("fromAccount").value);
    const toAccountIndex = parseInt(document.getElementById("toAccount").value);
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(fromAccountIndex) || isNaN(toAccountIndex)) {
        alert("Selecteer een geldige rekening.");
        return;
    }

    if (fromAccountIndex === toAccountIndex) {
        alert("Van rekening en naar rekening mogen niet hetzelfde zijn!");
        return;
    }

    if (amount <= 0) {
        alert("Voer een geldig bedrag in!");
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

    const messageContainer = document.createElement("div");
    messageContainer.textContent = `€${amount.toFixed(2)} is succesvol overgeschreven van ${fromAccount.naam} naar ${toAccount.naam}`;
    messageContainer.style.color = "green";
    document.body.appendChild(messageContainer);

    populateDropdowns(); // Update de dropdowns
    toonRekeningen(); // Update het saldo-overzicht
});

// Initialiseer dropdowns en saldo-overzicht bij het laden van de pagina
window.onload = function () {
    populateDropdowns();
    toonRekeningen();
};
