import { chromium, Browser, Page } from "playwright";
import cities from './config';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch({
    // headless: false,
    // proxy: {
    //     server: 'proxy-server.zenscrape.com:8282',
    // }
  });
});
afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
    const context = await browser.newContext({
        viewport: {
            width: 750,
            height: 650,
        },
    });
    page = await context.newPage();
});
afterEach(async () => {
    await page.close();
});

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

for (let key in cities) {
    // @ts-ignore
    const cityArr = cities[key].arr;
    const cityArrLength = cityArr.length;

    for (let index = 0; index < cityArrLength; index++) {
        const item = cityArr[index];
        const label = `Получаем скриншот ${key}: ${item}`

        it(label, async () => {
            console.log(label);

            // @ts-ignore
            const url = `https://google.com/search?q=${encodeURI(item)}&uule=${cities[key].uule}`;
            
            await page.goto(url);

            const ad = await page.$('#tvcap');

            if (ad == null) {
                return;
            }

            console.log(url);

            // console.log(`ad - ${ad}`);
            
            await page.waitForTimeout(getRandomArbitrary(3000, 6000));

            const btn = await page.$('#hdtb-tls');

            if (btn) {
                await btn.click();
            }

            await page.waitForTimeout(getRandomArbitrary(1000, 5000));

            let path = `./screenshots/${key}/${item}.png`;

            // @ts-ignore
            const text = await ad.innerText();
            
            // console.log(`text - ${text}`);
            
            if (Boolean(text)) {
                path = `./screenshots/${key}/реклама/${item}.png`;
            }

            await page.screenshot({ path });

            console.log(`path - ${path}`);
            // console.log(`check - ${key}/${item}`);
            
            await page.waitForTimeout(getRandomArbitrary(7000, 31000));
        });
    }
}

