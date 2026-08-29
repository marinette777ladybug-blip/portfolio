# 🌞 Perfect Day

**Perfect Day** is an interactive game designed to help players learn how small everyday choices can affect their **happiness, energy and time**.

## 🎮 How It Works

The player moves through a virtual day and collects different items.

After collecting items, the game can ask short **yes/no questions**. The player can answer using the **micro:bit**:

* **Button A** → YES
* **Button B** → NO

The game also includes a clock that starts at **8:00 AM** and progresses as the game runs.

## 🤖 micro:bit

The micro:bit is connected to the game through a Node.js serial bridge.

The project uses:

* `microbit-bridge.js` — connects the micro:bit to the computer
* `microbit-items.js` — handles micro:bit item interactions
* `serialport` — communicates with the micro:bit through USB

## 💻 Technologies

* HTML
* CSS
* JavaScript
* Node.js
* micro:bit
* Streamlit

## 📁 Project Files

* `index.html` — main game page
* `style.css` — game styling
* `script.js` — game logic
* `microbit-bridge.js` — micro:bit connection
* `microbit-items.js` — micro:bit interactions
* `app.py` — Streamlit app
* `package.json` — Node.js dependencies

## 🚀 Running the Project

The game can be opened through the web app, while the micro:bit requires the local Node.js bridge and a USB connection.

## 🌟 Project Goal

The aim of Perfect Day is to make learning about **wellbeing, time management and everyday decisions** more interactive and fun.
