/* eslint-disable sonarjs/no-identical-functions */
const { describe, it, before, beforeEach } = require('mocha')
const { expect } = require('chai')
const nock = require('nock')
const querystring = require('querystring')
const lib = require('../src')

const DEFAULT_HOSTNAME = 'https://www.correos.cl'
const DEFAULT_PATH =
  '/web/guest/codigo-postal?p_p_id=cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=COOKIES_RESOURCE_ACTION&p_p_cacheability=cacheLevelPage&_cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_cmd=CMD_ADD_COOKIE'
const data = {
  address: 'avenida siempreviva',
  number: 742,
  commune: 'springfield'
}

describe('codigo-postal', () => {
  describe('valid', () => {
    before(() => {
      nock.disableNetConnect()
      nock(DEFAULT_HOSTNAME)
        .post(
          DEFAULT_PATH,
          querystring.stringify({
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
              data.commune,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
              data.address,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
              data.number
          })
        )
        .reply(200, {
          currentDir: `{"comuna":"${data.commune}","calle":"${
            data.address
          }","numero":"${
            data.number
          }","latitud":"","longitud":"","codPostal":"8360593"}`,
          direcciones: [
            {
              latitud: '',
              longitud: '',
              numero: data.number.toString(),
              calle: data.address,
              comuna: data.commune,
              codPostal: '8360593'
            }
          ],
          error: false,
          codigoEstadoRespuesta: '1'
        })
    })

    it('should return a valid result', async () => {
      const result = await lib(data)
      expect(result).to.be.a('object')
      expect(result.zip).to.be.a('number')
      expect(result.address).to.be.a('string')
      expect(result.number).to.be.a('string')
      expect(result.commune).to.be.a('string')
    })
  })

  describe('invalid', () => {
    before(() => {
      nock.disableNetConnect()
      nock(DEFAULT_HOSTNAME)
        .post(
          DEFAULT_PATH,
          querystring.stringify({
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
              data.commune,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
              data.address,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
              data.number
          })
        )
        .reply(200, {
          currentDir: `{"comuna":"${data.commune}","calle":"${
            data.address
          }","numero":"${
            data.number
          }","latitud":"","longitud":"","codPostal":"8360593"}`,
          direcciones: [],
          error: false,
          codigoEstadoRespuesta: '0'
        })
    })

    it('should return a empty result', async () => {
      try {
        await lib(data)
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })

  describe('invalid with error', () => {
    before(() => {
      nock.disableNetConnect()
      nock(DEFAULT_HOSTNAME)
        .post(
          DEFAULT_PATH,
          querystring.stringify({
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
              data.commune,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
              data.address,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
              data.number
          })
        )
        .reply(200, {
          currentDir: `{"comuna":"${data.commune}","calle":"${
            data.address
          }","numero":"${
            data.number
          }","latitud":"","longitud":"","codPostal":"8360593"}`,
          direcciones: [],
          error: true,
          codigoEstadoRespuesta: '1'
        })
    })

    it('should return a empty result', async () => {
      try {
        await lib(data)
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })

  describe('server error', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock(DEFAULT_HOSTNAME)
        .post(
          DEFAULT_PATH,
          querystring.stringify({
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
              data.commune,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
              data.address,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
              data.number
          })
        )
        .replyWithError('Server error')
    })

    it('should return an error', async () => {
      try {
        await lib(data)
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })

  describe('bad status code', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock(DEFAULT_HOSTNAME)
        .post(
          DEFAULT_PATH,
          querystring.stringify({
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
              data.commune,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
              data.address,
            _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
              data.number
          })
        )
        .reply(301)
    })

    it('should return an error', async () => {
      try {
        await lib(data)
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })
})
/* eslint-enable sonarjs/no-identical-functions */
