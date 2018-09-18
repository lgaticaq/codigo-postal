'use strict'

const cheerio = require('cheerio')
const https = require('https')
const querystring = require('querystring')

const getZip = data => {
  return new Promise((resolve, reject) => {
    const qs = querystring.stringify({
      calle: data.address,
      numero: data.number,
      comuna: data.commune
    })
    const options = {
      hostname: 'codigopostal.correos.cl',
      port: 443,
      path: `/?${qs}`,
      method: 'GET'
    }
    const req = https.request(options, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request Failed. Status Code: ${res.statusCode}`))
      } else {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const $ = cheerio.load(rawData, { decodeEntities: false })
            const zip = $('.tu_codigo')
              .text()
              .trim()
            const address = $('.dato-info:nth-child(1)')
              .text()
              .trim()
            const number = $('.dato-info:nth-child(3)')
              .text()
              .trim()
            const commune = $('.dato-info:nth-child(5)')
              .text()
              .trim()
            if (!zip) throw new Error('Not found')
            resolve({
              zip: parseInt(zip, 10),
              address: address,
              number: number,
              commune: commune
            })
          } catch (err) {
            reject(err)
          }
        })
      }
    })
    req.on('error', err => reject(err))
    req.end()
  })
}

module.exports = getZip
