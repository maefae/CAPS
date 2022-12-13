"use strict";

require("dotenv").config();

const events = require("../events/events");

const Chance = require("chance");
const chance = new Chance();

events.on("delivered", (payload) => {
  console.log(`thank you, ${payload.customerName}`);
});

function generateOrder() {
  let payload = {};

  payload.orderId = chance.integer();
  payload.storeName = "Target";
  payload.customerName = chance.name();
  payload.address = chance.address();

  return payload;
}

setInterval(() => {
  events.emit("pickup", generateOrder());
}, 5000);
