/* eslint-disable complexity */
import React from "react";
import { Alert, PermissionsAndroid, Text } from "react-native";
import {
  join,
  isNil,
  isEmpty,
  groupBy,
  reduce,
  concat,
  find,
  propEq,
  path,
  pathOr,
  contains,
  pick,
  split,
  filter,
} from "ramda";
import moment from "moment";
import PermissionsIOS from "react-native-permissions";
import * as RNFS from "react-native-fs";
import { metaHelpers } from "@pru-rt-internal/pulse-common";
import Numbro, { fetchLocaleAttributes } from "./numbro";
import {
  PRESERVED_CAPITAL_LIST,
  OTP_RESPONSE,
  POLICY_STATUS,
} from "../bootstrap";
import {
  TagDanger,
  TagSuccess,
  TagWarning,
} from "../components/derivatives/Tag";
import myPolicyLang from "../screens/MyPolicy/lang";

/**
 * Function to get humanized greeting based on time.
 * @param time
 * @returns {string}
 */

export function getGreetingTime(time) {
  if (!time || !time.isValid()) return "";

  const splitAfternoon = 12;
  const splitEvening = 17;
  const currentHour = parseFloat(time.format("HH"));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return "siang";
  } else if (currentHour >= splitEvening) {
    return "malam";
  }
  return "pagi";
}

/**
 * Validates Phone Number
 * @param phone
 * @returns {*}
 */
export function validatePhone(phone) {
  const phoneRegex = /(^\+62\s?|^08|^62)\d{8,}$/;
  if (phone === "" || phone == null) return "No. Ponsel tidak boleh kosong";
  if (phone.length > 16) return "No. Ponsel maksimal 16 digit";
  if (phone && !phoneRegex.test(phone) && phone.length > 0) {
    return "Format nomor ponsel salah";
  }
  return undefined;
}

/**
 * Validates Email Format
 * @param email
 * @returns {*}
 */
export function validateEmail(email) {
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email && !emailRegex.test(email) && email.length > 0) {
    return "Format email salah";
  }
  return undefined;
}

/**
 * Validates Password Input
 * @param password
 * @returns {*}
 */
export function validatePassword(password) {
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (password && !passwordRegex.test(password) && password.length > 0) {
    return "Format kata sandi salah";
  }

  if (password === "" || password == null) {
    return "Kata sandi tidak boleh kosong";
  }
  return undefined;
}

/**
 * Validates Username
 * @param username
 * @returns {*}
 */
export function validateUsername(username) {
  const re = /^[a-z0-9]+$/i;
  const re2 = /^[0-9]+$/;
  const re3 = /^[a-z]+$/i;

  if (username.length > 0) {
    if (
      !(
        username.length >= 3 &&
        ((re.test(username) && !re2.test(username)) || re3.test(username))
      )
    ) {
      return "Format username tidak valid";
    }
    return undefined;
  }
  return undefined;
}

/**
 * Returns specific TOC error messages for different contexts.
 * @param toc
 * @param type
 * @returns {string|undefined}
 */
export function validateTOC(toc, type) {
  if (!toc) {
    switch (type) {
      case "register":
        return "Kamu harus menyetujui syarat dan ketentuan sebelum kamu bisa membuat akun di PRUAccess Plus";
      case "grant-revoke":
        return "Kamu harus menyetujui syarat dan ketentuan sebelum kamu bisa memberikan akses kepada pemegang polis ini";
      default:
        return "Kamu harus menyetujui syarat dan ketentuan sebelum kamu bisa melanjutkan";
    }
  }
  return undefined;
}

/**
 * Displays Alert
 * @param title
 * @param message
 * @returns {*}
 */
export function displayAlert(title, message) {
  return Alert.alert(title, message);
}

/**
 * Converts the string of characters in any case to Capital Case.
 * @param string {string}
 * @param preserveCapitalizedWord {boolean}
 * @returns {string}
 */
export function convertToCapitalCase(string, preserveCapitalizedWord = true) {
  try {
    const wordArr = split(" ", string);
    const capitalizedWordArr = [];

    wordArr.forEach(item => {
      const convertedToString = item.toString();

      if (convertedToString !== "" && convertedToString != null) {
        let newWord;
        if (!isDegree(convertedToString)) {
          newWord = preserveCapitalizedWord
            ? `${convertedToString[0].toUpperCase()}${convertedToString.substring(
              1,
              item.length
            )}`
            : `${convertedToString[0].toUpperCase()}${convertedToString
              .substring(1, item.length)
              .toLowerCase()}`;
        } else {
          newWord = convertedToString;
        }
        capitalizedWordArr.push(newWord);
      }
    });

    return capitalizedWordArr.join(" ");
  } catch (e) {
    return string;
  }
}

/**
 * Checks the name provided if it's a degree or not.
 * @param word
 * @returns {boolean}
 */
export function isDegree(word) {
  return PRESERVED_CAPITAL_LIST[word] != null;
}

/**
 * checks whether the value exists, if not returns the value defined in defaultValue. Uses the style similar to react-navigation getParam method.
 * @param value
 * @param defaultValue
 * @returns {*}
 */
export function getValue(value, defaultValue) {
  return value || defaultValue;
}

/**
 * Returns the formatted date as our version.
 * @param value
 * @returns {string}
 */
const dateFormats = ["DD/MM/YYYY", "YYYY-MM-DD"];

export function formatDate(value, dateFormat) {
  const DATE_FORMAT = dateFormat ? dateFormat : "DD MMM YYYY";
  if (!value) {
    return undefined;
  }
  try {
    return moment(value, dateFormats).format(DATE_FORMAT);
  } catch (e) {
    return undefined;
  }
}

export function dateDiff(firstDate, secondDate) {
  return moment.duration(
    moment(firstDate, dateFormats).diff(moment(secondDate, dateFormats))
  );
}

/**
 * Returns the name used for greeting from a full name.
 * @param fullName {string}
 * @returns {string}
 */
export function getNameForGreeting(fullName) {
  let name = "";

  if (fullName && fullName !== "") {
    const arrayOfNames = fullName.split(" ");
    name =
      arrayOfNames[0][arrayOfNames[0].length - 1] === "."
        ? `, ${arrayOfNames[0]} ${arrayOfNames[1]}`
        : `, ${arrayOfNames[0]}`;
  }

  return name;
}

/**
 * Returns boolean indicating whether the property inside object exists or not.
 * @param object
 * @param item
 * @returns {boolean}
 */
export function propertyObjectExists(object, item) {
  return typeof object[item] !== "undefined";
}

/**
 * Returns Error Message for OTP based on OTP response code from server.
 * @param code
 * @returns {string}
 */
export function handleOTPError(code) {
  const { INVALID, EXPIRED } = OTP_RESPONSE;
  switch (code) {
    case INVALID:
      return "Kode OTP Salah";
    case EXPIRED:
      return "Kode OTP Expired";
    default:
      return "Terjadi kesalahan pada sistem. Mohon coba kembali nanti";
  }
}

export function getColorForStatus(status) {
  const metaFinders = key => metaFinder("myPolicy", key, "label").label;

  const metaColorFinders = key =>
    metaFinder("myPolicy", key, "colorCode").colorCode;
  return metaColorFinders(status);
}

/**
 * Gets the Policy Status and returns the component for the corresponding status.
 * TODO: There's probably more than 3 types of policy status. We may need to make an object containing the types for better abstraction.
 * @param status
 * @returns {*}
 */
export function getPolicyStatusComponent(status) {
  const {
    INFORCE,
    CONTRACTSURRENDERED,
    LAPSED,
    DECLINED,
    EXPIRY,
    CFI,
    MATURED,
    POSTPONE,
    PAIDUP,
    SURRENDER,
    TERMINATED,
    WITHDRAWN,
    DECLINECL,
    DEATHCLM,
    REGDEATH,
    TPDCLAIM,
    FROZEN,
    CLAIM_REGISTERED,
    CLAIM_APPROVED
  } = POLICY_STATUS;

  const metaFinders = key => metaFinder("myPolicy", key, "label").label;

  const metaColorFinders = key =>
    metaFinder("myPolicy", key, "colorCode").colorCode;

  const statusObjectMapper = key => {
    const colour = metaColorFinders(key);
    if (colour === "green") return <TagSuccess>{metaFinders(key)}</TagSuccess>;
    return <TagDanger>{metaFinders(key)}</TagDanger>;
  };

  try {
    const statusObject = {
      [INFORCE]: statusObjectMapper("INFORCE"),
      [PAIDUP]: statusObjectMapper("PAIDUP"),
      [MATURED]: statusObjectMapper("MATURED"),
      [CONTRACTSURRENDERED]: statusObjectMapper("SURRENDER"),
      [LAPSED]: statusObjectMapper("LAPSED"),
      [DECLINED]: statusObjectMapper("DECLINED"),
      [EXPIRY]: statusObjectMapper("EXPIRY"),
      [CFI]: statusObjectMapper("CFI"),
      [POSTPONE]: statusObjectMapper("POSTPONE"),
      [SURRENDER]: statusObjectMapper("SURRENDER"),
      [TERMINATED]: statusObjectMapper("TERMINATED"),
      [WITHDRAWN]: statusObjectMapper("WITHDRAWN"),
      [DECLINECL]: statusObjectMapper("DECLINECL"),
      [DEATHCLM]: statusObjectMapper("DEATHCLM"),
      [REGDEATH]: statusObjectMapper("REGDEATH"),
      [TPDCLAIM]: statusObjectMapper("TPDCLAIM"),
      [FROZEN]: statusObjectMapper("FROZEN"),
      [CLAIM_REGISTERED]: statusObjectMapper("Claim-Registered"),
      [CLAIM_APPROVED]: statusObjectMapper("Claim-Approved")
    };
    return statusObject[status] || statusObjectMapper(status);
  } catch (e) {
    return (
      <TagWarning>
        <Text>INVALID STATUS</Text>
      </TagWarning>
    );
  }
}

const localeMapper = {
  ID: "id",
  VN: "vn",
  PH: "ph",
  MM: "mm",
  KH: "kh",
  TH: "th",
  MY: "my",
};

export const getFormattedDate = value => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(value);
  return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
};

export const getCurrencyForCountry = country => {
  const localeAttribs = fetchLocaleAttributes(localeMapper[country]);
  return pathOr("", ["symbol"], localeAttribs);
};

export const checkForZeroPremiumAsFreeAndPolicyActive = (
  showZeroPremiumAsFree,
  policyStatus
) => {
  return showZeroPremiumAsFree && policyStatus === "Active";
};

/**
 * Returns formatted output of locale.
 * @param value
 * @param locale
 * @returns {string}
 */
export function formatCurrency(value, locale = "VN") {
  /* Add mapping from state to pick up locale
   * from the localeMapper in numbro.js
   */
  if (isNaN(value)) {
    return value;
  }
  const numbro = Numbro(localeMapper[locale]);
  if (value == null) {
    return undefined;
  }
  try {
    return numbro(parseFloat(value)).formatCurrency({
      thousandSeparated: true,
      mantissa: 2,
    });
    // return locale
    //   ? `${locale} ${numbro(parseFloat(value)).formatCurrency()}`
    //   : numbro(parseFloat(value)).formatCurrency();
  } catch (e) {
    return value;
  }
}

/**
 * Formats number
 * @param value
 * @returns {*}
 */
export function formatNumber(value) {
  const numbro = Numbro("id");

  try {
    return numbro(parseFloat(value)).format({
      thousandSeparated: true,
      mantissa: 2,
    });
  } catch (e) {
    return value;
  }
}

/**
 * Checks whether the path specified exists or not. Returns boolean indicating directory availability.
 * @param path
 * @returns {boolean}
 */
export function checkDirectoryAvailability(path) {
  let available = false;
  RNFS.readDir(path)
    .then(() => (available = true))
    .catch(() => (available = false));
  return available;
}

/**
 * Creates directory on the path specified.
 * @param path
 * @returns {Promise<any>}
 */
export function createDirectory(path) {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(path)
      .then(() => {
        resolve({
          success: true,
          message: "Directory Created.",
          path,
        });
      })
      .catch(error => {
        reject({
          success: false,
          message: "Failed to create directory",
          error,
        });
      });
  });
}

export function requestStoragePermission(platform) {
  if (platform == null) {
    return { granted: false };
  }
  if (platform === "ios") {
    return iOSRequestStoragePermission();
  }
  return androidRequestStoragePermission();
}

/**
 * Checks and request for photo access permission
 * @returns {Promise<any>}
 */
export function iOSRequestStoragePermission() {
  const permissionType = "photo";
  return new Promise(async (resolve, reject) => {
    try {
      const isGranted = await PermissionsIOS.check(permissionType);
      if (isGranted === "authorized") {
        resolve({ granted: true });
      } else {
        // Request for permission
        let permission = "undetermined";
        Alert.alert(
          myPolicyLang.iosPermissionRequestTitle(),
          myPolicyLang.iosPermissionRequestDescription(),
          [
            {
              text: "No", // myPolicy -> cancel
              onPress: () => reject({ granted: false }),
              style: "cancel",
            },
            isGranted === "undetermined"
              ? {
                text: "OK", // myPolicy -> confirm
                onPress: async () =>
                  (permission = await PermissionsIOS.request(permissionType)),
              }
              : {
                text: myPolicyLang.iosPermissionsOpenSettings(),
                onPress: () => PermissionsIOS.openSettings(),
              },
          ]
        );
        if (permission === "authorized") {
          resolve({ granted: true });
        } else {
          reject({ granted: false });
        }
      }
    } catch (error) {
      reject({
        granted: false,
        error,
      });
    }
  });
}

/**
 * Requests permission to save to external storage on Android.
 * @returns {Promise<boolean>}
 */
export function androidRequestStoragePermission() {
  const PermissionAndroid = PermissionsAndroid;
  return new Promise(async (resolve, reject) => {
    try {
      const writeGranted = await PermissionAndroid.request(
        PermissionAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: myPolicyLang.androidRequestDescription(),
          buttonNeutral: myPolicyLang.later(),
          buttonNegative: myPolicyLang.cancel(),
          buttonPositive: myPolicyLang.confirm(),
        }
      );

      const readGranted = await PermissionAndroid.request(
        PermissionAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: myPolicyLang.androidRequestDescription(),
          buttonNeutral: myPolicyLang.later(),
          buttonNegative: myPolicyLang.cancel(),
          buttonPositive: myPolicyLang.confirm(),
        }
      );
      if (
        writeGranted === PermissionAndroid.RESULTS.GRANTED &&
        readGranted === PermissionAndroid.RESULTS.GRANTED
      ) {
        resolve({ granted: true });
      } else {
        reject({ granted: false });
      }
    } catch (error) {
      reject({ granted: false });
    }
  });
}

/**
 * Gets data from metadata and returns the associated string on it, returns the key name if key is invalid.
 * @param metaModule
 * @param key
 * @param propertyName
 * @returns {string|*}
 */
export function metaFinder(metaModule, key, propertyName = "label") {
  if (metaModule == null || key == null || metaModule === "" || key === "") {
    return { [propertyName]: "Invalid Module Name or Key." };
  }
  const metaResult = metaHelpers.findElement(metaModule, key);

  if (metaResult) {
    if (metaResult[propertyName]) {
      return metaResult;
    }
    return {
      ...metaResult,
      [propertyName]: key,
    };
  }
  return {
    [propertyName]: key,
  };
}

const customerName = customer => {
  if (!customer) {
    return "";
  }
  const { name, firstName, surName } = customer;
  if (isNil(name) || isEmpty(name)) {
    const nameParts = [];
    if (firstName) {
      nameParts.push(firstName);
    }
    if (surName) {
      nameParts.push(surName);
    }
    return join(" ", nameParts);
  }
  return name;
};

const statusValidForPremium = status =>
  contains(status, ["INFORCE", "LAPSED", "PAIDUP", "In-Force"]);

// eslint-disable-next-line complexity
export const transformPolicy = policy => {
  policy.customerRoles = policy.customerRoles || [];
  if (isEmpty(policy.customerRoles)) {
    policy.customerRoles = policy.lifeAssured.map(la => ({
      role: "LIFEASSURED",
      customer: la,
    }));
    policy.clients.forEach(client => {
      policy.customerRoles.push({
        role: "OWNER",
        customer: client,
      });
    });
  }

  policy.customerRoles.forEach(cr => {
    cr.customer.name = customerName(cr.customer);
  });

  policy.beneficiaries = policy.beneficiaries || [];
  policy.beneficiaries.forEach(beneficiary => {
    if (beneficiary.customer) {
      beneficiary.customer.name = customerName(beneficiary.customer);
    }
  });

  const agent = path(["servingAgents", "agent"], policy);
  if (agent) {
    agent.name = customerName(agent);
  }

  policy.productOptions = policy.productOptions || [];
  policy.productOptions.forEach(po => {
    po.productComponentOptions = po.productComponentOptions || [];
    po.productComponentOptions.forEach(pco => {
      let laCustomer = path(["lifeAssured", "customer"], pco);
      if (!laCustomer) {
        laCustomer = policy.lifeAssured[0];
        pco.lifeAssured = {
          customer: laCustomer,
        };
      }
      laCustomer.name = customerName(laCustomer);
      pco.riskCessDate = pco.riskCessDate || policy.endDate;
      pco.commencementDate = pco.commencementDate || policy.inceptionDate;

      if (!pco.status) {
        pco.status = po.status;
      }
      const pcoCode = path(["component", "code"], pco);
      const pcoComponentId = path(["component", "id"], pco);
      if (!pcoCode && pcoComponentId) {
        const parts = pcoComponentId.split("::");
        if (parts.length === 5) {
          pco.component = {
            ...pco.component,
            code: parts[4],
          };
        }
      }
      if (pco.options) {
        pco = {
          ...pco,
          ...pco.options,
        };
      }
    });
  });

  let totalPremium = reduce(
    (prev, curr) =>
      prev +
      (statusValidForPremium(curr.status) && curr.premium ? curr.premium : 0),
    0,
    reduce(
      (prev, curr) => concat(prev, curr.productComponentOptions),
      [],
      policy.productOptions
    )
  );
  const BASECOVERAGE = "BASEPLAN";
  let poWithBaseCoverage = find(
    po =>
      find(propEq("riderFlag", BASECOVERAGE), po.productComponentOptions) &&
      pathOr(false, ["lifeAssured", "isPrimary"], po),
    policy.productOptions
  );

  if (!poWithBaseCoverage && policy.productOptions.length === 1) {
    poWithBaseCoverage = policy.productOptions[0];
    totalPremium = pathOr(poWithBaseCoverage.totalPremium, ["options", "insurancePremium"], poWithBaseCoverage);
  }

  let pcoWithBaseCoverage = find(
    propEq("riderFlag", BASECOVERAGE),
    pathOr([], ["productComponentOptions"], poWithBaseCoverage)
  );

  if (!pcoWithBaseCoverage && poWithBaseCoverage) {
    pcoWithBaseCoverage = pick(
      ["totalPremium", "commencementDate", "riskCessDate", "status", "options"],
      poWithBaseCoverage
    );
    pcoWithBaseCoverage.lifeAssured = {
      customer: policy.lifeAssured[0],
    };
  }

  if (pcoWithBaseCoverage) {
    pcoWithBaseCoverage.riskCessDate =
      pcoWithBaseCoverage.riskCessDate || policy.endDate;
    pcoWithBaseCoverage.commencementDate =
      pcoWithBaseCoverage.commencementDate || policy.inceptionDate;
  }

  const basePlanPCOs = filter(
    propEq("riderFlag", BASECOVERAGE),
    pathOr([], ["productComponentOptions"], poWithBaseCoverage)
  );

  const topupSA = reduce(
    (prev, curr) => {
      if (curr.riderFlag === "TOPUP") {
        return prev + curr.sumAssured;
      }
      return prev;
    },
    0,
    pathOr([], ["productComponentOptions"], poWithBaseCoverage)
  );

  const totalSumAssured =
    basePlanPCOs.length == 1
      ? basePlanPCOs[0].sumAssured
      : poWithBaseCoverage.totalSumAssured;

  return {
    ...policy,
    roleToCustomers: groupBy(cr => cr.role, policy.customerRoles),
    premiums: {
      totalPremium,
      basePremium: totalPremium,
    },
    poWithBaseCoverage: poWithBaseCoverage || {},
    pcoWithBaseCoverage: pcoWithBaseCoverage || {},
    totalSumAssured: totalSumAssured + topupSA,
  };
};

export const contactInfoMapper = ({
  addressDetails = {},
  contactDetails = {},
  key,
  value,
}) => {
  if (!addressDetails) {
    addressDetails = {
      [value.addressType]: {},
    };
  }

  const statePathMapper = {
    email: {
      ...contactDetails,
      email: {
        ...contactDetails.email,
        value: value,
      },
    },
    phone: {
      ...contactDetails,
      phone: {
        ...contactDetails.phone,
        value: value,
      },
    },
    address: {
      addressDetails: {
        ...addressDetails,
        [value.addressType]: {
          ...addressDetails[`${value.addressType}`],
          ...value,
        },
      },
    },
  };

  if (key === "address") {
    return { contactDetails, ...statePathMapper[key] };
  }

  return {
    addressDetails,
    contactDetails: { ...contactDetails, ...statePathMapper[key] },
  };
};

export const getProductName = policyInfo => {
  const productCode = pathOr(
    path(["poWithBaseCoverage", "product", "code"], policyInfo),
    ["product", "code"],
    policyInfo
  );

  let productName;
  if (productCode) {
    productName = myPolicyLang.laProductNames(productCode);
  }
  if (!productName) {
    productName = pathOr(
      myPolicyLang.getNA(),
      ["poWithBaseCoverage", "product", "fullName"],
      policyInfo
    );
  }
  return productName;
};
