const policySignatur = [
  {
    policyName: "needAnalysis_Testing",
    policyDocumentFileName: "cust_signed_needAnalysis_1598290081548.pdf",
    fileNameRegex: "^(cust_signed_needAnalysis_)([a-zA-Z0-9_.]*)$",
    fileType: "needAnalysis_",
    partyType: "agent_",
    signatureCoordinate: [
      {
        x: 65,
        y: 370,
        width: 150,
        height: 40,
        pageNumber: 1,
        action: "Send Back",
        message: "FC/LC'",
        dateCoordinate: [
          {
            x: 110,
            y: 375,
            pageNumber: 1,
            format: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
    ],
  },
  {
    policyName: "needAnalysis_Testing",
    policyDocumentFileName: "needAnalysis_1598290081548.pdf",
    fileNameRegex: "^(needAnalysis_)([a-zA-Z0-9_.]*)$",
    fileType: "needAnalysis_",
    partyType: "cust_signed_",
    signatureCoordinate: [
      {
        x: 385,
        y: 372,
        width: 150,
        height: 40,
        pageNumber: 1,
        action: "Send Back",
        message: "Customer",
        dateCoordinate: [
          {
            x: 400,
            y: 375,
            pageNumber: 1,
            format: "YYYY-MM-DD HH:mm:ss",
          },
        ],
      },
    ],
  },
];

export default policySignatur;
