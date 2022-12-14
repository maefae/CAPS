"use strict";

const emitter = require("../lib/events/events");
const driver = require("../lib/driver/driver");

jest.chance();

const delivery = {
  store: "target",
  orderID: "4321",
  customer: "Seth Mcfarlane",
  address: "321 testing lane",
};

describe("Testing driver: ", () => {
  test("should emit in-transit event at right time", () => {
    console.log = chance();
  });
});
