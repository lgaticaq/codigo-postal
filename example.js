const codigoPostal = require('codigo-postal');

const data = {
  address: 'avenida siempreviva',
  number: 742,
  commune: 'springfield'
};

const result = await codigoPostal(data)
