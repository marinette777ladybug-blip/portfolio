const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


/* =========================
   GAME VARIABLES
========================= */

let gameStarted = false;

let scene = "town";

let happiness = 50;

let energy = 100;

let minutes = 8 * 60;

let inventory = [];

let quest = 0;

let questionOpen = false;

let currentQuestion = null;


/* =========================
   HOME
========================= */

let breakfastDone = false;

let noteOpened = false;


/* =========================
   SHOP
========================= */

let walletFound = false;

let shopPuzzleSolved = false;


/* =========================
   CAFE
========================= */

let ingredients = [];

let cafeDone = false;


/* =========================
   PARK
========================= */

let parkClues = 0;

let parkClueItems = [];

let dogFound = false;


/* =========================
   HILL
========================= */

let hillSolved = false;


/* =========================
   PLAYER
========================= */

const player = {

    x: 500,

    y: 380,

    speed: 4

};


const keys = {};


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", function(event) {

    keys[event.key.toLowerCase()] = true;


    if (
        event.key.toLowerCase() === "e" &&
        gameStarted &&
        !questionOpen
    ) {

        interact();

    }

});


document.addEventListener("keyup", function(event) {

    keys[event.key.toLowerCase()] = false;

});


/* =========================
   START
========================= */

document.getElementById("startButton").onclick = function() {

    gameStarted = true;

    document.getElementById("startScreen").style.display = "none";

    showMessage(
        "☀️ Welcome to Sunny Town! Explore the town and create your Perfect Day."
    );

    updateQuest();

};


/* =========================
   NORMAL MESSAGE
========================= */

function showMessage(text) {

    document.getElementById("messageText").textContent = text;

}


/* =========================
   BIG TEMPORARY MESSAGE
========================= */

function showBigMessage(text, duration = 2500) {

    const box = document.getElementById("bigMessage");

    const textBox = document.getElementById("bigMessageText");

    textBox.textContent = text;

    box.style.display = "flex";


    setTimeout(function() {

        box.style.display = "none";

    }, duration);

}


/* =========================
   QUESTION SYSTEM
========================= */

function askQuestion(
    title,
    question,
    answerA,
    answerB,
    functionA,
    functionB
) {

    questionOpen = true;

    currentQuestion = {

        a: functionA,

        b: functionB

    };


    document.getElementById("questionTitle").textContent =
        title;


    document.getElementById("questionText").textContent =
        question;


    document.getElementById("answerA").textContent =
        answerA;


    document.getElementById("answerB").textContent =
        answerB;


    document.getElementById("questionPanel").style.display =
        "block";

}


document.getElementById("answerA").onclick = function() {

    if (currentQuestion && currentQuestion.a) {

        currentQuestion.a();

    }

    closeQuestion();

};


document.getElementById("answerB").onclick = function() {

    if (currentQuestion && currentQuestion.b) {

        currentQuestion.b();

    }

    closeQuestion();

};


function closeQuestion() {

    questionOpen = false;

    currentQuestion = null;

    document.getElementById("questionPanel").style.display =
        "none";

}


/* =========================
   MOVEMENT
========================= */

function movePlayer() {

    if (!gameStarted || questionOpen) {

        return;

    }


    if (keys["w"] || keys["arrowup"]) {

        player.y -= player.speed;

    }


    if (keys["s"] || keys["arrowdown"]) {

        player.y += player.speed;

    }


    if (keys["a"] || keys["arrowleft"]) {

        player.x -= player.speed;

    }


    if (keys["d"] || keys["arrowright"]) {

        player.x += player.speed;

    }


    player.x = Math.max(
        25,
        Math.min(canvas.width - 25, player.x)
    );


    player.y = Math.max(
        80,
        Math.min(canvas.height - 25, player.y)
    );

}


/* =========================
   TIME
========================= */

function updateTime() {

    if (gameStarted) {

        minutes += 0.05;

    }

}


function getTime() {

    let h = Math.floor(minutes / 60);

    let m = Math.floor(minutes % 60);

    let period = h >= 12 ? "PM" : "AM";

    let displayHour = h % 12;

    if (displayHour === 0) {

        displayHour = 12;

    }


    return (
        displayHour +
        ":" +
        String(m).padStart(2, "0") +
        " " +
        period
    );

}


/* =========================
   HUD
========================= */

function updateHUD() {

    document.getElementById("happiness").textContent =
        Math.round(happiness);


    document.getElementById("energy").textContent =
        Math.round(energy);


    document.getElementById("gameTime").textContent =
        getTime();


    updateInventory();

    updateBackButton();

}


/* =========================
   BACK BUTTON
========================= */

function updateBackButton() {

    const button =
        document.getElementById("backButton");


    if (scene === "town") {

        button.style.display = "none";

    }

    else {

        button.style.display = "block";

    }

}


function leaveScene() {

    if (scene === "town") {

        return;

    }


    scene = "town";

    player.x = 500;

    player.y = 380;


    showMessage(
        "🏙️ You returned to Sunny Town."
    );


    updateQuest();

}


/* =========================
   INVENTORY
========================= */

function addItem(item) {

    if (!inventory.includes(item)) {

        inventory.push(item);

    }

}


function hasItem(item) {

    return inventory.includes(item);

}


function updateInventory() {

    const box =
        document.getElementById("inventoryItems");


    if (inventory.length === 0) {

        box.textContent = "Empty";

        return;

    }


    box.innerHTML = inventory
        .map(item => "• " + item)
        .join("<br>");

}


/* =========================
   QUEST
========================= */

function updateQuest() {

    let text = "";


    if (quest === 0) {

        text = "🏠 Visit your HOME";

    }

    else if (quest === 1) {

        text = "🥞 Make breakfast";

    }

    else if (quest === 2) {

        text = "🏪 Visit SUNNY MART";

    }

    else if (quest === 3) {

        text = "👛 Find the mysterious wallet";

    }

    else if (quest === 4) {

        text = "🧩 Solve the supermarket puzzle";

    }

    else if (quest === 5) {

        text = "🍕 Help at the CAFÉ";

    }

    else if (quest === 6) {

        text = "🌳 Collect clues and find the missing dog";

    }

    else if (quest === 7) {

        text = "🌅 Discover the secret on the HILL";

    }

    else {

        text = "🏆 Complete your Perfect Day!";

    }


    document.getElementById("questText").textContent =
        text;

}


/* =========================
   DISTANCE
========================= */

function distance(x1, y1, x2, y2) {

    return Math.sqrt(
        (x2 - x1) ** 2 +
        (y2 - y1) ** 2
    );

}


/* =========================
   INTERACTION
========================= */

function interact() {

    if (scene === "town") {

        townInteract();

    }

    else if (scene === "home") {

        homeInteract();

    }

    else if (scene === "shop") {

        shopInteract();

    }

    else if (scene === "cafe") {

        cafeInteract();

    }

    else if (scene === "park") {

        parkInteract();

    }

    else if (scene === "hill") {

        hillInteract();

    }

}


/* =========================
   TOWN
========================= */

function townInteract() {

    if (
        distance(player.x, player.y, 150, 170) < 130
    ) {

        enterScene("home");

        return;

    }


    if (
        distance(player.x, player.y, 850, 170) < 130
    ) {

        enterScene("shop");

        return;

    }


    if (
        distance(player.x, player.y, 150, 510) < 130
    ) {

        enterScene("cafe");

        return;

    }


    if (
        distance(player.x, player.y, 800, 500) < 150
    ) {

        enterScene("park");

        return;

    }


    if (
        distance(player.x, player.y, 500, 110) < 140
    ) {

        enterScene("hill");

        return;

    }


    showMessage(
        "🔎 Walk near HOME, SHOP, CAFÉ, PARK or HILL and press E."
    );

}


/* =========================
   ENTER LOCATION
========================= */

function enterScene(newScene) {

    scene = newScene;

    player.x = 500;

    player.y = 450;


    updateBackButton();


    if (newScene === "home") {

        showMessage(
            "🏠 HOME — Explore your house!"
        );

        quest = Math.max(quest, 1);

        updateQuest();

    }


    else if (newScene === "shop") {

        showMessage(
            "🏪 SUNNY MART — Search for clues!"
        );

    }


    else if (newScene === "cafe") {

        showMessage(
            "🍕 CAFÉ — The chef needs your help!"
        );

    }


    else if (newScene === "park") {

        quest = Math.max(quest, 6);

        updateQuest();

        showBigMessage(
            "🌳 Collect the clues and find the missing dog!",
            2800
        );

    }


    else if (newScene === "hill") {

        showMessage(
            "🌅 HILL — The final secret may be here..."
        );

    }

}


/* =========================
   HOME
========================= */

function homeInteract() {


    /* BED */

    if (
        distance(player.x, player.y, 300, 180) < 120
    ) {

        energy = Math.min(
            100,
            energy + 10
        );


        showBigMessage(
            "🛏️ You had a peaceful rest!\n\n+10 ENERGY ⚡",
            2500
        );


        return;

    }


    /* BREAKFAST */

    if (
        distance(player.x, player.y, 700, 180) < 130
    ) {

        if (!breakfastDone) {

            breakfastDone = true;

            energy = Math.min(
                100,
                energy + 20
            );

            happiness += 5;

            quest = 2;

            updateQuest();


            showBigMessage(
                "🥞 Breakfast complete!\n\n+20 ENERGY ⚡   +5 HAPPINESS ❤️",
                2800
            );

        }

        else {

            showMessage(
                "🥞 You already had breakfast!"
            );

        }


        return;

    }


    /* MYSTERIOUS NOTE */

    if (
        distance(player.x, player.y, 500, 320) < 100
    ) {

        if (!noteOpened) {

            noteOpened = true;

            addItem("Mysterious Note");

            happiness += 5;


            showBigMessage(
                "📜 MYSTERIOUS NOTE\n\n\"Look where people gather...\"\n\nMaybe someone in town needs your help.",
                4000
            );

        }

        else {

            showBigMessage(
                "📜 The note says:\n\n\"Look where people gather...\"",
                3000
            );

        }


        return;

    }


    showMessage(
        "🔎 Search the house! Something may be hidden."
    );

}


/* =========================
   SHOP
========================= */

function shopInteract() {


    if (
        !walletFound &&
        distance(player.x, player.y, 680, 470) < 120
    ) {

        walletFound = true;

        addItem("Mysterious Wallet");

        happiness += 5;

        quest = 4;

        updateQuest();


        showBigMessage(
            "👛 You found a mysterious wallet!",
            2500
        );


        return;

    }


    if (
        distance(player.x, player.y, 720, 300) < 120
    ) {

        askQuestion(

            "🧑‍💼 MAYA",

            "Someone lost this wallet. Should you return it?",

            "❤️ YES",

            "😬 NO",

            function() {

                happiness += 15;

                showBigMessage(
                    "💚 You chose kindness!\n\n+15 HAPPINESS ❤️",
                    2500
                );

            },

            function() {

                happiness -= 5;

                showBigMessage(
                    "😬 Maybe helping others is part of a Perfect Day.\n\n-5 HAPPINESS ❤️",
                    3000
                );

            }

        );


        return;

    }


    if (
        distance(player.x, player.y, 875, 210) < 120
    ) {

        supermarketPuzzle();

        return;

    }


    showMessage(
        "🛒 Explore the shelves and look for clues!"
    );

}


/* =========================
   SUPERMARKET PUZZLE
========================= */

function supermarketPuzzle() {

    if (!walletFound) {

        showMessage(
            "🧩 Find the mysterious wallet first!"
        );

        return;

    }


    if (shopPuzzleSolved) {

        showMessage(
            "🧩 You already solved this puzzle."
        );

        return;

    }


    askQuestion(

        "🧩 SUPERMARKET PUZZLE",

        "What comes next? 2, 4, 6, 8, ?",

        "🔢 10",

        "🔢 12",

        function() {

            shopPuzzleSolved = true;

            addItem("Golden Key");

            happiness += 20;

            quest = 5;

            updateQuest();


            showBigMessage(
                "🎉 CORRECT!\n\nYou discovered the GOLDEN KEY!\n\n+20 HAPPINESS ❤️",
                3000
            );

        },

        function() {

            energy -= 5;


            showBigMessage(
                "❌ Not quite!\n\n-5 ENERGY ⚡",
                2200
            );

        }

    );

}


/* =========================
   CAFE
========================= */

function cafeInteract() {


    /* TOMATO */

    if (
        distance(player.x, player.y, 220, 220) < 100 &&
        !ingredients.includes("🍅 Tomato")
    ) {

        collectIngredient("🍅 Tomato");

        return;

    }


    /* CHEESE */

    if (
        distance(player.x, player.y, 470, 310) < 100 &&
        !ingredients.includes("🧀 Cheese")
    ) {

        collectIngredient("🧀 Cheese");

        return;

    }


    /* BREAD */

    if (
        distance(player.x, player.y, 720, 220) < 100 &&
        !ingredients.includes("🥖 Bread")
    ) {

        collectIngredient("🥖 Bread");

        return;

    }


    /* OWNER */

    if (
        distance(player.x, player.y, 820, 470) < 120
    ) {

        if (ingredients.length < 3) {

            showMessage(
                "👩‍🍳 Find all 3 ingredients first! " +
                ingredients.length +
                "/3"
            );

            return;

        }


        if (!cafeDone) {

            askQuestion(

                "🍕 CAFÉ CHALLENGE",

                "A hungry customer forgot their money. What should you do?",

                "❤️ Help them",

                "🙂 Ignore them",

                function() {

                    cafeDone = true;

                    happiness += 20;

                    quest = 6;

                    updateQuest();


                    showBigMessage(
                        "❤️ You helped someone!\n\n+20 HAPPINESS ❤️",
                        2800
                    );

                },

                function() {

                    cafeDone = true;

                    happiness += 2;

                    quest = 6;

                    updateQuest();


                    showBigMessage(
                        "🙂 You continued your day.\n\n+2 HAPPINESS ❤️",
                        2500
                    );

                }

            );

        }

        return;

    }


    showMessage(
        "🍕 Explore the café and find the ingredients!"
    );

}


/* =========================
   COLLECT INGREDIENT
========================= */

function collectIngredient(item) {

    if (ingredients.includes(item)) {

        return;

    }


    ingredients.push(item);

    addItem(item);

    happiness += 2;


    showBigMessage(
        "✨ You found " + item + "!\n\n+2 HAPPINESS ❤️",
        2200
    );


    updateHUD();

}


/* =========================
   PARK
========================= */

function parkInteract() {


    /* CLUE 1 */

    if (
        distance(player.x, player.y, 200, 200) < 110 &&
        !parkClueItems.includes("🔎 Fountain Clue")
    ) {

        collectParkClue("🔎 Fountain Clue");

        return;

    }


    /* CLUE 2 */

    if (
        distance(player.x, player.y, 500, 200) < 110 &&
        !parkClueItems.includes("🎀 Blue Ribbon")
    ) {

        collectParkClue("🎀 Blue Ribbon");

        return;

    }


    /* CLUE 3 */

    if (
        distance(player.x, player.y, 800, 200) < 110 &&
        !parkClueItems.includes("🐾 Paw Prints")
    ) {

        collectParkClue("🐾 Paw Prints");

        return;

    }


    /* DOG */

    if (
        dogFound &&
        distance(player.x, player.y, 500, 440) < 120
    ) {

        showBigMessage(
            "🐶❤️ Congratulations!\n\nYOU FOUND THE MISSING DOG!!!!!",
            4000
        );

        return;

    }


    showMessage(
        "🔎 Search the park for clues!"
    );

}


/* =========================
   PARK CLUE
========================= */

function collectParkClue(item) {

    if (parkClueItems.includes(item)) {

        return;

    }


    parkClueItems.push(item);

    parkClues++;

    addItem(item);

    happiness += 3;


    showBigMessage(
        "🔎 CLUE FOUND!\n\n" +
        item +
        "\n\n" +
        parkClues +
        "/3 clues collected!",
        2300
    );


    updateHUD();


    /* THIRD CLUE */

    if (parkClues >= 3 && !dogFound) {

        dogFound = true;

        quest = 7;

        updateQuest();


        setTimeout(function() {

            showBigMessage(
                "🐶🎉 CONGRATULATIONS!\n\nYOU FOUND THE MISSING DOG!!!!!\n\nThe dog was hiding beside the bench!",
                4000
            );

        }, 2400);

    }

}


/* =========================
   HILL
========================= */

function hillInteract() {

    if (!hasItem("Golden Key")) {

        showMessage(
            "🌅 Something is hidden here... You need a key."
        );

        return;

    }


    if (parkClues < 3) {

        showMessage(
            "🌅 You need the park clues before you can solve this."
        );

        return;

    }


    if (!hillSolved) {

        hillSolved = true;

        happiness += 30;

        addItem("Perfect Moment");

        quest = 8;

        updateQuest();


        showBigMessage(
            "✨ You discovered the SECRET OF THE HILL!\n\n+30 HAPPINESS ❤️",
            3500
        );


        setTimeout(
            finalQuestion,
            3700
        );


        return;

    }


    showMessage(
        "🌅 You watch the sunset. What a perfect day."
    );

}


/* =========================
   FINAL QUESTION
========================= */

function finalQuestion() {

    askQuestion(

        "☀️ YOUR PERFECT DAY",

        "What made your day perfect?",

        "❤️ Helping people",

        "✨ Exploring the world",

        function() {

            happiness += 10;

            finishGame();

        },

        function() {

            happiness += 10;

            finishGame();

        }

    );

}


function finishGame() {

    if (happiness >= 110) {

        showBigMessage(
            "🏆 LEGENDARY PERFECT DAY!\n\nYou made every moment count!",
            5000
        );

    }

    else if (happiness >= 80) {

        showBigMessage(
            "🌟 AMAZING PERFECT DAY!\n\nAdventure, kindness and discovery!",
            5000
        );

    }

    else {

        showBigMessage(
            "☀️ PERFECT DAY COMPLETE!\n\nEvery little moment mattered.",
            5000
        );

    }

}


/* =========================
   DRAW TOWN
========================= */

function drawTown() {

    ctx.fillStyle = "#79c96b";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#69b5dc";

    ctx.fillRect(
        0,
        0,
        1000,
        75
    );


    ctx.fillStyle = "#777";

    ctx.fillRect(
        0,
        270,
        1000,
        100
    );

    ctx.fillRect(
        450,
        0,
        100,
        650
    );


    ctx.strokeStyle = "#f6dc55";

    ctx.lineWidth = 5;

    ctx.setLineDash([
        25,
        20
    ]);


    ctx.beginPath();

    ctx.moveTo(
        0,
        320
    );

    ctx.lineTo(
        1000,
        320
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(
        500,
        0
    );

    ctx.lineTo(
        500,
        650
    );

    ctx.stroke();


    ctx.setLineDash([]);


    drawBuilding(
        55,
        110,
        "🏠",
        "HOME"
    );


    drawBuilding(
        735,
        110,
        "🏪",
        "SHOP"
    );


    drawBuilding(
        55,
        465,
        "🍕",
        "CAFÉ"
    );


    ctx.fillStyle = "#4faa5b";

    ctx.fillRect(
        650,
        430,
        300,
        150
    );


    ctx.font = "55px Arial";


    ctx.fillText(
        "🌳",
        690,
        520
    );


    ctx.fillText(
        "🌳",
        830,
        530
    );


    ctx.font = "19px Arial";

    ctx.fillStyle = "white";

    ctx.fillText(
        "PARK",
        775,
        460
    );


    ctx.fillStyle = "#5b9c55";

    ctx.beginPath();

    ctx.arc(
        500,
        85,
        80,
        Math.PI,
        0
    );

    ctx.fill();


    ctx.font = "42px Arial";

    ctx.fillText(
        "🌅",
        475,
        70
    );


    ctx.font = "17px Arial";

    ctx.fillStyle = "white";

    ctx.fillText(
        "HILL",
        480,
        120
    );

}


function drawBuilding(
    x,
    y,
    emoji,
    name
) {

    ctx.fillStyle =
        "rgba(0,0,0,.15)";

    ctx.fillRect(
        x + 8,
        y + 8,
        190,
        135
    );


    ctx.fillStyle = "#f2d0a6";

    ctx.fillRect(
        x,
        y,
        190,
        135
    );


    ctx.fillStyle = "#d65d5d";

    ctx.beginPath();

    ctx.moveTo(
        x - 12,
        y
    );

    ctx.lineTo(
        x + 95,
        y - 40
    );

    ctx.lineTo(
        x + 202,
        y
    );

    ctx.closePath();

    ctx.fill();


    ctx.font = "58px Arial";

    ctx.fillText(
        emoji,
        x + 65,
        y + 80
    );


    ctx.font = "17px Arial";

    ctx.fillStyle = "#263238";

    ctx.fillText(
        name,
        x + 65,
        y + 118
    );

}


/* =========================
   HOME DRAWING
========================= */

function drawHome() {

    ctx.fillStyle = "#f1d5b5";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#d98d72";

    ctx.fillRect(
        0,
        0,
        1000,
        75
    );


    ctx.fillStyle = "white";

    ctx.font = "28px Arial";

    ctx.fillText(
        "🏠 HOME",
        35,
        48
    );


    ctx.fillStyle = "#6d86c9";

    ctx.fillRect(
        170,
        130,
        250,
        120
    );


    ctx.font = "50px Arial";

    ctx.fillText(
        "🛏️",
        260,
        205
    );


    ctx.fillStyle = "#b88a62";

    ctx.fillRect(
        610,
        120,
        260,
        150
    );


    ctx.font = "55px Arial";

    ctx.fillText(
        "🥞",
        710,
        215
    );


    ctx.fillStyle = "#fff9bd";

    ctx.fillRect(
        450,
        330,
        100,
        75
    );


    ctx.font = "40px Arial";

    ctx.fillText(
        "📜",
        480,
        385
    );

}


/* =========================
   SHOP DRAWING
========================= */

function drawShop() {

    ctx.fillStyle = "#eee8d8";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#e2b078";

    ctx.fillRect(
        0,
        0,
        1000,
        75
    );


    ctx.fillStyle = "white";

    ctx.font = "28px Arial";

    ctx.fillText(
        "🏪 SUNNY MART",
        35,
        48
    );


    drawShelf(70, 130);

    drawShelf(330, 130);

    drawShelf(590, 130);

    drawShelf(70, 330);

    drawShelf(330, 330);

    drawShelf(590, 330);


    if (!walletFound) {

        ctx.font = "35px Arial";

        ctx.fillText(
            "👛",
            680,
            500
        );

    }


    ctx.font = "48px Arial";

    ctx.fillText(
        "🧑‍💼",
        700,
        330
    );


    ctx.font = "15px Arial";

    ctx.fillStyle = "#333";

    ctx.fillText(
        "MAYA",
        710,
        355
    );


    ctx.fillStyle = "#697ad0";

    ctx.fillRect(
        820,
        150,
        130,
        120
    );


    ctx.font = "40px Arial";

    ctx.fillText(
        "🧩",
        860,
        215
    );


    ctx.font = "14px Arial";

    ctx.fillText(
        "PUZZLE",
        855,
        250
    );

}


function drawShelf(x, y) {

    ctx.fillStyle = "#987250";

    ctx.fillRect(
        x,
        y,
        190,
        125
    );


    ctx.fillStyle = "#efc75c";

    ctx.fillRect(
        x + 10,
        y + 15,
        170,
        15
    );


    ctx.fillStyle = "#ef7474";

    ctx.fillRect(
        x + 10,
        y + 50,
        170,
        15
    );


    ctx.fillStyle = "#72add4";

    ctx.fillRect(
        x + 10,
        y + 85,
        170,
        15
    );

}


/* =========================
   CAFE DRAWING
========================= */

function drawCafe() {

    ctx.fillStyle = "#e8c39d";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#b96e55";

    ctx.fillRect(
        0,
        0,
        1000,
        75
    );


    ctx.fillStyle = "white";

    ctx.font = "28px Arial";

    ctx.fillText(
        "🍕 SUNNY CAFÉ",
        35,
        48
    );


    if (!ingredients.includes("🍅 Tomato")) {

        ctx.font = "40px Arial";

        ctx.fillText(
            "🍅",
            220,
            220
        );

    }


    if (!ingredients.includes("🧀 Cheese")) {

        ctx.font = "40px Arial";

        ctx.fillText(
            "🧀",
            470,
            310
        );

    }


    if (!ingredients.includes("🥖 Bread")) {

        ctx.font = "40px Arial";

        ctx.fillText(
            "🥖",
            720,
            220
        );

    }


    ctx.fillStyle = "#9c6d49";

    ctx.fillRect(
        250,
        380,
        200,
        80
    );

    ctx.fillRect(
        600,
        380,
        200,
        80
    );


    ctx.font = "50px Arial";

    ctx.fillText(
        "👩‍🍳",
        800,
        500
    );


    ctx.font = "15px Arial";

    ctx.fillStyle = "#333";

    ctx.fillText(
        "OWNER",
        805,
        525
    );

}


/* =========================
   PARK DRAWING
========================= */

function drawPark() {

    ctx.fillStyle = "#72bd69";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#5aa3d2";

    ctx.fillRect(
        0,
        0,
        1000,
        70
    );


    ctx.fillStyle = "white";

    ctx.font = "28px Arial";

    ctx.fillText(
        "🌳 SUNNY PARK",
        35,
        46
    );


    ctx.fillStyle = "#78c4e5";

    ctx.beginPath();

    ctx.arc(
        500,
        250,
        90,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.font = "40px Arial";

    ctx.fillText(
        "⛲",
        475,
        265
    );


    /* CLUE 1 */

    if (!parkClueItems.includes("🔎 Fountain Clue")) {

        ctx.font = "35px Arial";

        ctx.fillText(
            "🔎",
            170,
            220
        );

    }


    /* CLUE 2 */ 

    if (!parkClueItems.includes("🎀 Blue Ribbon")) {

        ctx.font = "35px Arial";

        ctx.fillText(
            "🎀",
            470,
            220
        );

    }


    /* CLUE 3 */

    if (!parkClueItems.includes("🐾 Paw Prints")) {

        ctx.font = "35px Arial";

        ctx.fillText(
            "🐾",
            770,
            220
        );

    }


    /* BENCH */

    ctx.fillStyle = "#80563c";

    ctx.fillRect(
        400,
        440,
        200,
        45
    );


    ctx.font = "45px Arial";

    ctx.fillText(
        "🪑",
        475,
        475
    );


    /* DOG APPEARS AFTER 3 CLUES */

    if (dogFound) {

        ctx.font = "60px Arial";

        ctx.fillText(
            "🐶",
            520,
            430
        );

    }

}


/* =========================
   HILL DRAWING
========================= */

function drawHill() {

    ctx.fillStyle = "#83c96f";

    ctx.fillRect(
        0,
        0,
        1000,
        650
    );


    ctx.fillStyle = "#eaa66d";

    ctx.fillRect(
        0,
        0,
        1000,
        230
    );


    ctx.font = "90px Arial";

    ctx.fillText(
        "🌅",
        440,
        150
    );


    ctx.fillStyle = "#557f52";

    ctx.beginPath();

    ctx.arc(
        500,
        500,
        350,
        Math.PI,
        0
    );

    ctx.fill();


    ctx.font = "28px Arial";

    ctx.fillStyle = "white";

    ctx.fillText(
        "🌅 THE HILL",
        35,
        48
    );


    if (
        hasItem("Golden Key") &&
        parkClues >= 3
    ) {

        ctx.font = "50px Arial";

        ctx.fillText(
            "📦",
            470,
            430
        );

    }

}


/* =========================
   PLAYER
========================= */

function drawPlayer() {

    ctx.fillStyle =
        "rgba(0,0,0,.25)";


    ctx.beginPath();

    ctx.ellipse(
        player.x,
        player.y + 20,
        19,
        7,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#4d8cff";

    ctx.fillRect(
        player.x - 13,
        player.y + 2,
        26,
        28
    );


    ctx.fillStyle = "#ffc98b";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y - 8,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#5b3928";

    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y - 13,
        14,
        Math.PI,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#222";

    ctx.beginPath();

    ctx.arc(
        player.x - 5,
        player.y - 8,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.beginPath();

    ctx.arc(
        player.x + 5,
        player.y - 8,
        2,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


/* =========================
   DRAW EVERYTHING
========================= */

function draw() {

    if (scene === "town") {

        drawTown();

    }

    else if (scene === "home") {

        drawHome();

    }

    else if (scene === "shop") {

        drawShop();

    }

    else if (scene === "cafe") {

        drawCafe();

    }

    else if (scene === "park") {

        drawPark();

    }

    else if (scene === "hill") {

        drawHill();

    }


    drawPlayer();

}
/* =========================
   GAME LOOP
========================= */

function gameLoop() {

    movePlayer();

    updateTime();

    updateHUD();

    draw();

    requestAnimationFrame(gameLoop);

}


updateHUD();

gameLoop();


let microbitAnswer = null;

// Ask the micro:bit bridge for a new answer
async function checkMicrobit() {
    try {
        const response = await fetch("http://localhost:3000/answer");
        const data = await response.json();

        if (data.answer) {
            microbitAnswer = data.answer;

            console.log("🤖 MICRO:BIT ANSWER:", microbitAnswer);

            // Send the answer to the game
            handleMicrobitAnswer(microbitAnswer);
        }
    } catch (error) {
        // Bridge isn't running — don't crash the game
    }
}

// Check several times every second
setInterval(checkMicrobit, 300);

// This function is called whenever A or B is pressed
function handleMicrobitAnswer(answer) {

    if (answer === "YES") {
        console.log("🅰️ PLAYER CHOSE YES");

        // Make the game behave like a YES answer
        if (typeof window.microbitYes === "function") {
            window.microbitYes();
        }

    } else if (answer === "NO") {
        console.log("🅱️ PLAYER CHOSE NO");

        // Make the game behave like a NO answer
        if (typeof window.microbitNo === "function") {
            window.microbitNo();
        }
    }
}

console.log("🤖 Micro:bit controller loaded!");
// =====================================================
// 🤖 PERFECT DAY — MICRO:BIT QUESTION SYSTEM
// A = YES | B = NO
// =====================================================

let microbitQuestionActive = false;
// =====================================================
// 🤖 MICRO:BIT → PERFECT DAY GAME
// A = FIRST ANSWER
// B = SECOND ANSWER
// =====================================================

async function checkMicrobit() {

    if (!questionOpen || !currentQuestion) {
        return;
    }

    try {

        const response =
            await fetch("http://localhost:3000/answer");

        const data =
            await response.json();

        if (!data.answer) {
            return;
        }

        const answer =
            data.answer.trim().toUpperCase();

        console.log(
            "🤖 MICRO:BIT ANSWER:",
            answer
        );

        // A button = first game answer
        if (answer === "YES") {

            console.log(
                "🅰️ MICRO:BIT → FIRST ANSWER"
            );

            const action =
                currentQuestion.a;

            if (action) {
                action();
            }

            closeQuestion();

        }

        // B button = second game answer
        else if (answer === "NO") {

            console.log(
                "🅱️ MICRO:BIT → SECOND ANSWER"
            );

            const action =
                currentQuestion.b;

            if (action) {
                action();
            }

            closeQuestion();

        }

    } catch (error) {

        // Keep the game running if the bridge isn't available.

    }

}


// Check the micro:bit four times per second
setInterval(checkMicrobit, 250);


console.log(
    "🤖 MICRO:BIT IS CONNECTED TO THE GAME!"
);