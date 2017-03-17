const textFieldConfig = {
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

const checkboxFieldConfig = {
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

module.exports = {
  textFieldConfig: textFieldConfig,
  checkboxFieldConfig: checkboxFieldConfig
};
