const add = require("./game.js");

test("add add 2 numbers together", () => {
  expect(add(1, 3)).toBe(4);
});
