const { Builder } = require("selenium-webdriver");
require("chromedriver");
let fs = require("fs");
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()
  
async function takeScreenshot(url) {
  //Wait for browser to build and launch properly
  // options.addArguments('--headless')

  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

  //Navigate to the url passed in
  await driver.get(url);

  //Capture the screenshot
  let image = await driver.takeScreenshot();

  await fs.writeFileSync("../images/training.png", image, "base64");
  await driver.quit();
}
takeScreenshot("https://gamma.app/docs/-1LCA-62kq100h17zci5y?mode=doc");

