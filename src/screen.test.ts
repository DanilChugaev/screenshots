import { test } from '@playwright/test';
import requests from './config';

const URLS = [
    {
        engine: 'google',
        url: 'https://google.com/search?q',
        params: '',
    },
    {
        engine: 'yandex',
        url: 'https://yandex.ru/search/?text',
        params: '&lr=65',
    },
]

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

URLS.forEach(item => {
    requests.forEach(request => {
        const label = `Получаем скриншот ${item.engine}: ${request}`

        test(label, async ({ page }) => {
            const url = `${item.url}=${encodeURI(request)}${item.params}`;

            await page.goto(url);

            await page.waitForTimeout(getRandomArbitrary(3000, 6000));

            let path = `./screenshots/${item.engine}/${request}.png`;

            await page.screenshot({ path });

            console.log(`path - ${path}`);

            await page.waitForTimeout(getRandomArbitrary(7000, 31000));
        });
    })
})
