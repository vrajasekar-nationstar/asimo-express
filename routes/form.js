"use strict";
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pdfFillForm = require('pdf-fill-form');
const _ = require('lodash');
const helper = require('../helper');

const basePath = path.join(__dirname, '../forms');
const filePath = path.join(basePath, 'input-form.pdf');
const outPath = path.join(basePath, 'filled-form.pdf');

router.get('/read', (req, res) => {
  pdfFillForm.read(filePath)
  .then(function(result) {
      res.json(result);
  }, function(err) {
      res.json(err);
  });
});

router.post('/write', (req, res) => {
  let inputData =  JSON.parse(req.body.data) || {};
  inputData.purposeOfLoan = 'Refinance';
  const textData = helper.processTextFields(inputData);
  const checkboxData = helper.processCheckboxFields(inputData);
  const dataToFill = _.merge(textData, checkboxData);
  const options = {
    "save": "pdf"
  };

  pdfFillForm.write(filePath, dataToFill, options)
  .then(function(result) {
      fs.writeFile(outPath, result, function(err) {
          if(err) {
         		res.send(err);
         	}
          var file = fs.createReadStream(outPath);
          var stat = fs.statSync(outPath);
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=filled-form.pdf');
          file.pipe(res);
      });
  }, function(err) {
      res.send(err);
  });
});

module.exports = router;
