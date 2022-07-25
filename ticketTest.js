const { expect } = require("chai");
const { clickElement, getText } = require("./lib/commands.js");
const daysWeek = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Booking tickets", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
    await clickElement(page, daysWeek.fifthDay);
  });

test("Should book one seat", async () => {
  await clickElement(page, "[data-seance-start='1425']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(6) > span:nth-child(6)");
  await clickElement(page, ".acceptin-button");
  const actual = await getText(page, "h2.ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
  }, 60000);

test("Should book two seats", async () => {
  await clickElement(page, "[data-seance-start='0']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(10) > span:nth-child(9)");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(10) > span:nth-child(10)");
  await clickElement(page, ".acceptin-button");
  const actual = await getText(page, "h2.ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
  }, 60000);

test("Should don't booking seat", async () => {
  await clickElement(page, "[data-seance-id='94']");
  const isDisabled = await page.$eval("button", (button) => button.disabled);
  expect(isDisabled).to.equal(true);
  }, 60000);
});