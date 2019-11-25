export interface CodigoPostalData {
  // Street name
  address: string
  // Street number
  number: number
  // Commune name
  commune: string
}

export interface CodigoPostalResult extends CodigoPostalData {
  // ZIP code
  zip: number
}
