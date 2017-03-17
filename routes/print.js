const express = require('express');
const router = express.Router();
const path = require('path');
const jade = require('jade');
const pdf = require('wkhtmltopdf');
const _ = require('lodash');
const format = require('../helpers/format');

const htmlTemplate = (templatePath, data) => {
  const template = jade.compileFile(templatePath, {});
  return template(data);
};

const getHtmlToPrint = (data) => {
  const dataWithPath = _.merge(data, { basePath: path.join(__dirname, '../templates', 'assets') }, { format });
  const basePath = path.join(__dirname, '../templates');
  return {
    header: path.join(basePath, 'header.html'),
    body: htmlTemplate(path.join(basePath, 'index.jade'), dataWithPath),
    footer: path.join(basePath, 'footer.html'),
  };
};

router.get('/', (req, res) => {
  // const author = `${req.user.FirstName} ${req.user.LastName}`;
  // const data = _.merge(JSON.parse(req.body.data), { author });
  const mockData = {
    section: {
      propertyInformation: {
        subjectPropertyAddress: 'sample subject property address',
        noOfUnits: 1,
        legalDescription: 'sample legal decription for property',
        yearBuilt: 2016,
        purposeOfLoan: 'refinance',
        propertyWillBe: 'primary residence',
        construction: {
          yearLotAcquired: 2013,
          originalCost: 1200000,
          amountExistingLiens: 10000,
          presentValueOfLot: 1100000,
          costOfImprovements: 20000,
          total: 1120000
        },
        refinance: {
          yearAcquired: 2014,
          originalCost: 1200000,
          amountExistingLiens: 10000,
          purposeOfRefinance: "Better Interest Rate",
          improvementsMade: false,
          improvementsToBeMade: true,
          improvements: "New Swimming Pool at the backyard",
          costOfImprovements: 20000
        },
        titleName: "Sean Bean, Violet Bean ",
        titleManner: "Mr and Mrs Bean",
        sourceDetails: "Annual bonus for working as Solution Architect at Google",
        estateWillBeHeldIn: 'leasehold',
        leasholdExpiryDate: '04/01/2017'
      }
    }
  };
  const data = req.body.data ? JSON.parse(req.body.data) : mockData;
  const html = getHtmlToPrint(data);
  const options = {
    pageSize: 'A4',
    headerHtml: html.header,
    headerSpacing: 2,
    footerHtml: html.footer,
    footerSpacing: 2,
  };
  // res.set('Content-Type', 'text/html');
  // res.send(html.body);
  res.set('Content-Type', 'application/pdf');
  pdf.command = '/usr/local/bin/wkhtmltopdf';
  pdf(html.body, options).pipe(res);
});

router.post('/', (req, res) => {
  // const author = `${req.user.FirstName} ${req.user.LastName}`;
  // const data = _.merge(JSON.parse(req.body.data), { author });
  const data = req.body.data ? JSON.parse(req.body.data) : {};
  const html = getHtmlToPrint(data);
  const options = {
    pageSize: 'A4',
    headerHtml: html.header,
    headerSpacing: 2,
    footerHtml: html.footer,
    footerSpacing: 2,
  };
  res.set('Content-Type', 'application/pdf');
  pdf.command = '/usr/local/bin/wkhtmltopdf';
  pdf(html.body, options).pipe(res);
});

module.exports = router;
