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
