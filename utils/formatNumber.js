/**
 *
 * @param {Number} number a valid number type
 * @param {String | undefined} currency Optional: one of the ISO 4217 code in string type, ex 'EUR'
 * @returns {String} formated number whit two decimal places with or without currency symbol
 */
export default function formatNumber(number, currency) {
  const numberToFormat = Number(number);
  if (isNaN(numberToFormat)) {
    return 'Invalid number';
  }
  try {
    return numberToFormat.toLocaleString('en-In', {
      style: currency ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } catch (error) {
    if (error.message === `Invalid currency code : ${currency}`) {
      return 'bad currency code, see ISO 4217 Standard';
    }
  }
}
