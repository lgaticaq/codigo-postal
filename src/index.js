const https = require('https')
const querystring = require('querystring')

/**
 * @typedef {import('./types').CodigoPostalData} CodigoPostalData
 * @typedef {import('./types').CodigoPostalResult} CodigoPostalResult
 * @typedef {import('https').RequestOptions} RequestOptions
 */
/**
 * @param {CodigoPostalData} data -
 * @returns {Promise<CodigoPostalResult>} -
 * @example
 * const { zip } = await getZip(data)
 */
const getZip = data => {
  return new Promise((resolve, reject) => {
    const qs = querystring.stringify({
      _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_comuna:
        data.commune,
      _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_calle:
        data.address,
      _cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_numero:
        data.number
    })
    /** @type {RequestOptions} */
    const options = {
      hostname: 'www.correos.cl',
      port: 443,
      path:
        '/web/guest/codigo-postal?p_p_id=cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=COOKIES_RESOURCE_ACTION&p_p_cacheability=cacheLevelPage&_cl_cch_codigopostal_portlet_CodigoPostalPortlet_INSTANCE_MloJQpiDsCw9_cmd=CMD_ADD_COOKIE',
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64; rv:71.0) Gecko/20100101 Firefox/71.0',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      rejectUnauthorized: false
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
            const data = JSON.parse(rawData)
            if (data.codigoEstadoRespuesta !== '1') {
              throw new Error(
                `Invalid response code: ${data.codigoEstadoRespuesta}`
              )
            }
            if (data.error) {
              throw new Error(`Response with error: ${data.error}`)
            }
            resolve({
              zip: parseInt(data.direcciones[0].codPostal, 10),
              address: data.direcciones[0].calle,
              number: data.direcciones[0].numero,
              commune: data.direcciones[0].comuna
            })
          } catch (err) {
            reject(err)
          }
        })
      }
    })
    req.on('error', err => reject(err))
    req.write(qs)
    req.end()
  })
}

module.exports = getZip
