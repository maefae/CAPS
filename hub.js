"use strict";

const events = require("./lib/events/events");

require("./lib/driver/driver");
require("./lib/vendor/vendor");

events.on("pickup", (payload) => logger("pickup", payload));
events.on("in transit", (payload) => logger("in transit", payload));
events.on("delivered", (payload) => logger("delivered", payload));

function logger(event, payload) {
  let time = new Date();
  console.log("EVENT", { event, time, payload });
}
