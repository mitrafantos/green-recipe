const request = require('request-promise');
const parse = require('cheerio');

const parsePage = async (link) => {
  try {
    const html = await request(link);
    const result = {
      name: parse('h1.js-product__title.xf-product-card__title', html).text().trim(),
      price: parse('.js-price-rouble', html).text() + parse('.js-price-penny', html).text().replace(/,/, '.').trim(),
      calories: parse('.xf-product-info__block', html).find('.xf-product-table__col').text().match(/\S+ кКал/)[0].replace(/ кКал/, '').trim(),
      link,
    };
    return result;
  } catch (err) { return err }
};

module.exports = parsePage;
