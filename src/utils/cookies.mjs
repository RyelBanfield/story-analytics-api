import * as dotenv from "dotenv";
import fs from "fs/promises";
import puppeteer from "puppeteer";

dotenv.config();

const Login = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/accounts/login/");
  console.log("Page loaded");

  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', process.env.INSTA_USERNAME);
  await page.type('input[name="password"]', process.env.INSTA_PASSWORD);
  await page.click('button[type="submit"]');
  console.log("Logged in");

  await page.waitForNavigation();
  console.log("Page loaded");

  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
  console.log("Cookies saved");

  await browser.close();
};

await Login();
