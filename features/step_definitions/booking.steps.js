const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { seatSelect } = require("../../lib/seatIndex.js");
const { getDayDateSelector } = require("../../lib/dayIndex.js");

let pm23_45 = "[data-seance-start='1425']";
let ticketTitle = "p.ticket__hint";
let confirmingText = "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.";

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

When("user chooses {int}-th day and seance", async function (int1) {
  await getDayDateSelector(
    this.page,
    `nav.page-nav > a:nth-child(${int1})`,
    pm23_45
  );
});

When("user chooses seat {int} in row {int}", async function (int1, int2) {
  await seatSelect(this.page, int1, int2);
});

When(
  "user chooses {int} row and {int},{int} seats",
  async function (int1, int2, int3) {
    await seatSelect(this.page, int1, int2, int3);
  }
);

When("user click {string}", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees text", async function () {
  const actual = await getText(this.page, ticketTitle);
  expect(actual).contains(confirmingText);
});
