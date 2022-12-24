"use strict";

//              colors

const colors = document.querySelector(".colors"),
  color = document.querySelectorAll(".color");
let arr = [];

colors.addEventListener("click", (event) => {
  const target = event.target,
    targetColor = window
      .getComputedStyle(target)
      .getPropertyValue("background-color");
  color.forEach((item) => {
    if (target.classList.contains("color")) {
      item.classList.remove("active-color");
    }
    if (target == item) {
      item.classList.add("active-color");
      document.body.style.backgroundColor = targetColor;
    }
  });
});

//              timer

const wraper = document.querySelector(".box-wraper");
const boxClock = document.querySelector(".box-clock");
const counterLeft = document.querySelector(".box-counter.left");
const counterRight = document.querySelector(".box-counter.right");
const sessions = document.querySelector(".box-text.left");
const breaks = document.querySelector(".box-text.right");
const buttons = document.querySelectorAll(".box-btn");
const start = document.querySelector(".btn-start");
const stopTimer = document.querySelector(".btn-stop");
const clearTimer = document.querySelector(".btn-clear");
const boxStatus = document.querySelector(".box-status");
let countLeft = 25;
let countRight = 5;
let interval;
let counter = 0;
let minutes = countLeft;
let seconds = (minutes * 60) % 60;

counterLeft.textContent = countLeft;
counterRight.textContent = countRight;

wraper.addEventListener("click", (event) => {
  const target = event.target;

  buttons.forEach((btn) => {
    if (target == btn && target.classList.contains("box-plus")) {
      if (target.classList.contains("left")) {
        countLeft++;
        minutes++;
        counterLeft.textContent = countLeft;
      } else {
        countRight++;
        counterRight.textContent = countRight;
      }
    }
    if (target == btn && target.classList.contains("box-minus")) {
      if (target.classList.contains("left") && countLeft != 1) {
        countLeft--;
        minutes--;
        counterLeft.textContent = countLeft;
      } else if (target.classList.contains("right") && countRight != 1) {
        countRight--;
        counterRight.textContent = countRight;
      }
    }
  });
});

function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function startTimer() {
  clearInterval(interval);
  boxStatus.textContent = "session";
  sessions.classList.add("active");
  interval = setInterval(() => {
    if (seconds <= 0) {
      seconds = 60;
      minutes--;
    } else {
      seconds--;
    }
    if (
      minutes === 0 &&
      seconds === 0 &&
      sessions.classList.contains("active")
    ) {
      minutes = countRight;
      breaks.classList.add("active");
      sessions.classList.remove("active");
      boxStatus.textContent = "breakss";
    }
    if (minutes === 0 && seconds === 0 && breaks.classList.contains("active")) {
      minutes = countLeft;
      sessions.classList.add("active");
      breaks.classList.remove("active");
      boxStatus.textContent = "session";
    }
    if (
      breaks.classList.contains("active") ||
      sessions.classList.contains("active")
    ) {
      start.removeEventListener("click", startTimer);
    }
    start.classList.add("active-btn");
    stopTimer.classList.remove("active-btn");
    clearTimer.classList.remove("active-btn");
    boxClock.textContent = getZero(minutes) + `:` + getZero(seconds);
  }, 1000);
}

start.addEventListener("click", startTimer);
stopTimer.addEventListener("click", () => {
  clearInterval(interval);
  stopTimer.classList.add("active-btn");
  start.classList.remove("active-btn");
  clearTimer.classList.remove("active-btn");
  start.addEventListener("click", startTimer);
});
clearTimer.addEventListener("click", () => {
  clearInterval(interval);
  boxClock.textContent = "00:00";
  start.classList.remove("active-btn");
  stopTimer.classList.remove("active-btn");
  sessions.classList.remove("active");
  breaks.classList.remove("active");
  start.addEventListener("click", startTimer);
  boxStatus.textContent = "pomodoro";
  minutes = countLeft;
  seconds = 0;
});
