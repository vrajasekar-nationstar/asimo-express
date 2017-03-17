const config = require('../config');
const _ = require('lodash');

const processTextFields = (data) => {
  var result = {};
  _.each(config.textFieldConfig, (value, key) => {
    result[value] = _.get(data, key, '');
  });
  return result;
};

const processCheckboxFields = (data) => {
  var result = {};
  _.each(config.checkboxFieldConfig, (value, key) => {
    var checkedValue = _.get(data, key, undefined);
    var checkedKeyId;
    if (checkedValue) {
      checkedKeyId =  _.get(value, checkedValue, undefined);
    }
    if (checkedKeyId) {
      result[checkedKeyId] = true;
    }
  });
  return result;
};

module.exports = {
  processTextFields: processTextFields,
  processCheckboxFields: processCheckboxFields
};
