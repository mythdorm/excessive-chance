const diceTypes = ["d4", "d6","d8", "d10", "d12", "d20"];

// This could be used if I want to end up testing the feel of true randomness quickly
// const trueRandom = false;

const resultArea = document.getElementById("results");
let cols = 0;
const maxPerCol = 10;

let start = '';
let opp = "";

const resultCount = {
    Heads: {count: 0},
    Tails: {count: 0}
};

let heads = 0;
let tails = 0;

function gamble() {
    const choice = document.getElementById("options").value;
    const count = document.getElementById("count").value;
    resultCount.Heads.count = 0;
    resultCount.Tails.count = 0;
    const startTime = performance.now();
    for (let i = 0; i < count; i++) {
        if (!resultArea.lastChild || resultArea.lastChild.childNodes.length > maxPerCol) {
            const row = document.createElement("div");
            row.className = "row";
            resultArea.appendChild(row);
        }
        if (choice === "coins") {
            const result = flip();
            // const coin = document.createElement("div");
            // coin.textContent = result;
            // coin.id = "coin"
            const coin = document.createElement("img");
            coin.id = "coin";
            coin.src = `/assets/${result}_Coin.png`;
            resultArea.lastChild.appendChild(coin);
            console.log(`${choice} ${i} ${result}`);
        } else if (choice === "dice") {
            console.log(`${choice} ${i}`);
        } else if (choice === "cards") {
            console.log(`${choice} ${i}`);
        } else {
            console.log(`ERROR: selected choice of gamble is not possible`);
        }
    }
    const endTime = performance.now();
    console.log(`Heads: ${resultCount.Heads.count}; Tails: ${resultCount.Tails.count}; Staring side: ${start}`);
    console.log(`Time to complete ${count} gambles: ${endTime - startTime} ms`);
    chooseStart();
}

function flip () {
    const rand = Math.random();
    if (rand < .49) {
        resultCount[opp].count++;
        return opp;
    } else if (rand >= .49) {
        resultCount[start].count++;
        return start;
    }
}

function checkType(choice) {

    const secondaryChoice = document.getElementById("secondary");

    while (secondaryChoice.firstChild) {
        secondaryChoice.lastChild.remove();
    }

    if (choice.value === "dice") {
        const newChoice = document.createElement("select");
        newChoice.id = "secondaryOption";

        const choiceLabel = document.createElement("label");
        choiceLabel.textContent = "Dice Type: ";

        for (const type of diceTypes) {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            newChoice.appendChild(option);
        }

        choiceLabel.appendChild(newChoice);
        secondaryChoice.appendChild(choiceLabel);
    }
}

// Since it is slightly more likely for a coin flip to land on the side that it started on, this simulates that human element
// For performance reasons, this shouldn't be run inside the coin flipping loop
function chooseStart () {
    const rand = Math.random();
    if (rand < .5) {
        start = "Tails";
        opp = "Heads";
    } else {
        start = "Heads";
        opp = "Tails";
    }
    console.log(start);
}

document.getElementById("options").value = "coins";
document.getElementById("count").value = 1;

chooseStart();