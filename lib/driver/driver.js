"use strict";

const events = require("../events/events");

events.on("pickup", (payload) => {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit("in transit", payload);

  console.log(`DRIVER: delievered ${payload.orderId}`);
  events.emit("delivered", payload);
});
