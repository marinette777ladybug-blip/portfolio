const http = require("http");
const { SerialPort } = require("serialport");

const PORT = "COM3";
const BAUD_RATE = 115200;
const GAME_PORT = 3000;

let lastAnswer = null;

const microbit = new SerialPort({
    path: PORT,
    baudRate: BAUD_RATE
});

microbit.on("open", () => {
    console.log("🤖 MICRO:BIT CONNECTED ON COM3");
    console.log("🅰️ A = YES");
    console.log("🅱️ B = NO");
});

microbit.on("data", (data) => {
    const message = data.toString().trim().toUpperCase();

    if (message.includes("YES")) {
        lastAnswer = "YES";
        console.log("🅰️ YES received!");
    }

    if (message.includes("NO")) {
        lastAnswer = "NO";
        console.log("🅱️ NO received!");
    }
});

microbit.on("error", (error) => {
    console.log("❌ Micro:bit error:", error.message);
});

const server = http.createServer((req, res) => {

    // Allow the browser game to communicate with this server
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // Browser asks for the latest micro:bit answer
    if (req.url === "/answer") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            answer: lastAnswer
        }));

        lastAnswer = null;
        return;
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(GAME_PORT, () => {
    console.log("");
    console.log("🎮 PERFECT DAY MICRO:BIT BRIDGE");
    console.log(`🌐 Listening on http://localhost:${GAME_PORT}`);
    console.log("✅ Ready for YES / NO answers!");
    console.log("");
});