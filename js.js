document.addEventListener("DOMContentLoaded", createBoard);
const board = document.getElementsByClassName("board")[0];
const shuffleBtn = document.getElementsByClassName("startOverBtn")[0];
const cards = document.getElementsByClassName("card");
// const cards = board.children;
const result = document.querySelector("p span")


let img = ["/asset/img/1.png", "/asset/img/1.png", "/asset/img/2.png", "/asset/img/2.png", "/asset/img/3.png", "/asset/img/3.png", "/asset/img/4.png", "/asset/img/4.png", "/asset/img/5.png", "/asset/img/5.png", "/asset/img/6.png", "/asset/img/6.png"];
let currCard = [];
let currId = [];
let wonCards = [];



//CREATE BOARD and Shufle CARDS:


function createBoard() {
    for (let i = 0; i < 12; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", i);
        board.appendChild(card);
        card.addEventListener("click", flipCard);
    }
    shuffleCard();
}

function shuffleCard() {
    for (let i = 0; i < img.length; i++) {
        const length = img.length - 1;
        let lastCard = img[length];
        let random = Math.floor(Math.random() * 12);
        img[length] = img[random];
        img[random] = lastCard;
        board.children[i].style.backgroundImage = "url(/asset/img/back.png)";
        board.children[i].addEventListener("click", flipCard);
    }
    currCard = [];
    currId = [];
    wonCards = [];
    result.innerHTML = " 0";
}
shuffleBtn.addEventListener("click", shuffleCard);

function flipCard() {
    currCard.push(img[this.id])
    currId.push(this.id)
    this.style.backgroundImage = `url(${img[this.id]})`
    if (currId.length === 2) {
        setTimeout(compareCards, 500);
    }
}

function compareCards() {
    let p = document.createElement("p");
    //array: index 0: picture name
    //array: index 1: picture place
    let fCard = [currCard[0], currId[0]];
    let sCard = [currCard[1], currId[1]];

    //cilcked the same card twice
    if (fCard[1] === sCard[1]) {
        p.innerHTML = "click another card";
        p.style.color = "red";
        result.appendChild(p);
        cards[fCard[1]].style.backgroundImage = "url(/asset/img/back.png)";
    } else if (fCard[0] === sCard[0]) {
        wonCards.push(fCard[0]);
        cards[fCard[1]].style.backgroundImage = "url(/asset/img/color.png)";
        cards[sCard[1]].style.backgroundImage = "url(/asset/img/color.png)";

        cards[fCard[1]].removeEventListener("click", flipCard);
        cards[sCard[1]].removeEventListener("click", flipCard);

        result.innerHTML = `${wonCards.length}`;
    } else {
        cards[sCard[1]].style.backgroundImage = "url(/asset/img/back.png)";
        cards[fCard[1]].style.backgroundImage = "url(/asset/img/back.png)";

    }
    currId = [];
    currCard = [];
    if (wonCards.length === img.length / 2) {
        p.innerHTML = "you won";
        p.style.color = "Blue";
        result.appendChild(p);
    }
}