const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pdfFillForm = require('pdf-fill-form');
const _ = require('lodash');

const basePath = path.join(__dirname, '../forms');
const filePath = path.join(basePath, 'credit-application.pdf');
const outPath = path.join(basePath, 'output.pdf');

router.get('/read', (req, res) => {
  pdfFillForm.read(filePath)
  .then(function(result) {
      console.log(result);
      res.json(result);
  }, function(err) {
      console.log(err);
  });
});


router.get('/write', (req, res) => {

  const dataToFill = {
    "65562": "2020",
    "65563": "1100000",
    "65564": "20000",
    "65565": "1000000",
    "65566": "20000"
  };

  const options = {
    "save": "pdf"
  };

  pdfFillForm.write(filePath, dataToFill, options)
  .then(function(result) {
      fs.writeFile(outPath, result, function(err) {
          if(err) {
         		console.log(err);
            res.send(err);
         	}
         	console.log("The file was saved!");
          var file = fs.createReadStream(outPath);
          var stat = fs.statSync(outPath);
          res.setHeader('Content-Length', stat.size);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=filled-form.pdf');
          file.pipe(res);
      });
  }, function(err) {
    	console.log(err);
      res.send(err);
  });
});

module.exports = router;
