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

function toonRekeningen() {
    const overzicht = document.getElementById("rekening-overzicht");
    overzicht.innerHTML = "";

    rekeningen.forEach((rekening, index) => {
        const rekeningDiv = document.createElement("div");
        rekeningDiv.classList.add("rekening");
        rekeningDiv.innerHTML = `
            <p>${rekening.naam}</p>
            <p>Saldo: €${rekening.saldo.toFixed(2)}</p>
            <button onclick="verwijderRekening(${index})">Verwijderen</button>
        `;
        overzicht.appendChild(rekeningDiv);
    });
}

function verwijderRekening(index) {
    if (index >= 0 && index < rekeningen.length) {
        rekeningen.splice(index, 1);
        toonRekeningen();
    } else {
        console.error("Ongeldige index:", index);
    }
}


window.onload = toonRekeningen;

document.getElementById("nieuwe-rekening-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const naam = document.getElementById("rekening-naam").value;
    const saldo = parseFloat(document.getElementById("start-saldo").value);

    if (naam && !isNaN(saldo)) {
        rekeningen.push({ naam, saldo });
        toonRekeningen();
        document.getElementById("nieuwe-rekening-form").reset();
    }
});