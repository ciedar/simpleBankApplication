"use strict";

// ------------------------------- DATA -----------------------------------

const account1 = {
    owner: "Dariusz Cieśla",
    login: "darcie",
    pin: 1111,
    history: [122, 1698, -129, -872, 76, -50, 5298]
}

const account2 = {
    owner: "Mateusz Woś",
    login: "matwos",
    pin: 2222,
    history: [122, 168, -129, -82, 76, -508, 298]
}



const listOfHiddenCategories = ["Start", "Przelewy", "Moje Finanse", "Historia", "Usługi", "Dla Ciebie", "Kontakt"];



const listOfAccounts = [account1, account2];

let currentAccount;
const loginButton = document.querySelector(".login--enter");
const loginInput = document.querySelector(".login--input");
const passwordInput = document.querySelector(".password--input");
const mainVisable = document.querySelector(".main");
const navbar = document.querySelector(".nav--bar");

const hiddenBar = document.querySelector(".hidden--bar");
const historyMovements = document.querySelector(".history--movements");




// -----------------------------FUNCTIONS -----------------------

// const renderHistory = function (account) {
//     let type;

//     account.history.filter(function (value) {
//         console.log(value)
//     })
// }

// renderHistory(currentAccount);



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

    hiddenBar.innerHTML = "";
    for (let i = 0; i < listOfHiddenCategories.length; i++) {
        const category = `<a href="#" class="hidden-bar-start">${listOfHiddenCategories[i]}</a>`;
        console.log(category);
        hiddenBar.insertAdjacentHTML("beforeend", category);
    }
}










// ---------------------------------------- CODE--------------------------------



loginButton.addEventListener("click", function (a) {
    a.preventDefault();
    loginFunction();
    currentBalance(currentAccount);
    hiddenCategories(listOfHiddenCategories);
    document.querySelector(".history--section").style.visibility = "visible";
    renderHistory(currentAccount);
});


const renderHistory = function (account) {
    let type;
    historyMovements.innerHTML = "";
    account.history.filter(function (value) {
        type = value > 0 ? "Wpłata" : "Wypłata";
        console.log(type);
        const html = `<div class="movement">
            <div class="movement--type">${type}</div>
            <div class="movement--date">Wczoraj</div>
            <div class="movement--value">${value}</div>
        </div>`;

        historyMovements.insertAdjacentHTML("afterend", html);
    })
}

