'use strict';

import Q from 'q';
import cheerio from 'cheerio';
import rp from 'request-promise';

const getZip = (data, cb) => {
  const deferred = Q.defer();
  const options = {
    url: 'http://www.correos.cl/SitePages/codigo_postal/codigo_postal.aspx',
    qs: {
      calle: data.address,
      numero: data.number,
      comuna: data.commune
    },
    transform: (body) => cheerio.load(body)
  };
  rp(options).then(($) => {
    const zip = $('span[id$="CodigoPostal"]').text();
    const address = $('span[id$="Calle"]').text();
    const number = $('span[id$="Numero"]').text();
    const commune = $('span[id$="Comuna"]').text();
    if (!zip) deferred.reject(new Error('Not found'));
    deferred.resolve({
      zip: parseInt(zip, 10),
      address: address,
      number: number,
      commune: commune
    });
  }).catch((err) => deferred.reject(err));
  deferred.promise.nodeify(cb);
  return deferred.promise;
};

module.exports = getZip;
