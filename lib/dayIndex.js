const { clickElement} = require("./commands.js");

module.exports = {
  getDayDateSelector: async function (page, day, time) {
      await clickElement(page, day);
      await clickElement(page, time);
    },
  }