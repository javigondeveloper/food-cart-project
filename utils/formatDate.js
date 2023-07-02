/**
 *
 * @param {Date | String} date a date in format Date or String
 * @returns date based on the OS regional config
 */
export default function formatDate(date) {
  const dateToformat = new Date(date);
  if (dateToformat == 'Invalid Date') {
    return date;
  }
  return dateToformat.toLocaleString();
}
