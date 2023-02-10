import fs from "fs/promises";
import puppeteer from "puppeteer";

const runUnauthenticatedBrowser = async (url: string): Promise<boolean> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString as unknown as string) as JSON[];
  await page.setCookie(...(cookies as []));

  await page.goto("https://www.instagram.com/accounts/login/");

  const newPage = await browser.newPage();
  await newPage.goto(url);
  await newPage.waitForSelector("h2");
  const h2 = await newPage.$eval("h2", (el) => el.textContent);

  await browser.close();

  if (h2 === "Sorry, this page isn't available.") {
    return false;
  } else {
    return true;
  }
};

export default runUnauthenticatedBrowser;
