// ============================================================
// 🤖 PERFECT DAY - MICRO:BIT ITEM QUESTIONS
// A = YES
// B = NO
// ============================================================

console.log("🤖 Micro:bit item system loaded!");

let microbitItemQuestionWaiting = false;


// ============================================================
// ASK A QUESTION USING YOUR EXISTING GAME QUESTION BOX
// ============================================================

function askMicrobitItemQuestion(
    question,
    yesFunction,
    noFunction
) {

    microbitItemQuestionWaiting = true;

    askQuestion(
        "🤖 MICRO:BIT QUESTION",
        question,
        "🅰️ YES",
        "🅱️ NO",

        function () {

            microbitItemQuestionWaiting = false;

            if (yesFunction) {
                yesFunction();
            }

        },

        function () {

            microbitItemQuestionWaiting = false;

            if (noFunction) {
                noFunction();
            }

        }
    );

}


// ============================================================
// 🍅 TOMATO
// ============================================================

window.askTomatoMicrobit = function () {

    askMicrobitItemQuestion(

        "🍅 Is the tomato useful as a café ingredient?",

        function () {

            happiness += 3;

            showBigMessage(
                "✅ YES!\n\nThe tomato could help the café!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🙂 Maybe the chef has another idea!",
                1800
            );

        }

    );

};


// ============================================================
// 🧀 CHEESE
// ============================================================

window.askCheeseMicrobit = function () {

    askMicrobitItemQuestion(

        "🧀 Is cheese useful in the café?",

        function () {

            happiness += 3;

            showBigMessage(
                "✅ YES!\n\nCheese could be useful!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🙂 Keep exploring the café!",
                1800
            );

        }

    );

};


// ============================================================
// 🥖 BREAD
// ============================================================

window.askBreadMicrobit = function () {

    askMicrobitItemQuestion(

        "🥖 Could bread be used to make a meal?",

        function () {

            happiness += 3;

            showBigMessage(
                "✅ YES!\n\nBread can help make a meal!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🙂 Keep looking for useful things!",
                1800
            );

        }

    );

};


// ============================================================
// 🔎 FOUNTAIN CLUE
// ============================================================

window.askFountainMicrobit = function () {

    askMicrobitItemQuestion(

        "🔎 Could this clue help you find the missing dog?",

        function () {

            happiness += 3;

            showBigMessage(
                "🔎 YES!\n\nThis could be an important clue!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🔎 Keep searching the park!",
                1800
            );

        }

    );

};


// ============================================================
// 🎀 BLUE RIBBON
// ============================================================

window.askRibbonMicrobit = function () {

    askMicrobitItemQuestion(

        "🎀 Could this ribbon belong to the missing dog?",

        function () {

            happiness += 3;

            showBigMessage(
                "🎀 YES!\n\nThis might be an important clue!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🎀 Maybe! Keep investigating!",
                1800
            );

        }

    );

};


// ============================================================
// 🐾 PAW PRINTS
// ============================================================

window.askPawMicrobit = function () {

    askMicrobitItemQuestion(

        "🐾 Could these paw prints help you find the missing dog?",

        function () {

            happiness += 3;

            showBigMessage(
                "🐾 YES!\n\nYou're getting closer!\n\n+3 HAPPINESS ❤️",
                2200
            );

            updateHUD();

        },

        function () {

            showBigMessage(
                "🐾 Keep investigating!",
                1800
            );

        }

    );

};


// ============================================================
// 🤖 READ MICRO:BIT
// ============================================================

async function readMicrobitItemAnswer() {

    //if (!microbitItemQuestionWaiting) {
        // return;
    //}

    try {

        const response =
            await fetch("http://localhost:3000/answer");

        const data =
            await response.json();

        if (!data.answer) {
            return;
        }

        const answer =
            data.answer
                .toString()
                .trim()
                .toUpperCase();

        console.log(
            "🤖 MICRO:BIT ITEM ANSWER:",
            answer
        );

        // A = YES
        if (answer === "YES") {

            const button =
                document.getElementById("answerA");

            if (button) {
                button.click();
            }

        }

        // B = NO
        else if (answer === "NO") {

            const button =
                document.getElementById("answerB");

            if (button) {
                button.click();
            }

        }

    }

    catch (error) {

        // Bridge unavailable.
        // Do nothing so the game continues normally.

    }

}


// Check every quarter second
setInterval(
    readMicrobitItemAnswer,
    250
);


console.log(
    "🤖 Micro:bit item questions are READY!"
);