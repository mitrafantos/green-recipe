// const rp = require('request-promise');
// const parser = require('cheerio');
// const jsonframe = require('jsonframe-cheerio');
// const puppeteer = require('puppeteer');

// const url =  'https://www.perekrestok.ru/catalog/zamorojennye-produkty/ovoschi-i-smesi/kr-vk-griby-belye-zam-rez-300g--689963?searchPhrase=%D0%B1%D0%B5%D0%BB%D1%8B%D0%B5%20%D0%B3%D1%80%D0%B8%D0%B1%D1%8B';

// rp(url)
//   .then((html) => {
//     // success!
//     jsonframe(html);
// const $ = parser.load(url);
// jsonframe($);
// const frame = {
//   product: {
//     price: '.js-price-rouble;',
//     calories:
//       '.xf-product-info__block:nth-child(3) .xf-product-table__row:nth-child(1) .xf-product-table__col',
//   },
// };
// console.log($().scrape(frame));
// console.log(
//   parser(
//     '.xf-product-info__block:nth-child(3) .xf-product-table__row:nth-child(1) .xf-product-table__col',
//     html,
//   ).text(),
// );
// })
// .catch((err) => {
//   console.log(err);
// });

// const url = 'http://breakingmad.me/ru//?';

// puppeteer
//   .launch()
//   .then((browser) => browser.newPage())
//   .then((page) => page.goto(url).then(() => page.content()))
//   .then((html) => {
//     console.log(html);
//   })
//   .catch((err) => {
//     // handle error
//   });
