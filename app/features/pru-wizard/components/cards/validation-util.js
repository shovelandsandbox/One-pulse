/* eslint-disable complexity */
import { isNil, isEmpty, join, find, endsWith } from "ramda";
import { safeMetaLabelFinder } from "../../../../utils/meta-utils";
import { metaFinder } from "../../../../mypolicy/utils";
const CAPTURE_CUSTOMER_PAGE = "CAPTURE_CUSTOMER_PAGE";
const LABEL = "LABEL";

export const validate = (config, value) => {
  const { validationMetaKey } = config;
  const metaKey = join("_", [CAPTURE_CUSTOMER_PAGE, validationMetaKey, LABEL]);

  const element = metaFinder(CAPTURE_CUSTOMER_PAGE, metaKey, "value");
  if (!element) {
    return;
  }
  const validators = element.validation || [];

  const failedValidator = find(validator => {
    if (validator.value === "required") {
      return isNil(value) || isEmpty(value);
    } else if (endsWith("REGEX_VALIDATION", validator.key)) {
      const regex = new RegExp(validator.value);
      return !regex.test(value);
    }
  }, validators);

  if (failedValidator) {
    let msgKey;
    if (failedValidator.value === "required") {
      msgKey = requiredMessageKey(validationMetaKey)
    } else if (endsWith("REGEX_VALIDATION", failedValidator.key)) {
      msgKey = invalidMessageKey(validationMetaKey);
    }

    if (msgKey) {
      return safeMetaLabelFinder(CAPTURE_CUSTOMER_PAGE, msgKey);
    }
  }
};
const requiredMessageKey = fieldName => {
  switch (fieldName) {
    case "ID":
      return "CAPTURE_CUSTOMER_PAGE_ID_REQUIRED_MESSAGE";
    case "DATEOFBIRTH":
      return "CAPTURE_CUSTOMER_PAGE_DOB_REQUIRED_MESSAGE";
    case "GENDER":
      return "CAPTURE_CUSTOMER_PAGE_GENDER_REQUIRED_MESSAGE";
    case "ADDRESS":
      return "CAPTURE_CUSTOMER_PAGE_ADDRESS_REQUIRED_MESSAGE";
    case "MOBILENUMBER":
      return "CAPTURE_CUSTOMER_PAGE_PHONE_REQUIRED_MESSAGE";
    case "OCCUPATION":
      return "";
    case "FIRSTNAME":
      return "CAPTURE_CUSTOMER_PAGE_FIRSTNAME_REQUIRED_MESSAGE";
    case "LASTNAME":
      return "CAPTURE_CUSTOMER_PAGE_LASTNAME_REQUIRED_MESSAGE";
  }
  return fieldName;
};
const invalidMessageKey = fieldName => {
  switch (fieldName) {
    case "ID":
      return "CAPTURE_CUSTOMER_PAGE_INVALID_ID_NO_MESSAGE";
    case "DATEOFBIRTH":
      return "CAPTURE_CUSTOMER_PAGE_DOB_INVALID_MESSAGE";
    case "GENDER":
      return "";
    case "ADDRESS":
      return "CAPTURE_CUSTOMER_PAGE_ADDRESS_INVALID_MESSAGE";
    case "MOBILENUMBER":
      return "CAPTURE_CUSTOMER_PAGE_INVALID_PHONE_MESSAGE";
    case "OCCUPATION":
      return "CAPTURE_CUSTOMER_PAGE_INVALID_OCCUPATION_MESSAGE";
    case "FIRSTNAME":
      return "CAPTURE_CUSTOMER_PAGE_FIRSTNAME_INVALID_MESSAGE";
    case "LASTNAME":
      return "CAPTURE_CUSTOMER_PAGE_LASTNAME_INVALID_MESSAGE";
  }
  return fieldName;
};
