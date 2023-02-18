"use strict";

const account1 = {
    owner: "Dariusz Cieśla",
    login: "darcie",
    pin: 1111
}

const account2 = {
    owner: "Mateusz Woś",
    login: "matwos",
    pin: 2222
}

const listOfAccounts = [account1, account2];



const loginButton = document.querySelector(".login--enter");
const loginInput = document.querySelector(".login--input");
const passwordInput = document.querySelector(".password--input");
const mainVisable = document.querySelector(".main");
const navbar = document.querySelector(".nav--bar");

let currentAccount;
document.na
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


loginButton.addEventListener("click", function (a) {
    a.preventDefault();
    loginFunction();
});