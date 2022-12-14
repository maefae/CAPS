"use strict";

// const events = require("../events/events");
require("dotenv").config();
const { io } = require("socket.io-client");

// events.on("pickup", (payload) => {
//   console.log(`DRIVER: picked up ${payload.orderId}`);
//   events.emit("in transit", payload);

//   console.log(`DRIVER: delievered ${payload.orderId}`);
//   events.emit("delivered", payload);
// });

const PORT = process.env.PORT || 3002;
const STORENAME = process.env.STORENAME || "Store";

const socket = io(`http://localhost:${PORT}/caps`);

socket.on("order-ready", deliverOrder);

function deliverOrder(body) {
  setTimeout(() => {
    console.log("DRIVER: picked up [${body.payload.orderId}]");
    body.event = 'in-transit;
    socket.emit('in-transit', body);

  }, 1000);

  setTimeout(() => {
    console.log('DRIVER: delivered [${body.payload.orderId}]');

    body.event = 'delivered';
    socket.emit('delivered', body);
  }, 3000);
  };
