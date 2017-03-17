"use strict";
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

let textFieldConfig = {
  "propertyInformation.subjectPropertyAddress": "Subject Property Address",
  "propertyInformation.noOfUnits": "No. of Units",
  "propertyInformation.subjectPropertyDescription": "Subject Property Description",
  "propertyInformation.yearBuilt": "Year Built",
  "propertyInformation.construction.yearLotAcquired": "Year Lot Acquired",
  "propertyInformation.construction.originalCost": "Original Cost",
  "propertyInformation.construction.amountExistingLiens": "Amount Existing Liens",
  "propertyInformation.construction.presentValueOfLot": "Present Value of Lot",
  "propertyInformation.construction.costOfImprovements": "Cost of Improvements",
  "propertyInformation.construction.total": "Total a+b",
  "propertyInformation.refinance.yearAcquired": "Year Lot Acquired 2",
  "propertyInformation.refinance.originalCost": "Original Cost 2",
  "propertyInformation.refinance.amountExistingLiens": "Amount Existing Liens 2",
  "propertyInformation.refinance.purposeOfRefinance": "Purpose of Refinance",
  "propertyInformation.refinance.describeImprovementsText": "65572",
  "propertyInformation.refinance.costOfImprovements": "Cost of Improvements 2",
  "propertyInformation.titleName": "Title will be held in what names",
  "propertyInformation.titleManner": "Manner in which Title will be held",
  "propertyInformation.sourceDetails": "65580"
};

textFieldConfig = {
  "propertyAddress": "Subject Property Address",
  "noOfUnits": "No. of Units",
  "legalDescription": "Subject Property Description",
  "yearBuilt": "Year Built",
  "yearAccquired": "Year Lot Acquired 2",
  "originalCost": "Original Cost 2",
  "amountExistingLiens": "Amount Existing Liens 2",
  "purposeOfRefinance": "Purpose of Refinance",
  "describeImprovementsText": "65572",
  "describeImprovementsCost": "Cost of Improvements 2",
  "titleHeldIn": "Title will be held in what names",
  "titleManner": "Manner in which Title will be held",
  "sourceOfPayment": "65580",
  "borrowerName": "Borrower Name",
  "borrowerSSN": "Borrower SSN",
  "borrowerHomePhone": "Borrower Home Phone",
  "borrowerDOB": "Borrower DOB",
  "borrowerYearsOfSchool": "Borrower DOB Yrs School",
  "borrowerDependentCount": "Dependents not listed by Co-Borrower no",
  "borrowerDependentAges": "Dependents not listed by Co-Borrower ages",
  "borrowerPresentAddress": "Borrower Present Address",
  "borrowerMailingAddress": "Borrower Mailing Address if different from Present",
  "borrowerFormerAddress": "Borrower Former Address if different from Present",
  "coBorrowerName": "Co-Borrower Name",
  "coBorrowerSSN": "Co-Borrower SSN",
  "coBorrowerHomePhone": "Co-Borrower Home Phone",
  "coBorrowerDOB": "Co-Borrower DOB",
  "coBorrowerYearsOfSchool": "Co-Borrower Yrs School",
  "coBorrowerDependentCount": "Dependents not listed by Borrower no",
  "coBorrowerDependentAges": "Dependents not listed by Borrower ages",
  "coBorrowerPresentAddress": "Co-Borrower Present Address",
  "coBorrowerMailingAddress": "Co-Borrower Mailing Address if different from Present",
  "coBorrowerFormerAddress": "Co-Borrower Former Address if different from Present"
};

let checkboxFieldConfig = {
  "propertyInformation.purposeOfLoan": {
    "Purchase": 65554,
    "Construction": 65555,
    "Other": 65556,
    "Refinance": 65557,
    "Construction-Permanent": 65558
  },
  "propertyInformation.propertyWillBe": {
    "Primary Residence": 65559,
    "Secondary Residence": 65560,
    "Investment": 65561
  },
  "propertyInformation.refinance.describeImprovements": {
    "made": 65573,
    "not made": 65574
  },
  "propertyInformation.estateWillBeHeldIn": {
    "Fee Simple": 65578,
    "Leasehold": 65579
  }
};

checkboxFieldConfig = {
  "purposeOfLoan": {
    "Purchase": 65554,
    "Construction": 65555,
    "Other": 65556,
    "Refinance": 65557,
    "Construction-Permanent": 65558
  },
  "propertyWillBe": {
    "Primary Residence": 65559,
    "Secondary Residence": 65560,
    "Investment": 65561
  },
  "describeImprovements": {
    "made": 65573,
    "not made": 65574
  },
  "estateWillBeHeldIn": {
    "Fee Simple": 65578,
    "Leasehold": 65579
  },
  "borrowerMaritalStatus": {
    "Married": 65586,
    "Unmarried": 65587,
    "Separated": 65588
  },
  "borrowerPresentAddressType": {
    "Own": 65591,
    "Rent": 65592
  },
  "borrowerFormerAddressType": {
    "Own": 65596,
    "Rent": 65597
  },
  "coBorrowerMaritalStatus": {
    "Married": 65605,
    "Unmarried": 65606,
    "Separated": 65607
  },
  "coBorrowerPresentAddressType": {
    "Own": 65610,
    "Rent": 65611
  },
  "coBorrowerFormerAddressType": {
    "Own": 65615,
    "Rent": 65616
  }
};



const processTextFields = (data, textFieldConfig) => {
  var result = {};
  _.each(textFieldConfig, (value, key) => {
    result[value] = _.get(data, key, '');
  });
  return result;
};

const processCheckboxFields = (data, checkboxFieldConfig) => {
  var result = {};
  _.each(checkboxFieldConfig, (value, key) => {
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

router.post('/write', (req, res) => {
  let inputData = req.body || {};
  inputData.purposeOfLoan = 'Refinance';
  const textData = processTextFields(inputData, textFieldConfig);
  const checkboxData = processCheckboxFields(inputData, checkboxFieldConfig);
  const dataToFill = _.merge(textData, checkboxData);
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

router.get('/write', (req, res) => {
  let inputData = {
      propertyInformation: {
        subjectPropertyAddress: '24/8, Dallas, TX, 345678',
        noOfUnits: 1,
        subjectPropertyDescription: 'Multiplex Condo apartment',
        yearBuilt: 2012,
        purposeOfLoan: 'Refinance',
        propertyWillBe: 'Primary Residence',
        construction: {
          yearLotAcquired: 2013,
          originalCost: 1200000,
          amountExistingLiens: 10040,
          presentValueOfLot: 1100000,
          costOfImprovements: 20000,
          total: 1120000
        },
        refinance: {
          yearAcquired: 2014,
          originalCost: 1300000,
          amountExistingLiens: 13450,
          purposeOfRefinance: "Better Interest Rate",
          describeImprovements: "not made",
          describeImprovementsText: "New Swimming Pool at the backyard",
          costOfImprovements: 28000
        },
        titleName: "Sean Bean, Violet Bean ",
        titleManner: "Mr and Mrs Bean",
        sourceDetails: "Annual bonus for working as Solution Architect at Google",
        estateWillBeHeldIn: 'Leasehold'
      }
  };

  inputData = {
    "propertyAddress": "Address of Property",
  	"borrowerName": "Applicant",
  	"borrowerSSN": "123-45-6789",
  	"borrowerDOB": "03/22/1996",
  	"noOfUnits": "2",
  	"legalDescription": "Legal",
  	"yearBuilt": "2003",
  	"propertyWillBe": "Secondary Residence",
  	"yearAccquired": "2004",
  	"originalCost": "40000",
  	"amountExistingLiens": "30000",
  	"purposeOfRefinance": "BO",
  	"describeImprovements": "made",
  	"describeImprovementsCost": "2000",
  	"titleHeldIn": "Deed",
  	"titleManner": "Sale",
  	"sourceOfPayment": "Cash",
  	"estateWillBeHeldIn": "Fee Simple",
  	"borrowerHomePhone": "34234",
  	"borrowerYearsOfSchool": "12",
  	"borrowerMaritalStatus": "Married",
  	"borrowerDependentCount": "2",
  	"borrowerDependentAges": "10, 16",
  	"borrowerPresentAddress": "Present",
  	"borrowerPresentAddressType": "Own",
  	"borrowerMailingAddress": "Present",
  	"borrowerFormerAddress": "former",
  	"borrowerFormerAddressType": "Rent",
  	"coBorrowerName": "Applicant 2",
  	"coBorrowerSSN": "123-45-6780",
  	"coBorrowerDOB": "03/22/1998",
  	"coBorrowerHomePhone": "123213",
  	"coBorrowerYearsOfSchool": "14",
  	"coBorrowerMaritalStatus": "Married",
  	"coBorrowerDependentCount": "1",
  	"coBorrowerDependentAges": "11",
  	"coBorrowerPresentAddress": "Present 2",
  	"coBorrowerPresentAddressType": "Own",
  	"coBorrowerMailingAddress": "Present 2",
  	"coBorrowerFormerAddress": "Former 2",
  	"coBorrowerFormerAddressType": "Own"
  };
  inputData.purposeOfLoan = 'Refinance';

  let dataToFill = {
    "Subject Property Address": "24/8, Dallas, TX, 345678",
    "No. of Units": "1",
    "Subject Property Description": "Condo",
    "65562": "2220",
    "65563": "1100000",
    "65564": "20000",
    "65565": "1000000",
    "65566": "20000"
  };
  const textData = processTextFields(inputData, textFieldConfig);
  const checkboxData = processCheckboxFields(inputData, checkboxFieldConfig);
  dataToFill = _.merge(textData, checkboxData);

  console.log('datatofill', dataToFill);

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
