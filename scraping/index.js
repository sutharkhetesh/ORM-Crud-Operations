const puppeteer = require('puppeteer');
const newLocal = 'cheerio';
const { load } = require(newLocal)
const { writeFile, readFile } = require('fs/promises')
async function main() {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1024, height: 768 } });
  const page = await browser.newPage();
  await page.goto('https://www.thriftbooks.com/');
  await page.type(".Search-input", 'biography');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000)

  // await browser.close();
  const productsData = [];
  const $ = load(await page.content());
  $(".SearchContentResults-tilesContainer > .AllEditionsItem-tile").each((_, el) => {
    const title = $(".AllEditionsItem-tileTitle a", el).text();
    const first = $("div.SearchResultListItem-dollarAmount", el).text();
    const price = "$" + first; 
    const condition = $(".SearchResultListItem-subheading strong", el).text();
    const author = $(".SearchResultListItem-bottomSpacing a", el).text();
    const image = $(".SearchResultTileItem-photo img", el).attr('src');

    



    productsData.push({
      title, // Use 'title' instead of 'name'
      price,
      condition,
      author,
      image,
    
    });
  });
  writeFile('products.json', JSON.stringify(productsData, null, 2))
  browser.close();
}
main();