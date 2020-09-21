import jsonata from "jsonata";
import moment from "moment";
import { isNil } from "ramda";

const commonJsonAtaFunctions = {
  convertDateFormat: (dateString, fromFormat, toFormat) => {
    const date = moment(dateString, fromFormat);
    return moment(date).format(toFormat);
  },
};

const getJsonAtaExpression = expressionString => {
  const expression = jsonata(expressionString);
  for (const funcName in commonJsonAtaFunctions) {
    if (commonJsonAtaFunctions.hasOwnProperty(funcName)) {
      expression.registerFunction(funcName, commonJsonAtaFunctions[funcName]);
    }
  }
  return expression;
};

export const getValueFrom = (expression, context, transformOptions) => {
  let value;
  try {
    value = getJsonAtaExpression(expression).evaluate({}, context);
    if (!transformOptions || transformOptions.length < 1) {
      return value;
    }
  } catch (error) {
    console.log(
      `An error occured in parsing JSONATA expression"${expression}"`,
      error
    );
    throw error;
  }

  try {
    return (transformOptions || []).reduce(
      (prev, options) => transform(prev, options, context),
      value
    );
  } catch (error) {
    console.log(
      `An error occured in transforming value "${value}" with ${transformOptions}`,
      error
    );
    throw error;
  }
};

const transform = (value, options, context) => {
  if (!options || isNil(value)) {
    return value;
  }
  switch (options.type) {
    case "date-parse":
      return moment(value, options.dateFormat);
    case "date-format":
      return moment(value).format(options.dateFormat);
    case "text-format":
      return options.format ? options.format.replace(/\{0\}/gi, value) : value;
    case "jsonata-expression":
      return getJsonAtaExpression(options.expr).evaluate(value, context);
    default:
      return value;
  }
};
const validateValueWithConfig = (value, validationConfig, context) => {
  let isValid = true;
  switch (validationConfig.type) {
    case "required":
      isValid = !isNil(value) && !(typeof value === "string" && value === "");
      break;
    case "regex":
      isValid = isNil(value)
        ? true
        : new RegExp(validationConfig.regex).test(value);
      break;
    case "jsonata-expression":
      isValid = isNil(value)
        ? true
        : getJsonAtaExpression(validationConfig.expr).evaluate(value, context);
      break;

    default:
      break;
  }

  return isValid ? { isValid } : { isValid, message: validationConfig.message };
};

export const validateFormInput = (
  value,
  validationConfigs,
  context,
  getMetaForMessage
) => {
  if (!validationConfigs || validationConfigs.length < 1) {
    return { isValid: true };
  }
  for (const validationConfig of validationConfigs) {
    const result = validateValueWithConfig(value, validationConfig, context);
    if (!result.isValid) {
      return {
        ...result,
        message: getMetaForMessage
          ? getMetaForMessage(result.message)
          : result.message,
      };
    }
  }
  return { isValid: true };
};
