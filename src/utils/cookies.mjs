import * as dotenv from "dotenv";
import fs from "fs/promises";
import puppeteer from "puppeteer";

dotenv.config();

const Login = async () => {
  let browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/accounts/login/");

  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', process.env.INSTA_USERNAME);
  await page.type('input[name="password"]', process.env.INSTA_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  const cookies = await page.cookies();
  await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));

  await browser.close();
};

await Login();
