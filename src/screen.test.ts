import { test } from '@playwright/test';
import requests from './config';

const URLS = [
    // {
    //     engine: 'google',
    //     url: 'https://google.com/search?q',
    //     params: '',
    // },
    {
        engine: 'yandex',
        url: 'https://yandex.ru/search/?text',
        // params: '&lr=65',
        params: '&lr=24353&search_source=yaru_desktop_common&search_domain=yaru',
    //     https://ya.ru/search/?text=дизайнер+интерьера+обучение&lr=20103&search_source=yaru_desktop_common&search_domain=yaru
    },
]

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

URLS.forEach(item => {
    for (let key of Object.keys(requests)) {
        requests[key].forEach(request => {
            const label = `Получаем скриншот type (${key}), engine (${item.engine}): ${request}`

            test(label, async ({ page }) => {
                // await page.goto('https://it-quest.pro/');
                //
                // await page.waitForTimeout(getRandomArbitrary(1000, 3000));
                //
                // await page.goto('https://my-js.org/docs/cheatsheet/mastering-ts/');
                //
                // await page.waitForTimeout(getRandomArbitrary(1000, 4000));
                //
                // await page.goto('https://www.google.com/search?q=%D1%8F%D0%BD%D0%B4%D0%B5%D0%BA%D1%81&oq=%D1%8F%D0%BD%D0%B4%D0%B5%D0%BA%D1%81&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg7MgYIAhBFGEHSAQg3MzQ3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8');
                //
                // await page.waitForTimeout(getRandomArbitrary(1000, 5000));
                //
                // await page.goto('https://ya.ru/?utm_referrer=https%3A%2F%2Fwww.google.com%2F');
                //
                // await page.waitForTimeout(getRandomArbitrary(4000, 9000));

                // await page.getByRole('a').click({
                //     modifiers: ['ControlOrMeta'],
                //     position: { x: 0, y: 0 },
                // });

                const url = `${item.url}=${encodeURI(request)}${item.params}`;
                // const url = `${item.url}=${request.replace(/ /g, '+')}${item.params}`;

                console.log('url - ', url)

                await page.waitForTimeout(getRandomArbitrary(4000, 9000));

                await page.goto(url);

                await page.waitForTimeout(getRandomArbitrary(15000, 28000));

                let path = `./screenshots/${key}/${item.engine}/${request}.png`;

                console.log('path', path)

                await page.screenshot({ path });

                await page.waitForTimeout(getRandomArbitrary(12000, 23000));
            });
        })
    }
})
