"use strict";

require("dotenv").config();
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3002;
const STORENAME = process.env.STORENAME || "Store";

const server = new Server(PORT);
const capsServer = server.of("/caps");

function logger(body) {
  let event = body.event;
  let time = new Date();
  let payload = body.payload;

  console.log("EVENT", { event, time, payload });
}

capsServer.on("connection", (socket) => {
  console.log(
    `connection has been established on 'caps namespace: Socket[${socket.id}]`
  );

  socket.on("join", (room) => {
    console.log(`You joined the ${room} room`);
    socket.join(room);
  });

  socket.emit("confirmation", "confirmation");

  socket.on("order-ready", (payload) => {
    logger(payload);
    capsServer.emit("order-ready", payload);
  });

  socket.on("in-transit", (payload) => {
    logger(payload);
    capsServer.to(STORENAME).emit("in-transit", payload);
  });

  socket.on("delivered", (payload) => {
    logger(payload);
    capsServer.to(STORENAME).emit("delivered", payload);
  });
});
