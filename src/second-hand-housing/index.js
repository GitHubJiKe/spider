const puppeteer = require("puppeteer");

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto("https://zhoukou.anjuke.com/sale/");
  const region2 = await page.waitForSelector(".region-line2");
  const region3 = await page.waitForSelector(".region-line3");
  console.log(region2, region3);
  const region2s = await region2.$("li > a[title=川汇二手房]");
  const region3s = await region3.$("li > a[title=东新区二手房]");
  console.log(region2s, region3s);
  await page.screenshot({ type: "png", path: "page5.png" });
  // Close browser.
  await browser.close();
})();
