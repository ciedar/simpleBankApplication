"use strict";

// ------------------------------- DATA -----------------------------------

const account1 = {
    owner: "Dariusz Cieśla",
    login: "darcie",
    pin: 1111,
    history: [122, 1698, -129, -872, 76, -50, 5298],
    accountNr: "42 1660 1422 1824 2466 1200 0001"
}

const account2 = {
    owner: "Mateusz Woś",
    login: "matwos",
    pin: 2222,
    history: [122, 168, -129, -82, 76, -508, 298]
}



const listOfHiddenCategories = ["Wyloguj", "Przelewy", "Moje Finanse", "Historia", "Dla Ciebie", "Kontakt"];



const listOfAccounts = [account1, account2];

let currentAccount;
const loginButton = document.querySelector(".login--enter");
const loginInput = document.querySelector(".login--input");
const passwordInput = document.querySelector(".password--input");
const mainVisable = document.querySelector(".main");
const navbar = document.querySelector(".nav--bar");
const hiddenProfile = document.querySelector(".hidden--after");
const hiddenBar = document.querySelector(".hidden--bar");
const historyMovements = document.querySelector(".history--movements");
// const hiddenBarStart = document.querySelectorAll(".hidden-bar-start");
// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const closeModalBtn = document.querySelector(".close-modal");

// -----------------------------FUNCTIONS -----------------------




const randomDate = function () {
    const a = Math.trunc(Math.random(1) * 31);
    const b = Math.trunc(Math.random(1) * 12);
    const c = 2023
    return `${a}-${b}-${c}`;
}



const currentBalance = function (account) {
    account.balance = account.history.reduce(function (value1, value2) {
        return value1 + value2;
    })
    document.querySelector(".current--balance").textContent = `${account.balance} PLN`;
}




const loginFunction = function () {
    listOfAccounts.find(function (current) {
        if (loginInput.value === current.login & Number(passwordInput.value) === current.pin) {
            currentAccount = current;
            console.log(currentAccount);
            mainVisable.style.visibility = "visible";
            navbar.style.visibility = "hidden";
        }

    })
}


const hiddenCategories = function (list) {
    let category
    hiddenBar.innerHTML = "";
    for (let i = 0; i < listOfHiddenCategories.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = listOfHiddenCategories[i] === "Wyloguj" ? `<button class="hidden-bar-start active slow">${listOfHiddenCategories[i]}</button>` : `<a href="#" class="hidden-bar-start slow">${listOfHiddenCategories[i]}</a>`;
        // `<a href="#" class="hidden-bar-start">${listOfHiddenCategories[i]}</a>`;
        // console.log(category);
        hiddenBar.appendChild(div);
    }
}


const renderHistory = function (account) {
    let type;
    historyMovements.innerHTML = "";
    account.history.filter(function (value) {
        type = value > 0 ? "wpłata" : "wypłata";
        console.log(type);
        const html = `<div class="movement">
            <div class="movement--type--${type}">${type}</div>
            <div class="movement--date">${randomDate()}</div>
            <div class="movement--value">${value} <span class="pln">PLN</span></div>
        </div>`;

        historyMovements.insertAdjacentHTML("afterend", html);
        console.log(html)
    })
}

const createModal = function (innerHTML) {
    const modal = document.createElement("div");
    const overlay = document.createElement("div");
    modal.classList.add("modal");
    overlay.classList.add("overlay");
    modal.innerHTML = `${innerHTML}`;
    document.body.append(overlay);
    document.body.append(modal);

    overlay.addEventListener("click", function () {
        overlay.classList.add("hidden-modal");
        modal.classList.add("hidden-modal");
    })
}

const showModal = function () {
    let inner;
    hiddenBarStart.forEach(function (a) {
        if (a.innerHTML === "Moje Finanse") {
            a.addEventListener("click", function () {
                inner = `<h4>Konto Osobiste ${currentAccount.owner}</h4>
                <p>Numer Twojego konta: ${currentAccount.accountNr}</p>
                <p>Saldo: </p>
                <h3 class="current--balance">${currentAccount.balance} PLN</h3>`;
                createModal(inner);
            })
        } else if (a.innerHTML === "Kontakt") {
            a.addEventListener("click", function () {
                inner = `<h2>Wyślij nam wiadomość </h2>
                        <div class="contact--us">
                        <input placeholder="wiadomość"> </input>
                        <button class="send">Wyślij! </button>
                        </div>`
                createModal(inner);
            })
        } else if (a.innerHTML === "Przelewy") {
            a.addEventListener("click", function () {
                inner = `<div class="transfer">
                        <div class="transfer--div>
                        <input type="number"> </input>
                        <input type="number"> </input>   
                        <input type="number"> </input>                          
                        </div>
                        <div class="p--transfer-div">
                        <p>Gdzie?</p>
                        <p>Kwota</p>
                        </div>
                        </div>`;
                createModal(inner);

            })
        } else if (a.innerHTML === "Dla Ciebie") {
            a.addEventListener("click", function () {
                inner = `<h2> Opps, niestety nie mamy dla Ciebie żadnej spersonalizowanej oferty :( </h2>`
                createModal(inner);
            })
        }
    })
}


// ---------------------------------------- CODE--------------------------------


hiddenCategories(listOfHiddenCategories);

const hiddenBarStart = document.querySelectorAll(".hidden-bar-start");
console.log(hiddenBarStart)
loginButton.addEventListener("click", function (a) {
    a.preventDefault();
    loginFunction();
    currentBalance(currentAccount);
    // hiddenCategories(listOfHiddenCategories);
    document.querySelector(".history--section").style.visibility = "visible";
    renderHistory(currentAccount);
    document.querySelectorAll(".slow").forEach(function (b) {
        b.style.visibility = "visible";

    })
    showModal();
});






// const closeModal = function () {
//     closeModalBtn.addEventListener("click", function () {
//         overlay.classList.add("hidden");
//         modal.classList.add("hidden");
//     })
// }