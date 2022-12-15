"use strict";

require("dotenv").config();

// const events = require("../../../events/events");
const Chance = require("chance");
const chance = new Chance();
const { io } = require("socket.io-client");

const PORT = process.env.PORT || 3002;
const STORENAME = process.env.STORENAME || "Store";

const socket = io(`http://localhost:${PORT}/caps`);

socket.emit("join", STORENAME);

socket.on("confirmation", start);

socket.on("delivered", (body) => {
  console.log(`VENDOR: Thanks for delivering [${body.payload.orderId}]`);
  process.exit();
});

// events.on("delivered", (payload) => {
//   console.log(`thank you, ${payload.customerName}`);
// });

function generateOrder() {
  let payload = {};

  payload.orderId = chance.integer();
  payload.storeName = STORENAME;
  payload.customerName = chance.name();
  payload.address = chance.address();

  return payload;
}

// setInterval(() => {
//   events.emit("pickup", generateOrder());
// }, 5000);

function writeMessage() {
  let message = {};

  message.event = "order-ready";
  message.payload = generateOrder();

  socket.emit("order-ready", message);
}

function start() {
  setInterval(writeMessage, 5000);
}

module.exports = { start };
