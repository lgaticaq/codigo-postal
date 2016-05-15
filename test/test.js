'use strict';

const path = require('path');

const expect = require('chai').expect;
const nock = require('nock');

const lib = require('../src');

describe('codigo-postal', () => {

  describe('valid', () => {

    const data = {
      address: 'avenida siempreviva',
      number: 742,
      commune: 'springfield'
    };

    beforeEach(() => {
      const query = {
        calle: data.address,
        numero: data.number,
        comuna: data.commune
      };
      nock.disableNetConnect();
      nock('http://www.correos.cl')
        .get('/SitePages/codigo_postal/codigo_postal.aspx')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'valid.html'));
    });

    it('should return a valid result', done => {
      lib(data).then(result => {
        expect(result).to.be.a('object');
        expect(result.zip).to.be.a('number');
        expect(result.address).to.be.a('string');
        expect(result.number).to.be.a('string');
        expect(result.commune).to.be.a('string');
        done();
      }).catch(err => {
        expect(err).to.be.null;
        done();
      });
    });
  });

  describe('invalid', () => {

    const data = {
      address: 'avenida siemprebiba',
      number: 666,
      commune: 'springfield'
    };

    beforeEach(() => {
      const query = {
        calle: data.address,
        numero: data.number,
        comuna: data.commune
      };
      nock.disableNetConnect();
      nock('http://www.correos.cl')
        .get('/SitePages/codigo_postal/codigo_postal.aspx')
        .query(query)
        .replyWithFile(200, path.join(__dirname, 'invalid.html'));
    });

    it('should return a empty result', done => {
      lib(data).then(result => {
        expect(result).to.be.undefined;
        done();
      }).catch(err => {
        expect(err).to.eql(new Error('Not found'));
        done();
      });
    });
  });
});
