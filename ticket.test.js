const {expect} = require("chai");
const {getText } = require("./lib/commands.js");
const {getDayDateSelector} = require("./lib/dayIndex.js");
const {seatSelect} = require("./lib/seatIndex.js");

let page;
let secondDay = "nav.page-nav > a:nth-child(2)";
let fifthDay = "nav.page-nav > a:nth-child(5)";
let sixthDay = "nav.page-nav > a:nth-child(6)";
let pm23_45 = "[data-seance-start='1425']";
let am00_00 = "[data-seance-start='0']";
let pm14_00 = "[data-seance-id='94']";
let ticketTitle = "p.ticket__hint";
let confirmingText = "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.";

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
  });

test("Should book one seat", async () => {
  await getDayDateSelector(page, secondDay, pm23_45);
  await seatSelect(page,4 ,7)
  const actual = await getText(page, ticketTitle);
  expect(actual).contain(confirmingText);
  }, 60000);

test("Should book two seats", async () => {
  await getDayDateSelector(page, fifthDay, am00_00);
  await seatSelect(page,7,8,9);
  const actual = await getText(page, ticketTitle);
  expect(actual).contain(confirmingText);
  }, 60000);

test("Should don't booking seat", async () => {
  await getDayDateSelector(page, sixthDay, pm14_00);
  const isDisabled = await page.$eval("button", (button) => button.disabled);
  expect(isDisabled).to.equal(true);
  }, 60000);
});