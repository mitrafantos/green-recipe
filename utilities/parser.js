const request = require('request-promise');
const parse = require('cheerio');

const parsePage = async function (link) {
  try {
    const html = await request(link);
    const result = {
      name: parse('h1.js-product__title.xf-product-card__title', html).text().trim(),
      price: parse('.js-price-rouble', html).text() + parse('.js-price-penny', html).text().replace(/,/, '.').trim(),
      calories: parse('.xf-product-info__block', html).find('.xf-product-table__col').text().match(/\S+ кКал/)[0].replace(/ кКал/, '').trim(),
      link,
    };
    return result;
  } catch (err) { return err; }
};

request('https://www.perekrestok.ru/catalog/zamorojennye-produkty/yagody-i-frukty/prst-klubnika-bzam-900g--360356?searchPhrase=%D0%BA%D0%BB%D1%83%D0%B1%D0%BD%D0%B8%D0%BA%D0%B0').then((html) => {
  const result = {
    name: parse('h1.js-product__title.xf-product-card__title', html).text().trim(),
    price: parse('.js-price-rouble', html).text() + parse('.js-price-penny', html).text().replace(/,/, '.').trim(),
    calories: parse('.xf-product-info__block', html).find('.xf-product-table__col').text().match(/\S+ кКал/)[0].replace(/ кКал/, '').trim(),
  };
  console.log(result);
});

module.exports = parsePage;
