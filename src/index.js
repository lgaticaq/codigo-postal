'use strict';

const cheerio = require('cheerio');
const rp = require('request-promise');

const getZip = data => {
  const options = {
    url: 'http://www.correos.cl/SitePages/codigo_postal/codigo_postal.aspx',
    qs: {
      calle: data.address,
      numero: data.number,
      comuna: data.commune
    },
    transform: cheerio.load
  };
  return rp(options).then($ => {
    const zip = $('span[id$="CodigoPostal"]').text();
    const address = $('span[id$="Calle"]').text();
    const number = $('span[id$="Numero"]').text();
    const commune = $('span[id$="Comuna"]').text();
    if (!zip) throw new Error('Not found');
    return {
      zip: parseInt(zip, 10),
      address: address,
      number: number,
      commune: commune
    };
  });
};

module.exports = getZip;
