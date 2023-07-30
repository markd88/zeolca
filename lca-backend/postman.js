
// const axios = require('axios')
  
// // Make request
// axios.get('https://gamma.app/docs/-1LCA-62kq100h17zci5y?mode=doc')
  
//   // Show response data
//   .then(res => console.log(res.data))
//   .catch(err => console.log(err))



// const https = require("https");
// const querystring = require("querystring");
// const url = require("url");

// const port = 10101;
// // 1.创建代理服务
// https.createServer(onRequest).listen(port);

// function onRequest(req, res) {
//   const originUrl = url.parse(req.url);
//   const qs = querystring.parse(originUrl.query);
//   const targetUrl = qs["target"];
//   const target = url.parse(targetUrl);

//   const options = {
//     hostname: target.hostname,
//     port: 80,
//     path: url.format(target),
//     method: "GET"
//   };

//   // 2.代发请求
//   const proxy = https.request(options, _res => {
//     // 3.修改响应头
//     const fieldsToRemove = ["x-frame-options", "content-security-policy"];
//     Object.keys(_res.headers).forEach(field => {
//       if (!fieldsToRemove.includes(field.toLocaleLowerCase())) {
//         res.setHeader(field, _res.headers[field]);
//       }
//     });
//     _res.pipe(res, {
//       end: true
//     });
//   });
//   req.pipe(proxy, {
//     end: true
//   });
// }



// const puppeteer = require("puppeteer");
// puppeteer
//   .launch({
//     defaultViewport: {
//       width: 1280,
//       height: 2000,
//     },
//   })
//   .then(async (browser) => {
//     const page = await browser.newPage();
//     await page.goto("https://gamma.app/docs/-1LCA-62kq100h17zci5y?mode=doc");
//     await page.screenshot({ path: "nyt-puppeteer.png" });
//     await browser.close();
//   });


// const { chromium } = require("playwright");
// (async () => {
//   let browser = await chromium.launch();
 
//   let page = await browser.newPage();
//   await page.setViewportSize({ width: 1280, height: 1080 });
//   await page.goto("http://nytimes.com");
//   await page.screenshot({ path: `nyt-playwright-chromium.png` });
//   await browser.close();
// })();


const { Builder } = require("selenium-webdriver");
require("chromedriver");
 
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()

let fs = require("fs");
 
async function takeScreenshot(url) {
  //Wait for browser to build and launch properly
  // options.addArguments('--headless')

  let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
 
  //Navigate to the url passed in
  await driver.get(url);
 
  //Capture the screenshot
  let image = await driver.takeScreenshot();
 
  await fs.writeFileSync("./test.png", image, "base64");
  await driver.quit();
}
takeScreenshot("https://gamma.app/docs/-1LCA-62kq100h17zci5y?mode=doc");

// takeScreenshot("https://www.ssbti.org/")



