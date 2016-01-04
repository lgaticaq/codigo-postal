'use strict';

import path from 'path';

import {expect} from 'chai';
import nock from 'nock';

import lib from '../lib';

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

    it('should return a valid result (callback)', (done) => {
      lib(data, (err, result) => {
        expect(err).to.be.null;
        expect(result).to.be.a('object');
        expect(result.zip).to.be.a('number');
        expect(result.address).to.be.a('string');
        expect(result.number).to.be.a('string');
        expect(result.commune).to.be.a('string');
        done();
      });
    });


    it('should return a valid result (promise)', (done) => {
      lib(data).then((result) => {
        expect(result).to.be.a('object');
        expect(result.zip).to.be.a('number');
        expect(result.address).to.be.a('string');
        expect(result.number).to.be.a('string');
        expect(result.commune).to.be.a('string');
        done();
      }).fail((err) => {
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

    it('should return a empty result (callback)', (done) => {
      lib(data, (err, result) => {
        expect(err).to.eql(new Error('Not found'));
        expect(result).to.be.undefined;
        done();
      });
    });

    it('should return a empty result (promise)', (done) => {
      lib(data).then((result) => {
        expect(result).to.be.undefined;
        done();
      }).fail((err) => {
        expect(err).to.eql(new Error('Not found'));
        done();
      });
    });
  });
});
