# codigo-postal

[![npm version](https://img.shields.io/npm/v/codigo-postal.svg?style=flat-square)](https://www.npmjs.com/package/codigo-postal)
[![npm downloads](https://img.shields.io/npm/dm/codigo-postal.svg?style=flat-square)](https://www.npmjs.com/package/codigo-postal)
[![Build Status](https://img.shields.io/travis/lgaticaq/codigo-postal.svg?style=flat-square)](https://travis-ci.org/lgaticaq/codigo-postal)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/codigo-postal/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/codigo-postal?branch=master)
[![dependency Status](https://img.shields.io/david/lgaticaq/codigo-postal.svg?style=flat-square)](https://david-dm.org/lgaticaq/codigo-postal#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/codigo-postal.svg?style=flat-square)](https://david-dm.org/lgaticaq/codigo-postal#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/codigo-postal](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/codigo-postal?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Get postal code from Correos de Chile

## Installation

```bash
npm i -S codigo-postal
```

## Use

[Try on Tonic](https://tonicdev.com/npm/codigo-postal)
```js
const codigoPostal = require('codigo-postal');

const data = {
  address: 'avenida siempreviva',
  number: 742,
  commune: 'springfield'
};

codigoPostal(data).then(console.log);
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
