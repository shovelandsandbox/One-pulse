import { reduce, pick, pipe, values, map } from "ramda";
import Numbro from "./numbro";

const localeMapper = {
  ID: "id",
  VN: "vn",
  PH: "ph",
  MM: "mm",
  KH: "kh",
  TH: "th",
  MY: "my",
};

const policyNameKeyChange = x => (x === "lastName" ? "surName" : x);

/**
 * Returns formatted output of locale.
 * @param value
 * @param locale
 * @returns {string}
 */
export function formatCurrency(value, locale = "VN", moneyFormat = "") {
  /* Add mapping from state to pick up locale
   * from the localeMapper in numbro.js
   */
  const position =
    moneyFormat.split(".")[0] === "currency" ? "prefix" : "postfix";

  if (isNaN(value)) {
    return value;
  }
  if (value == null) {
    return undefined;
  }

  const numbro = Numbro(localeMapper[locale], position);

  try {
    return numbro(parseFloat(value)).formatCurrency({
      thousandSeparated: true,
      mantissa: 2,
    });
  } catch (e) {
    return value;
  }
}

/**
 * Returns formatted output of locale.
 * @param name
 * @param nameFormat
 * @param myPolicy
 * The third param is a boolean value that only needs to passed as true if you are calling the function from myPolicy, since for myPolicy lastName is stores as surName. Anywhere else, the third param does not need to be passed.
 * @returns {string}
 */
export const formatName = (
  name = {},
  nameFormat = "firstName.lastName",
  myPolicy = false
) => {
  const nameFormatModified = myPolicy
    ? map(policyNameKeyChange, nameFormat.split("."))
    : nameFormat.split(".");

  return pipe(
    pick(nameFormatModified),
    values,
    reduce((acc, value) => {
      return value ? `${acc} ${value}`.trim() : acc;
    }, "")
  )(name);
};

export const ordinalSuffix = i => {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};
