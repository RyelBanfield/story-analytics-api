import fs from "fs/promises";
import puppeteer from "puppeteer";

const runUnauthenticatedBrowser = async (url: string): Promise<boolean> => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const cookiesString = await fs.readFile("./cookies.json");
  const cookies = JSON.parse(cookiesString as unknown as string) as JSON[];
  await page.setCookie(...(cookies as []));

  await page.goto(url);
  await page.waitForSelector("h2");
  const errorText = await page.$eval("h2", (el) => el.textContent);

  await browser.close();

  if (errorText === "Sorry, this page isn't available.") {
    return false;
  } else {
    return true;
  }
};

export default runUnauthenticatedBrowser;
