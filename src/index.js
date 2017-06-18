'use strict'

const cheerio = require('cheerio')
const http = require('http')
const querystring = require('querystring')

const getZip = data => {
  return new Promise((resolve, reject) => {
    const qs = querystring.stringify({
      calle: data.address,
      numero: data.number,
      comuna: data.commune
    })
    const options = {
      hostname: 'www.correos.cl',
      port: 80,
      path: `/SitePages/codigo_postal/codigo_postal.aspx?${qs}`,
      method: 'GET'
    }
    const req = http.request(options, res => {
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
            const zip = $('span[id$="CodigoPostal"]').text()
            const address = $('span[id$="Calle"]').text()
            const number = $('span[id$="Numero"]').text()
            const commune = $('span[id$="Comuna"]').text()
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
