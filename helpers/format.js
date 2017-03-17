const numeral = require('numeral');
const moment = require('moment');

module.exports = {
  currency: (number) => numeral(number).format('($0,0.00)'),
  percentage: (number) => `${numeral(number).format('(0.000)')}%`,
  number: (formatString) => numeral(formatString).value(),
  now: (timeOffset, formatString) => moment().utcOffset(timeOffset).format(formatString || 'MM/DD/YYYY hh:mm A'),
  date: (dateOffset, inputformatString, outputformatString) =>
    moment(dateOffset, inputformatString || ['DD-MM-YYYY', 'MM-DD-YYYY']).format(outputformatString || 'MM/DD/YYYY'),
};
