import { isNil, isEmpty } from "ramda";

export const defaultRegExpValidator = ({ regex, value }) => {
  const regExp = new RegExp(regex);
  return isNil(value) || String(value).match(regExp)
    ? undefined
    : "Input is not valid";
};

export const phoneNumberValidator = ({ regex = "^[0-9]*$", value }) => {
  const regExp = new RegExp(regex);
  return isEmpty(value) || String(value).match(regExp)
    ? undefined
    : "Phone number is not valid";
};

export const requiredValidator = ({ value }) =>
  isEmpty(value) ? "This is a required field" : undefined;

export const maxLengthValidator = ({ maxLength = 10000, value }) =>
  isEmpty(value) || String(value).length <= maxLength
    ? undefined
    : `Input value exceeded ${maxLength} characters`;

export const minLengthValidator = ({ minLength = 0, value }) =>
  isEmpty(value) || String(value).length >= minLength
    ? undefined
    : `Input value must have minimum ${minLength} characters`;
