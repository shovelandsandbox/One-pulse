import { metaFinder } from "../../utils";
import { metaLabelOrNil } from "../../../utils/meta-utils";
const propertyType = "value";
const propertyLabelType = "label";

const myPolicyMetaFinder = key =>
  metaFinder("myPolicy", key, propertyType)[propertyType];

const myPolicyMetaLabelFinder = key =>
  metaFinder("myPolicy", key, propertyType)[propertyLabelType];

const myPolicyTitleFinder = key =>
  metaFinder("MeNew", key, propertyType)[propertyLabelType];

const myPolicyMetaObjectFinder = key =>
  metaFinder("myPolicy", key, propertyLabelType);

const laRiders = key => metaLabelOrNil("laRiders", key);
const laPolicyRiderStatuses = key =>
  metaLabelOrNil("laPolicyRiderStatuses", key);
const laProductNames = key => metaLabelOrNil("laProductNames", key);

export const myPolicyMetaKeys = {
  detailLoading: "detailLoading",
  errorBack: "errorBack",
  policyNumber: "policyNumber",
  eMedicalCardDownload: "eMedicalCardDownload",
  policyInfo: "policyInfo",
  benefitAndInvestment: "benefitAndInvestment",
  ePolicy: "ePolicy",
  policyDetailLoading: "policyDetailLoading",
  coveragePrice: "coveragePrice",
  coverageStartDate: "coverageStartDate",
  coverageEndDate: "coverageEndDate",
  additionalInsurance: "additionalInsurance",
  investmentFund: "investmentFund",
  ePolicyInstruction1: "ePolicyInstruction1",
  ePolicyDownloading: "ePolicyDownloading",
  ePolicyInstruction2: "ePolicyInstruction2",
  ePolicyInstruction3: "ePolicyInstruction3",
  ePolicyInstruction4: "ePolicyInstruction4",
  ePolicyInfo1: "ePolicyInfo1",
  ePolicyTitle: "ePolicyTitle",
  ePolicyTitle1: "ePolicyTitle1",
  ePolicyTitle2: "ePolicyTitle2",
  ePolicyTitle3: "ePolicyTitle3",
  ePolicyTitle4: "ePolicyTitle4",
  ePolicyTitle5: "ePolicyTitle5",
  ePolicyTitle6: "ePolicyTitle6",
  agentName: "agentName",
  marketingOffice: "marketingOffice",
  myAgent: "myAgent",
  policyHolder: "policyHolder",
  myPremium: "myPremium",
  frequency: "frequency",
  paymentMethod: "paymentMethod",
  dueDate: "dueDate",
  bankAccount: "bankAccount",
  active: "active",
  inactive: "inactive",
  premiumStatus: "premiumStatus",
  basicPremium: "basicPremium",
  pruSaver: "pruSaver",
  totalPremium: "totalPremium",
  policyStartingDate: "policyStartingDate",
  topUp: "topUp",
  totalPremiumDeposit: "totalPremiumDeposit",
  firstPremiumPayment: "firstPremiumPayment",
  policyDocumentSendDate: "policyDocumentSendDate",
  policyDocumentReceivedDate: "policyDocumentReceivedDate",
  policyData: "policyData",
  assured: "assured",
  benefitReceiver: "benefitReceiver",
  cashTotal: "cashTotal",
  unitBalance: "unitBalance",
  unitPrice: "unitPrice",
  unitValue: "unitValue",
  unitPriceDate: "unitPriceDate",
  lifeAssured: "lifeAssured",
  enrollmentAge: "enrollmentAge",
  riderInsurance: "riderInsurance",
  noEPolicy: "noEPolicy",
  done: "done",
  eCardDownloadSuccess: "eCardDownloadSuccess",
  eCardDownloadSuccessTitle: "eCardDownloadSuccessTitle",
  eCardDownloadFailedTitle: "eCardDownloadFailedTitle",
  eCardDownloadFailed: "eCardDownloadFailed",
  iosPermissionRequestTitle: "iosPermissionRequestTitle",
  iosPermissionRequestDescription: "iosPermissionRequestDescription",
  cancel: "cancel",
  confirm: "confirm",
  iosPermissionsOpenSettings: "iosPermissionsOpenSettings",
  androidRequestDescription: "androidRequestDescription",
  later: "later",
  policyStatus: "policyStatus",
  policyRider: "policyRider",
  scanQR: "scanQR",
  updateContactInfo: "updateContactInfo",
  email: "email",
  address: "address",
  phone: "phone",
  contactInfoDisclaimer: "contactInfoDisclaimer",
  disclaimer: "disclaimer",
  authenticationRequired: "authenticationRequired",
  phoneNumber: "phoneNumber",
  otpSentMessage: "otpSentMessage",
  close: "close",
  continue: "continue",
  notReceivedYet: "notReceivedYet",
  resend: "resend",
  updateFailed: "updateFailed",
  successMessage: "successMessage",
  your: "your",
  save: "save",
  canceled: "canceled",
  zipCode: "zipCode",
  lineOne: "lineOne",
  lineTwo: "lineTwo",
  city: "city",
  noPolicyLinked: "noPolicyLinked",
  agentInfo: "agentInfo",
  NA: "NA",
  updateBeneficiary: "updateBeneficiary",
  myPolicies: "mypolicies",
  claimPolicy: "claimPolicy",
  viewPolicy: "viewPolicy",
  free: "free",
  inceptionDate: "inceptionDate",
  policyNo: "policyNo",
  myPolicyLabel: "myPolicyLabel",
  for: "for",
  viewTransaction: "viewTransaction",
  showTransaction: "showTransaction",
  myPrudential: "MyPrudence",
  renew: "Renew My Policy",
  cancelAutoDebit: "Cancel Auto Debit",
  registerClaim: "Rgister Claim",
  cancelPolicy: "Cancel Policy",
  contactUs: "Contact Us",
  download: "Download",
  edit: "edit",
  payment: "payment",
  policyDetail: "policyDetail",
  beneficiary: "beneficiary",
  policyCoverage: "policyCoverage",
  coverageDate: "coverageDate",
  endDate: "endDate",
  inceptionDate: "inceptionDate",
  issuedDate: "issuedDate",
  contactDetails: "contactDetails",
  nextPremiumDue: "nextPremiumDue",
  askPrudence: "askPrudence",
  beneficiaryDocumentName: "beneficiaryDocumentName",
  pruCash:"pruCash",
  linkPolicy: "linkPolicy",
  pdfSuccess: "pdfSuccess",
  pageCoverImage: "pageCoverImage",
  pdfSuccessIos: "pdfSuccessIos"
};

const myPolicyMetas = {
  zipCode: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.zipCode);
  },
  lineOne: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.lineOne);
  },
  lineTwo: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.lineTwo);
  },
  city: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.city);
  },
  updateContactInfo: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.updateContactInfo);
  },
  askMissPrudence: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.askPrudence);
  },
  email: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.email);
  },
  phone: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.phone);
  },
  address: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.address);
  },
  disclaimer: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.disclaimer);
  },
  contactInfoDisclaimer: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.contactInfoDisclaimer);
  },
  authenticationRequired: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.authenticationRequired);
  },
  phoneNumber: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.phoneNumber);
  },
  otpSentMessage: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.otpSentMessage);
  },
  close: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.close);
  },
  continue: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.continue);
  },
  notReceivedYet: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.notReceivedYet);
  },
  resend: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.resend);
  },
  updateFailed: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.updateFailed);
  },
  getNA: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.NA);
  },
  successMessage: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.successMessage);
  },
  your: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.your);
  },
  save: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.save);
  },
  edit: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.edit);
  },
  policyDetail: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.policyDetail);
  },
  beneficiary: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.beneficiary);
  },
  policyCoverage: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.policyCoverage);
  },
  coverageDate: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.coverageDate);
  },
  canceled: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.canceled);
  },
  detailLoading: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.detailLoading);
  },
  errorBack: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.errorBack);
  },
  policyNumber: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyNumber);
  },
  eMedicalCardDownload: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.eMedicalCardDownload);
  },
  policyInfo: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyInfo);
  },
  agentInfo: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.agentInfo);
  },
  benefitAndInvestment: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.benefitAndInvestment);
  },
  ePolicy: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicy);
  },
  policyDetailLoading: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyDetailLoading);
  },
  coveragePrice: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.coveragePrice);
  },
  coverageStartDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.coverageStartDate);
  },
  coverageEndDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.coverageEndDate);
  },
  additionalInsurance: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.additionalInsurance);
  },
  investmentFund: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.investmentFund);
  },
  ePolicyInstruction1: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyInstruction1);
  },
  ePolicyDownloading: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyDownloading);
  },
  ePolicyInstruction2: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyInstruction2);
  },
  ePolicyInstruction3: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyInstruction3);
  },
  ePolicyInstruction4: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyInstruction4);
  },
  ePolicyInfo1: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyInfo1);
  },
  ePolicyTitle: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle);
  },
  ePolicyTitle1: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle1);
  },
  ePolicyTitle2: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle2);
  },
  ePolicyTitle3: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle3);
  },
  ePolicyTitle4: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle4);
  },
  ePolicyTitle5: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle5);
  },
  ePolicyTitle6: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.ePolicyTitle6);
  },
  agentName: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.agentName);
  },
  marketingOffice: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.marketingOffice);
  },
  myAgent: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.myAgent);
  },
  policyHolder: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyHolder);
  },
  myPremium: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.myPremium);
  },
  frequency: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.frequency);
  },
  paymentMethod: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.paymentMethod);
  },
  dueDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.dueDate);
  },
  bankAccount: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.bankAccount);
  },
  active: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.active);
  },
  free: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.free);
  },
  inactive: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.inactive);
  },
  premiumStatus: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.premiumStatus);
  },
  basicPremium: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.basicPremium);
  },
  pruSaver: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.pruSaver);
  },
  totalPremium: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.totalPremium);
  },
  policyStartingDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyStartingDate);
  },
  topUp: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.topUp);
  },
  totalPremiumDeposit: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.totalPremiumDeposit);
  },
  firstPremiumPayment: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.firstPremiumPayment);
  },
  policyDocumentSendDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyDocumentSendDate);
  },
  policyDocumentReceivedDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyDocumentReceivedDate);
  },
  policyData: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyData);
  },
  assured: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.assured);
  },
  benefitReceiver: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.benefitReceiver);
  },
  cashTotal: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.cashTotal);
  },
  unitBalance: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.unitBalance);
  },
  unitPrice: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.unitPrice);
  },
  unitValue: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.unitValue);
  },
  unitPriceDate: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.unitPriceDate);
  },
  lifeAssured: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.lifeAssured);
  },
  enrollmentAge: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.enrollmentAge);
  },
  riderInsurance: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.riderInsurance);
  },
  noEPolicy: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.noEPolicy);
  },
  noPolicyLinked: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.noPolicyLinked);
  },
  claimPolicy: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.claimPolicy);
  },
  viewPolicy: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.viewPolicy);
  },
  // done: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.done);
  // },
  // eCardDownloadSuccess: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadSuccess);
  // },
  // eCardDownloadSuccessTitle: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadSuccessTitle);
  // },
  // eCardDownloadFailedTitle: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadFailedTitle);
  // },
  // eCardDownloadFailed: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadFailed);
  // },
  // iosPermissionRequestTitle: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionRequestTitle);
  // },
  // iosPermissionRequestDescription: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionRequestDescription);
  // },
  // cancel: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.cancel);
  // },
  // confirm: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.confirm);
  // },
  // iosPermissionsOpenSettings: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionsOpenSettings);
  // },
  // androidRequestDescription: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.androidRequestDescription);
  // },
  // later: () => {
  //   return myPolicyMetaFinder(myPolicyMetaKeys.later);
  // },
  policyStatus: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyStatus);
  },
  policyRider: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.policyRider);
  },
  scanQR: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.scanQR);
  },
  done: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.done).value;
  },
  eCardDownloadSuccess: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadSuccess).value;
  },
  eCardDownloadSuccessTitle: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadSuccessTitle).value;
  },
  eCardDownloadFailedTitle: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadFailedTitle).value;
  },
  eCardDownloadFailed: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.eCardDownloadFailed).value;
  },
  iosPermissionRequestTitle: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionRequestTitle).value;
  },
  iosPermissionRequestDescription: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionRequestDescription)
      .value;
  },
  cancel: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.cancel).value;
  },
  confirm: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.confirm).value;
  },
  iosPermissionsOpenSettings: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.iosPermissionsOpenSettings)
      .value;
  },
  androidRequestDescription: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.androidRequestDescription).value;
  },
  later: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.later).value;
  },
  linkPolicy: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.linkPolicy);
  },
  updateBeneficiary: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.updateBeneficiary);
  },
  myPolicies: () => {
    return myPolicyTitleFinder(myPolicyMetaKeys.myPolicies);
  },
  inceptionDate: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.inceptionDate);
  },
  issuedDate: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.issuedDate);
  },
  contactDetails: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.contactDetails);
  },
  policyNo: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.policyNo);
  },
  myPolicyLabel: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.myPolicyLabel);
  },
  for: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.for);
  },
  viewTransaction: () => {
    return myPolicyMetaObjectFinder(myPolicyMetaKeys.viewTransaction);
  },
  showTransaction: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.showTransaction);
  },
  payment: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.payment);
  },
  endDate: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.endDate);
  },
  inceptionDate: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.inceptionDate);
  },
  nextPremiumDue: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.nextPremiumDue);
  },
  beneficiaryDocumentName: () => {
    return myPolicyMetaFinder(myPolicyMetaKeys.beneficiaryDocumentName);
  },
  pruCash : () =>{
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.pruCash);
  },
  pdfSuccessMessage: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.pdfSuccess);
  },
  iOSPdfDownlaod: () => {
    return myPolicyMetaLabelFinder(myPolicyMetaKeys.pdfSuccessIos);
  },
  laRiders,
  laProductNames,
  laPolicyRiderStatuses,
  sliderMetas: (key) => key,
  // UpdateContact: () => "UpdateContact"
  pageCoverImage: () => {
    const config = myPolicyMetaObjectFinder(myPolicyMetaKeys.pageCoverImage)
    return config && config.label;
  }
};

export default myPolicyMetas;
