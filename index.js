const puppeteer = require('puppeteer');
const fs = require('fs');
const cron = require("node-cron");
require('dotenv').config();
// Get content from conf.json as a second option
// var contents = fs.readFileSync("conf.json");
// Define to JSON type
// var jsonContent = JSON.parse(contents);
let browser;
const ms = 500;
// attendance channel 
let url = 'https://discordapp.com/channels/688638069875802123/688796892846620750';
const start = async () => {
  // showing GUI
  browser = await puppeteer.launch({ headless: false, args: ['--start-fullscreen'] });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(120000);
  await page.setViewport({ width: 980, height: 570 })
  await page.goto(url, { waitUntil: 'networkidle0' });
  // filling the email and the password
  await page.focus('input[name="email"]');
  await page.keyboard.type(process.env.email);
  // wait to slow the process
  await page.waitFor(ms);
  await page.focus('input[name="password"]');
  await page.keyboard.type(process.env.password);
  //wait
  await page.waitFor(ms);
  await page.click('button[type="submit"]');
  // accessing the last msg and click the first emoji
  await page.waitFor('#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > div.messagesWrapper-3lZDfY.group-spacing-16 > div > div > div:nth-child(2) :last-child')
  await page.waitFor(ms)
  await page.waitFor("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > div.messagesWrapper-3lZDfY.group-spacing-16 > div > div > div:nth-child(2) :last-child > div.container-1ov-mD > div > div:nth-child(1) > div > div > div")
  await page.waitFor(ms)
  await page.hover("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > div.messagesWrapper-3lZDfY.group-spacing-16 > div > div > div:nth-child(2) :last-child > div.container-1ov-mD > div > div:nth-child(1) > div > div > div")
  await page.waitFor(ms)
  await page.click("#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > div.messagesWrapper-3lZDfY.group-spacing-16 > div > div > div:nth-child(2) :last-child > div.container-1ov-mD > div > div:nth-child(1) > div > div > div")
  page.waitFor(5000);
  // Navigate to another channel
  url = 'https://discordapp.com/channels/688638069875802123/688641560732369098'
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitFor(5000)
  // Sending morning greeting msg 
  await page.waitFor('#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > form > div > div > div > div > div.textArea-12jD-V.textAreaSlate-1ZzRVj.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw.fontSize16Padding-3Wk7zP')
  await page.focus('#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div > div.chat-3bRxxu > div > main > form > div > div > div > div > div.textArea-12jD-V.textAreaSlate-1ZzRVj.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw.fontSize16Padding-3Wk7zP')
  await page.keyboard.type("Good morning  :sun_with_face:  :sun_with_face:");
  await page.keyboard.press('Enter')
  await page.waitFor(5000)
  await browser.close();
}
cron.schedule('0 9  * * 1-5', () => start());