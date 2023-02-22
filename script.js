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
    history: [122, 168, -129, -82, 76, -508, 298],
    accountNr: 12112019921824226612600001

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
const transferBtn = document.querySelector(".transfer");





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
            document.querySelector(".personal--account-nr").innerHTML = `${currentAccount.accountNr}`
        }

    })
    currentBalance(currentAccount);
    renderHistory(currentAccount);
    document.querySelector(".history--section").style.visibility = "visible";
    hiddenNavBarOn();
}

const hiddenNavBarOn = function () {
    document.querySelectorAll(".slow").forEach(function (b) {
        b.style.visibility = `visible`;

    })
}

const hiddenNavBarOff = function () {
    document.querySelectorAll(".slow").forEach(function (b) {
        b.style.visibility = `hidden`;

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
        const html = `<div class="movement">
            <div class="movement--type--${type}">${type}</div>
            <div class="movement--date">${randomDate()}</div>
            <div class="movement--value">${value} <span class="pln">PLN</span></div>
        </div>`;

        historyMovements.insertAdjacentHTML("afterend", html);
        // console.log(html)
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
                inner = `
                        <div class="contact--us">
                        <h2>Wyślij nam wiadomość </h2>
                        <input placeholder="wiadomość" class="send--us-input"> </input>
                        <button class="send--btn">Wyślij! </button>
                        </div>`
                createModal(inner);
            })
        } else if (a.innerHTML === "Przelewy") {
            a.addEventListener("click", function () {
                inner = `<div class="transfer--">
                        <h2> Przelew krajowy </h2>
                        <div class="transfer--div">
                        <input class="transfer--input-where" type="number" placeholder="Numer Konta"> </input>
                        <input class="transfer--input-amount" type="number" placeholder="Kwota"> </input>
                        <button class="transfer--btn"> > </button>                             
                        </div>
                        </div>`;
                createModal(inner);

                function transferMoney() {
                    const transferButton = document.querySelector(".transfer--btn")
                    const whereTransferInput = document.querySelector(".transfer--input-where");
                    const amountTransferInput = document.querySelector(".transfer--input-amount");
                    transferButton.addEventListener("click", function () {
                        const where = listOfAccounts.find(function (acc) {
                            return acc.accountNr === Number(whereTransferInput.value)
                        })
                        if (currentAccount.balance >= Number(amountTransferInput.value) && currentAccount.accountNr != where.accountNr) {
                            currentAccount.history.push(Number(-amountTransferInput.value));
                            where.history.push(Number(amountTransferInput.value))
                            const movs = document.querySelectorAll(".movement")
                            movs.forEach(function (a) {
                                a.remove();
                            })
                            currentBalance(currentAccount);
                            renderHistory(currentAccount);
                        }



                    })
                }
                transferMoney()
            })
        } else if (a.innerHTML === "Dla Ciebie") {
            a.addEventListener("click", function () {
                inner = `<h2> Opps, niestety nie mamy dla Ciebie żadnej spersonalizowanej oferty :( </h2>`
                createModal(inner);
            })
        }
    })
}



function logOutFunction() {
    logOutBtn.addEventListener("click", function () {
        currentAccount = {};
        const movs = document.querySelectorAll(".movement")
        movs.forEach(function (a) {
            a.remove();
        })
        console.log(currentAccount);
        mainVisable.style.visibility = "hidden";
        navbar.style.visibility = "visible";
        document.querySelector(".history--section").style.visibility = "hidden";
        hiddenNavBarOff();
    })
}


// ---------------------------------------- CODE--------------------------------

hiddenCategories(listOfHiddenCategories);
const hiddenBarStart = document.querySelectorAll(".hidden-bar-start");
const logOutBtn = document.querySelector(".active");


loginButton.addEventListener("click", function (a) {
    a.preventDefault();
    loginFunction();
    transferBtn.addEventListener("click", function () {
        let inner = `<div class="transfer--">
                        <h2> Przelew krajowy </h2>
                        <div class="transfer--div">
                        <input class="transfer--input" type="number" placeholder="Numer Konta"> </input>
                        <input class="transfer--input" type="number" placeholder="Kwota"> </input>
                        <button class="transfer--btn"> > </button>                             
                        </div>
                        </div>`;
        createModal(inner);

    })

    // console.log(transferButton);

});

showModal()
logOutFunction();

