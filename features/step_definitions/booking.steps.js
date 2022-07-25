const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
// const { daysWeek } = require("../../lib/util.js");

Before({timeout: 30000}, async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 60000,
  });
});

When("user chooses by {string}", {
  timeout: 60 * 1000
}, async function (string) {
  await clickElement(this.page, string);

});

When("user chooses movie {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user chooses seat {string}", async function (string) {
  return await clickElement(this.page, string);
});

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees the header {string}", async function (string) {
  const actual = await getText(this.page, "h2");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees {string} is gray", {
  timeout: 60 * 1000
}, async function (string) {
  
  await clickElement(this.page, string);
  await this.page.waitForNavigation(30000);
  const isDisabled = await page.$eval("button", (button) => button.disabled);
  await this.page.waitForNavigation(30000);

  await expect(isDisabled).to.equal(true);
 

});



// When("User booking one seat", async function () {
//   return await clickElement(this.page, "[data-seance-start='1140']");

  // await clickElement(page, "[data-seance-start='1140']");
  // return await clickElement(this.page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)");
  // return await clickElement(this.page, ".acceptin-button");
// });

// When("User booking one VIP seat", async function () {
//   await clickElement(page, "[data-seance-start='1140']");
//   await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip");
//   await clickElement(page, ".acceptin-button");
// });

// When("User don't booking one seat", async function () {
//   await clickElement(page, "[data-seance-id='93']");
//   // await clickElement(page, "div:nth-child(2) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken");

// });

// Then("user succsessfull booking", async function () {
//   const actual = await getText(page, "h2.ticket__check-title");
//   expect(actual).contain("Вы выбрали билеты:");
// });

// Then("user don't booking", async function () {
//   const isDisabled = await page.$eval("button", (button) => button.disabled);
//   expect(isDisabled).to.equal(true);
// });