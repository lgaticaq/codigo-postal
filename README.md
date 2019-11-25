# codigo-postal

[![npm version](https://img.shields.io/npm/v/codigo-postal.svg)](https://www.npmjs.com/package/codigo-postal)
[![npm downloads](https://img.shields.io/npm/dm/codigo-postal.svg)](https://www.npmjs.com/package/codigo-postal)
[![Build Status](https://travis-ci.org/lgaticaq/codigo-postal.svg?branch=master)](https://travis-ci.org/lgaticaq/codigo-postal)
[![Coverage Status](https://coveralls.io/repos/github/lgaticaq/codigo-postal/badge.svg?branch=master)](https://coveralls.io/github/lgaticaq/codigo-postal?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d54d170f29dfb6ee7a2/maintainability)](https://codeclimate.com/github/lgaticaq/codigo-postal/maintainability)
[![dependency Status](https://img.shields.io/david/lgaticaq/codigo-postal.svg)](https://david-dm.org/lgaticaq/codigo-postal#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/codigo-postal.svg)](https://david-dm.org/lgaticaq/codigo-postal#info=devDependencies)

> Get postal code from Correos de Chile

## Installation

```bash
npm i -S codigo-postal
```

## Use

[Try on Tonic](https://tonicdev.com/npm/codigo-postal)
```js
const codigoPostal = require('codigo-postal')

const data = {
  address: 'avenida siempreviva',
  number: 742,
  commune: 'springfield'
}

codigoPostal(data).then(console.log)
```

Result:

```js
{
  zip: XXXXX, // a number
  address: XXXXX, // a string
  number: XXXXX, // a string
  commune: XXXXX, // a string
}
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
